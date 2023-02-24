import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, Dimensions, Alert, TextInput, Linking, FlatList, TouchableOpacity } from 'react-native'
import MapView, { Circle, Marker, UrlTile } from 'react-native-maps'
import VetClinicCard from '../components/VetClinicCard';
import * as Location from 'expo-location'
import { MaterialIcons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons'
import Colors from '../constants/Colors'
import { useSelector, useDispatch } from 'react-redux'
import { mapActions } from '../store/map-slice';
import MapFilterModal from '../components/MapFilterModal'
import MapAddModal from '../components/MapAddModal'
import Suggestion from '../components/Suggestion'
import axios from 'axios'
import moment from 'moment';
import {API_KEY_GOOGLE, API_KEY_GEOAPIFY} from "@env"
import { fetchVetClinics } from '../util/http';

const { width, height } = Dimensions.get('window');


const MapScreen = ({navigation}) => {

    const dispatch = useDispatch()

    useEffect(() => {
        getLocation()
        const query_str = `37.3831,-5.9707&rankby=distance&types=veterinary_care&key=${API_KEY_GOOGLE}`
        const getVetClinics = async() => {
            response = await fetchVetClinics(query_str)
        }
        getVetClinics()
    }, [])


    const [dataArray, setDataArray] = useState()
    const [currentLocation, setCurrentLocation] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)
    const [currentLat, setCurrentLat] = useState(null)
    const [currentLon, setCurrentLon] = useState(null)
    const [zoomLevelLat, setZoomLevelLat] = useState(0.08)
    const [zoomLevelLon, setZoomLevelLon] = useState(0.04)
    const [currentMapLat, setCurrentMapLat] = useState()
    const [currentMapLon, setCurrentMapLon] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [searchValue, setSearchValue] = useState('')
    const [suggestionsHidden, setSuggestionsHidden] = useState(true)
    const [searchSuggestionsList, setSearchSuggestionsList] = useState([])
    const currentLanguage = useSelector(state => state.language.selectedLenguage)
    const filter_modal_visible = useSelector(state => state.map.modals.filter_modal_visible)
    const add_modal_visible = useSelector(state => state.map.modals.add_modal_visible)
    //const filterChanged = useSelector(state => state.map.filter.filter_changed)
    const currentOpenFilter = useSelector(state => state.map.filter.open_now)
    const currentRadius = useSelector(state => state.map.filter.radius)


    const getLocation = async () => {
        setSearchValue('')
        setSuggestionsHidden(true)
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        dispatch(mapActions.updateFilter({radius: 5, open_now: 'all'}))
        setCurrentLocation(location.coords);
        console.log(location.coords)      
    }

    useEffect(() => {
        let location_str = 'Waiting..';
        if (errorMsg) {
            location_str = errorMsg;
            console.log(location_str)
            setCurrentLat(43.2167)
            setCurrentLon(-2.8667)
        } else if (currentLocation) {
            location_str = JSON.stringify(currentLocation.latitude)
            const lat = JSON.stringify(currentLocation.latitude)
            const lon = JSON.stringify(currentLocation.longitude)
            setCurrentLat(lat)
            setCurrentLon(lon)
            setCurrentMapLat(parseFloat(lat))
            setCurrentMapLon(parseFloat(lon))
            if(currentOpenFilter === 'all' && currentRadius === 5) {
                getVetData(lat, lon, 1)
            } else if(currentOpenFilter === 'open' && currentRadius === 5) {
                getVetData(lat, lon, 4)
            } else if(currentOpenFilter === 'open' && currentRadius != 5) {
                getVetData(lat, lon, 3)
            } else if(currentOpenFilter === 'all' && currentRadius != 5) {
                getVetData(lat, lon, 2)
            }
        }
    }, [currentLocation])

    const getVetData = async (lat, lon, q_type) => {
        const radius = currentRadius*1000
        console.log(radius)
        let google_query
        if (q_type === 1) {
            google_query = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&rankby=distance&types=veterinary_care&key=${API_KEY_GOOGLE}`
        } else if (q_type === 2) {
            google_query = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=${radius}&types=veterinary_care&key=${API_KEY_GOOGLE}`
        } else if (q_type === 3) {
            google_query = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=${radius}&opennow&types=veterinary_care&key=${API_KEY_GOOGLE}`
        } else if (q_type === 4) {
            google_query = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&rankby=distance&opennow&types=veterinary_care&key=${API_KEY_GOOGLE}`
        }
        await fetch(google_query,{
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.results.length > 0) {
                setDataArray(data.results)
                //getAddedClinics()
                if (dataArray && dataArray.length > 0) {
                    setIsLoading(false)
                }
                renderVets()
            }
        })
        .catch(err => console.error(err))
    }

    const getAddedClinics = async () => {
        /*

        1. fetch clinics from firebase database
        2. for each clinic, if the distance to the current location is equal or less than currentRadius, push the clinic to dataArray
        3. if no clinics match criteria, do nothing
        4. if one or more clinics match the criteria, order the array by distance
        5. update the state of dataArray

        */

        // Fetch clinics from firebase
        
        const BACKEND_URL = 'https://rescatvet-default-rtdb.firebaseio.com'
        const clinics = []
        const response = await axios.get(BACKEND_URL + '/NewClinics.json')
        for (const key in response.data) {
            const clinicObj = {
                place_id: key,
                vicinity: response.data[key].address,
                contact: response.data[key].contact,
                coordinates: response.data[key].coordinates,
                exoticAdmission: response.data[key].exoticAdmission,
                name: response.data[key].name,
                schedule: response.data[key].openingHours,
                opening_hours: {
                    open_now: false
                },
                geometry: {
                    location: {
                        lat: 0,
                        lng: 0
                    }
                }
            }
            
            // Turn coordinates into float numbers

            const coordinates = {
                latitude: parseFloat(clinicObj.coordinates.split(",")[0]),
                longitude: parseFloat(clinicObj.coordinates.split(",")[1])
            }
            
            // Add separate coordinates to the object

            clinicObj["geometry"]["location"]["lat"] = coordinates.latitude
            clinicObj["geometry"]["location"]["lng"] = coordinates.longitude
            
            // Remove string coordinates from the object

            delete clinicObj.coordinates 

            // Check distance to current location
            await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${clinicObj.geometry.location.lat},${clinicObj.geometry.location.lng}&origins=${currentLat},${currentLon}&key=${api_key}`,{
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if(data["rows"][0]["elements"][0]["distance"]) {
                    const dist_km = data["rows"][0]["elements"][0]["distance"]["text"]
                    const dist_km_float = dist_km.split(" ")[0]
                    clinicObj["distance"] = parseFloat(dist_km_float)
                }
                //console.log(clinicObj["distance"])
            })
            .catch(err => console.error(err))

            // Check if the clinic is open now
            const opennow = checkClinicOpen(clinicObj.schedule)
            clinicObj["opening_hours"]["open_now"] = opennow
            
            // Remove schedule from object
            delete clinicObj["schedule"]

            // Turn exoticAdmission into a boolean
            if (clinicObj["exoticAdmission"].toLowerCase() === 'si' || clinicObj["exoticAdmission"].toLowerCase() === 'yes') {
                clinicObj["exoticAdmission"] = true
            } else if (clinicObj["exoticAdmission"].toLowerCase() === 'no') {
                clinicObj["exoticAdmission"] = false
            } else {
                clinicObj["exoticAdmission"] = 'undefined'
            }

            clinicObj["isManual"] = true
            
            // Check if the clinic is within the current radius and if so, add it to the clinics list

            if (clinicObj["distance"] <= currentRadius) {
                //clinicObj["isManual"] = true
                clinics.push(clinicObj)
            }
        }
        if(clinics) {
            const new_array = dataArray
            for (let i=0; i < clinics.length; i++) {
                let clinicInArray = false
                for (let x = 0; x < new_array.length; x++) {
                    if (clinics[i].place_id === new_array[x].place_id) {
                        clinicInArray = true
                    }
                }
                if (!clinicInArray) {
                    new_array.push(clinics[i])
                }
            }
            setDataArray(new_array)
        }
    }

    
    const checkClinicOpen = (schedule) => {
        // Get current day, hour and minute
        const weekday = moment().day()
        const currentTimeHour = moment().hour()
        const currentTimeMinute = moment().minute()

        const schedule_split = schedule.split(" __ ")
        
        for(var i = 0; i < schedule_split.length; i++) {
            const str = schedule_split[i]
            if (str.startsWith(weekday)) {
                const opening_hours = str.split(" - ")[1]
                const clinic_open = opening_hours.split("/")[0]
                const clinic_close = opening_hours.split("/")[1]
                const clinic_open_hour = parseInt(clinic_open.split(":")[0])
                const clinic_open_minute = parseInt(clinic_open.split(":")[1])
                const clinic_close_hour = parseInt(clinic_close.split(":")[0])
                const clinic_close_minute = parseInt(clinic_close.split(":")[1])
                const clinic_open_total_min = clinic_open_hour * 60 + clinic_open_minute
                const clinic_close_total_min = clinic_close_hour * 60 + clinic_close_minute
                const current_total_min = currentTimeHour * 60 + currentTimeMinute
                
                if (current_total_min >= clinic_open_total_min && current_total_min <= clinic_close_total_min) {
                    return true
                } else {
                    return false
                }
            }
        }
    }

    const onClinicPress = (lat, lon) => {
        setCurrentMapLat(lat)
        setCurrentMapLon(lon)
        setZoomLevelLat(0.003)
        setZoomLevelLon(0.003)
    }

    const renderVets = () => {
            return (
                <View style={styles.vets}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', height: height*0.3, width: width}}>
                        {isLoading && <ActivityIndicator size='large' color='black' style={{marginTop: 70}}/>}
                        {!isLoading && <FlatList 
                            data={dataArray}
                            keyExtractor={item => item.place_id}
                            horizontal={true}
                            renderItem={itemData => 
                                <VetClinicCard 
                                    clinicData={{
                                        name: itemData.item.name,
                                        address: itemData.item.vicinity,
                                        open: itemData.item.opening_hours ? itemData.item.opening_hours.open_now : 'no_info',
                                        id: itemData.item.place_id,
                                        lat: itemData.item.geometry.location.lat,
                                        lon: itemData.item.geometry.location.lng,
                                        cLat: currentLat,
                                        cLon: currentLon,
                                        lan: currentLanguage,
                                        isManual: itemData.item.isManual ? true : false,
                                        contact: itemData.item.contact ? itemData.item.contact : null,
                                        distance: itemData.item.distance ? itemData.item.distance : null,
                                        exoticAdmission: itemData.item.exoticAdmission ? itemData.item.exoticAdmission : null
                                    }} 
                                    onClinicPress={() => {
                                        onClinicPress(itemData.item.geometry.location.lat, itemData.item.geometry.location.lng)
                                    }}
                                />
                            }
                        />}
                        {!dataArray && <Text style={{fontFamily: 'montserrat', color: 'white', fontSize: 15}}>No hay resultados para un radio de 50km. Te recomendamos aumentar el radio en el apartado de filtro</Text>} 
                    </View>
                </View>
            )
    }

    
    useEffect(() => {
        /*if (currentOpenFilter === 'all' && currentRadius === 50) {
            getVetData(currentLat, currentLon, 1) // default query
        } else if (currentOpenFilter === 'all' && currentRadius != 50) {
            getVetData(currentLat, currentLon, 2) // query with just the radius
        } else if (currentOpenFilter === 'open' && currentRadius != 50) {
            getVetData(currentLat, currentLon, 3) // query with radius and opennow
        } else if (currentOpenFilter === 'open' && currentRadius === 50) {
            getVetData(currentLat, currentLon, 4) // query with just opennow
        }*/
        if(currentOpenFilter === 'open' && currentRadius === 5) {
            getVetData(currentLat, currentLon, 4)
        } else if (currentOpenFilter === 'all' && currentRadius === 5) {
            getVetData(currentLat, currentLon, 1)
        } else if(currentOpenFilter === 'all' && currentRadius != 5) {
            getVetData(currentLat, currentLon, 2)
        } else if(currentOpenFilter === 'open' && currentRadius != 5) {
            getVetData(currentLat, currentLon, 3)
        }
    }, [currentOpenFilter])

    useEffect(() => {
        if(currentOpenFilter === 'open' && currentRadius === 5) {
            getVetData(currentLat, currentLon, 4)
        } else if (currentOpenFilter === 'all' && currentRadius === 5) {
            getVetData(currentLat, currentLon, 1)
        } else if(currentOpenFilter === 'all' && currentRadius != 5) {
            getVetData(currentLat, currentLon, 2)
            console.log("trigger query 2")
        } else if(currentOpenFilter === 'open' && currentRadius != 5) {
            getVetData(currentLat, currentLon, 3)
        }
    }, [currentRadius])
    

    const setMapCoordinates = (region) => {
        setCurrentMapLat(region.latitude)
        setCurrentMapLon(region.longitude)
        setZoomLevelLat(region.latitudeDelta)
        setZoomLevelLon(region.longitudeDelta)
    }

    const autocompleteSuggestions = (value) => {
        setSearchValue(value)
        getSuggestions(value)
        if(value === '') {
            setSuggestionsHidden(true)
        } else {
            setSuggestionsHidden(false)
        }
    }

    const getSuggestions = async (value) => {
        const suggestionsQuery = `https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&format=json&apiKey=${API_KEY_GEOAPIFY}`;
        await fetch(suggestionsQuery, {method: 'GET'})
        .then(response => response.json())
        .then(data => {
            if(data.results[0]) {
                setSearchSuggestionsList(data.results)
            } else {
                return
            }
        })
        .catch(error => console.log(error))
    }

    const setManualCoords = (lat, lon, value) => {
        console.log(`New Coordinates, ${lat}, ${lon}`)
        setCurrentMapLat(lat)
        setCurrentMapLon(lon)
        setCurrentLat(lat)
        setCurrentLon(lon)
        if(currentOpenFilter === 'all') {
            getVetData(lat, lon, 1)
        } else if (currentOpenFilter === 'open') {
            getVetData(lat, lon, 4)
        }
        setSearchValue(value)
        setSuggestionsHidden(true)
    }

    const customStyle = [
        {
        elementType: 'geometry',
        stylers: [
            {
            color: '#474747',
            },
        ],
        },
        {
        featureType: "poi.business",
            stylers: [{ visibility: "off" }],
        },
        {
        featureType: "poi.attraction",
            stylers: [{ visibility: "off" }],
        },
        {
        featureType: "poi.government",
            stylers: [{ visibility: "off" }],
        },
        {
        featureType: "poi.school",
            stylers: [{ visibility: "off" }],
        },
        {
        featureType: "poi.medical",
            stylers: [{ visibility: "off" }],
        },
        {
        featureType: "poi.place_of_worship",
            stylers: [{ visibility: "off" }],
        },
        {
        featureType: "poi.sports_complex",
            stylers: [{ visibility: "off" }],
        },
        {
        elementType: 'labels.text.fill',
        stylers: [
            {
            color: '#f7f7f7',
            },
        ],
        },
        {
        elementType: 'labels.text.stroke',
        stylers: [
            {
            color: '#242f3e',
            },
        ],
        },
        {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [
            {
            color: '#d3f1c5',
            },
        ],
        },
        {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [
            {
            color: '#459fc1',
            },
        ],
        },
        {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [
            {
            color: '#41513e',
            },
        ],
        },
        {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [
            {
            color: '#00ff00',
            },
        ],
        },
        {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [
            {
            color: '#6d6d6d',
            },
        ],
        },
        {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [
            {
            color: '#444647',
            },
        ],
        },
        {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [
            {
            color: '#d4d4d4',
            },
        ],
        },
        {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [
            {
            color: '#688b97',
            },
        ],
        },
        {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [
            {
            color: '#1f2835',
            },
        ],
        },
        {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [
            {
            color: '#f3d19c',
            },
        ],
        },
        {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [
            {
            color: '#2f3948',
            },
        ],
        },
        {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [
            {
            color: '#fff',
            },
        ],
        },
        {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
            {
            color: '#3f719b',
            },
        ],
        },
        {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [
            {
            color: '#515c6d',
            },
        ],
        },
        {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [
            {
            color: '#17263c',
            },
        ],
        },
    ];

    const getMarker = (item) => {
        let image
        if(!item.exoticAdmission || item.exoticAdmission === false) {
            if (currentLat === item.geometry.location.lat && currentLon === item.geometry.location.lon) {
                image = require('../assets/img/map-marker-dog_active.png')
            } else {
                image = require('../assets/img/map-marker-dog_s.png')
            }
        }
        else if (item.exoticAdmission === true) {
            if (currentLat === item.geometry.location.lat && currentLon === item.geometry.location.lon) {
                image = require("../assets/img/map-marker-snake_active.png")
            } else {
                image = require("../assets/img/map-marker-snake_s.png")
            }
        }
        return image
    }

    const openMaps = (lat, lng) => {
        console.log("Go to maps with coords ", lat, lng)
    }

    if(!currentLat && !currentLon) {
        return (
            <View style={styles.container}>
                <Text>Loading Map...</Text>
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                {filter_modal_visible && <MapFilterModal />}
                {add_modal_visible && <MapAddModal />}
                <View style={styles.searchBar}>
                    <MaterialIcons name="search" style={styles.searchIcon} size={30} color={Colors.primary} />
                    <TextInput value={searchValue} placeholder='Búsqueda manual' onChangeText={(value) => autocompleteSuggestions(value)} placeholderTextColor='white' style={styles.searchInput}/>
                </View>
                {!suggestionsHidden && <View style={styles.searchSuggestionsView}>
                    <FlatList 
                        data={searchSuggestionsList} 
                        keyExtractor={item => item.place_id} 
                        renderItem={itemData => <Suggestion address={itemData.item.formatted} onSuggestionPress={() => {setManualCoords(itemData.item.lat, itemData.item.lon, itemData.item.formatted)}} />}
                    />
                    </View>
                }
                <View style={styles.controls}>
                    <TouchableOpacity activeOpacity={0.9} style={styles.buttonMap} onPress={() => {
                        if(zoomLevelLat <= 0.02 || zoomLevelLon <= 0.02) {
                            Alert.alert('Warning', 'No more zoom for you')
                        } else {
                            setZoomLevelLat(zoomLevelLat-0.02)
                            setZoomLevelLon(zoomLevelLon-0.02)
                        }
                    }}>
                        <MaterialIcons name="zoom-in" size={35} color={Colors.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} style={styles.buttonMap} onPress={() => {
                        setZoomLevelLon(zoomLevelLon+0.02)
                        setZoomLevelLat(zoomLevelLat+0.02)
                    }}>
                        <MaterialIcons name="zoom-out" size={35} color={Colors.primary} />
                    </TouchableOpacity>
                </View>
                <View style={styles.controls2}>
                    <TouchableOpacity activeOpacity={0.8} style={styles.buttonMap} onPress={() => {
                        dispatch(mapActions.toggleModal(2))
                    }}>
                        <FontAwesome5 name="plus" size={25} color={Colors.primary}/>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} style={styles.buttonMap} onPress={() => {
                        dispatch(mapActions.toggleModal(1))
                    }}>
                        <FontAwesome5 name="sliders-h" size={25} color={Colors.primary}/>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} style={styles.buttonMap} onPress={getLocation}>
                        <MaterialCommunityIcons name="target" size={35} color={Colors.primary} />
                    </TouchableOpacity>
                </View>
                {!isLoading && renderVets()}
                <MapView 
                    region={{
                        latitude: currentMapLat,
                        longitude: currentMapLon,
                        latitudeDelta: zoomLevelLat,
                        longitudeDelta: zoomLevelLon,
                    }} 
                    style={styles.map}
                    customMapStyle={customStyle}
                    onRegionChangeComplete={(region) => setMapCoordinates(region)}
                >
                    <MapView.Circle center={{latitude: parseFloat(currentLat), longitude: parseFloat(currentLon)}} radius={currentRadius*1000} strokeWidth={2} strokeColor={Colors.primary} fillColor="rgba(0, 0, 0, 0.21)"/>
                    <Marker coordinate={{latitude: parseFloat(currentLat), longitude: parseFloat(currentLon)}} />
                    {!isLoading && dataArray.map(item => 
                        <Marker 
                            key={item.place_id} 
                            coordinate={{latitude: item.geometry.location.lat, longitude: item.geometry.location.lng}}
                            onPress={() => {
                                //const url = `google.navigation:q=${item.geometry.location.lat}+${item.geometry.location.lng}`
                                Linking.openURL(`geo:0,0?q=${item.geometry.location.lat},${item.geometry.location.lng}`)}
                            } 
                            image={getMarker(item)} />)}
                </MapView>
            </View>
        )
    }

    
}

export default MapScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#333',
        height: '100%',
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    map: {
        width: width,
        height: height,
        top: 0,
        left: 0,
        zIndex: 1
   },
   vets: {
       width: width,
       height: height,
       zIndex: 20,
       position: 'absolute',
       top: height*0.7,
       left: 0,
       backgroundColor: 'rgba(0,0,0,0.3)'
   },
   controls: {
       position: 'absolute',
       zIndex: 3,
       justifyContent: 'center',
       alignItems: 'center',
       top: height*0.55,
       right: width*0.02
   },
   controls2: {
       position: 'absolute',
       zIndex: 3,
       justifyContent: 'center',
       alignItems: 'center',
       top: height*0.48,
       left: width*0.02
   },
   buttonMap: {
       width: 50, 
       height: 50, 
       justifyContent: 'center', 
       alignItems: 'center', 
       backgroundColor: Colors.darkBG, 
       marginBottom: 5,
       borderRadius: 7.5
   },
   searchBar: {
       position: 'absolute',
       zIndex: 3,
       justifyContent: 'center',
       alignItems: 'flex-start',
       top: height*0.03,
   },
   searchInput: {
       width: width*0.95,
       height: 50,
       backgroundColor: Colors.darkBG,
       borderRadius: 7.5,
       fontFamily: 'montserrat',
       paddingLeft: 50,
       color: 'white'
   },
   searchIcon: {
       position: 'absolute',
       left: 10,
       zIndex: 4
   },
   searchSuggestionsView: {
       width: width*0.95,
       top: height*0.08,
       position: 'absolute',
       zIndex: 2,
       backgroundColor: 'rgba(51,51,51,1)',
       borderBottomLeftRadius: 7.5,
       borderBottomRightRadius: 7.5,
       padding: 10
   },
   autocompleteText: {
       color: 'white', 
       marginBottom: 15,
       fontFamily: 'montserrat'
   }
})
