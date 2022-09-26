import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ImageBackground, ScrollView, Dimensions, TouchableWithoutFeedback, Linking, FlatList, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import Colors from '../constants/Colors'
import { useSelector } from 'react-redux'
import ExternalResources from '../assets/database/ExternalResources.json'
import ResourceItem from '../components/ResourceItem'


/*

Filter logic:

Create a state reducer:
    - Facebook_filter
    - Instagram_filter
    - Twitter_filter
    - Web_filter

If there are no filters applied, pass the entire JSON data to FlatList

If at least one of the filters has a state of true:

    - Map through the data and add the rows which GroupName matches the active filters, to a new Object array
    - Send the object array to the Flatlist as data

*/

const AnimalExternalResourcesScreen = () => {

    const animalID = useSelector(state => state.search.animalSelected_id)
    
    const [headerImg, setHeaderImg] = useState()
    const [animalName, setAnimalName] = useState()
    const [noResourcesInfo, setNoResourcesInfo] = useState(false)
    const [resourcesFilter, setResourcesFilter] = useState([])
    const [filteredArray, setFilteredArray] = useState()
    const [facebookFilterActive, setFacebookFilterActive] = useState(false)
    const [twitterFilterActive, setTwitterFilterActive] = useState(false)
    const [instagramFilterActive, setInstagramFilterActive] = useState(false)
    const [youtubeFilterActive, setYoutubeFilterActive] = useState(false)
    const [webFilterActive, setWebFilterActive] = useState(false)

    useEffect(() => {
        if(animalID == 1) {
            setHeaderImg(require('../assets/img/pigeon_screen.jpg'))
            setAnimalName('Paloma')
        }
        else if(animalID == 2) {
            setHeaderImg(require('../assets/img/2.jpg'))
            setAnimalName('Gato')
        }
        else if(animalID == 3) {
            setHeaderImg(require('../assets/img/3.jpg'))
            setAnimalName('Perro')
        }
        else if(animalID == 4) {
            setHeaderImg(require('../assets/img/4.jpg'))
            setAnimalName('Conejo')
        }
        else if(animalID == 5) {
            setHeaderImg(require('../assets/img/turtle_screen.jpg'))
            setAnimalName('Tortuga')
        }
        else if(animalID == 6) {
            setHeaderImg(require('../assets/img/6.jpg'))
            setAnimalName('Aye-aye')
        }
        console.log("Animal ID: ", animalID)
    }, [animalID])

    useEffect(() => {

        let filteredData = []
        let initializedData = []

        initializedData = ExternalResources.filter(function(element){
            if(element.AnimalID != animalID){
                return null
            } else {
                return element
            }
        }).map(function(element){
            return element
        })

        if (initializedData.length == 0) {
            setNoResourcesInfo(true)
        }

        if (resourcesFilter.includes('Facebook')) {
            filteredData = filteredData.concat(ExternalResources.filter(function(element){
                if (element.GroupName != 'Facebook' && element.AnimalID == animalID) {
                    return null 
                } else {
                    return element
                }
            }).map(function(element){
                return element 
            }))
        }
        if (resourcesFilter.includes('Twitter')) {
            filteredData = filteredData.concat(ExternalResources.filter(function(element){
                if (element.GroupName != 'Twitter' && element.AnimalID == animalID) {
                    return null
                } else {
                    return element
                }
            }).map(function(element){
                return element
            }))
        }
        if (resourcesFilter.includes('Instagram')) {
            filteredData = filteredData.concat(ExternalResources.filter(function(element){
                if (element.GroupName != 'Instagram' && element.AnimalID == animalID) {
                    return null
                } else {
                    return element
                }
            }).map(function(element){
                return element
            }))
        }
        if (resourcesFilter.includes('Youtube')) {
            filteredData = filteredData.concat(ExternalResources.filter(function(element){
                if (element.GroupName != 'Youtube' && element.AnimalID == animalID) {
                    return null
                } else {
                    return element
                }
            }).map(function(element){
                return element
            }))
        }
        if (resourcesFilter.includes('Web')) {
            filteredData = filteredData.concat(ExternalResources.filter(function(element){
                if (element.GroupName != 'Web' && element.AnimalID == animalID) {
                    return null
                } else {
                    return element
                }
            }).map(function(element){
                return element
            }))
        }

        if(resourcesFilter.length > 0) {
            setFilteredArray(filteredData)
        } else {
            setFilteredArray(initializedData)
        }
        
    }, [resourcesFilter])

    useEffect(() => {
        renderResources()
    }, [filteredArray])
    
    const updateFilter = (mediaName) => {
        if (mediaName == 'Facebook') {
            setFacebookFilterActive(!facebookFilterActive)
        } else if (mediaName == 'Twitter') {
            setTwitterFilterActive(!twitterFilterActive)
        } else if (mediaName == 'Instagram') {
            setInstagramFilterActive(!instagramFilterActive)
        } else if (mediaName == 'Youtube') {
            setYoutubeFilterActive(!youtubeFilterActive)
        } else if (mediaName == 'Web') {
            setWebFilterActive(!webFilterActive)
        }

        let r_Array

        if(!resourcesFilter.includes(mediaName)) {
            r_Array = resourcesFilter.concat(mediaName)
            setResourcesFilter(r_Array)
        } else {
            r_Array = resourcesFilter.filter(function(element){
                if (element == mediaName) {
                    return null
                } else {
                    return element
                }
            })
            setResourcesFilter(r_Array)
        }
    }

    const VirtualizedList = ({children}) => {
        return (
            <FlatList
                data={[]}
                keyExtractor={() => "key"}
                renderItem={null}
                ListHeaderComponent={
                    <>{children}</>
                }
                style={{backgroundColor: Colors.lightBG}}
            />
        )
    }

    const renderResources = () => {
        return(
            <FlatList data={filteredArray}
                style={{marginVertical: 10}}
                scrollEnabled={true} 
                keyExtractor={resource => resource.ID} 
                renderItem={itemData => {
                    if (itemData.item.AnimalID == animalID) {
                        return <ResourceItem title={itemData.item.Title} name={itemData.item.GroupName} onLink={() => {Linking.openURL(itemData.item.URL)}}/>
                    }
                }}/>
        )
    }

    return (
        <View style={styles.container}>
            <VirtualizedList>
            <ScrollView>
                <ImageBackground source={headerImg} resizeMode="cover" style={styles.headerBlock}>
                    <View style={styles.breadCrumbs}>
                        <TouchableWithoutFeedback>
                            <Text style={styles.text}>Inicio</Text>
                        </TouchableWithoutFeedback>
                        <Text style={styles.text}>&gt;</Text>
                        <Text style={styles.text}>{animalName}</Text>
                        <Text style={styles.text}>&gt;</Text>
                        <Text style={styles.text}>Recursos externos</Text>
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
                        <MaterialCommunityIcons name='launch' size={70} color={Colors.primary} />
                    </View>
                    <Text style={styles.title}> Recursos externos</Text>
                    <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 10}}><View style={styles.divider}/></View>
                    <View style={styles.descriptionBlock}>
                        <Text style={[styles.text, {textAlign: 'center'}]}>En esta página tendrás acceso a enlaces de páginas y grupos de redes sociales y otras webs, relacionadas con las palomas.</Text>
                    </View> 
                </ImageBackground>
                {!noResourcesInfo && <View style={styles.contentBlock}>
                    <View>
                        <View style={styles.filterTitle}>
                            <MaterialCommunityIcons name="filter" size={30} color={Colors.primary} />
                            <Text style={[styles.title, {marginBottom: 0}]}>Filter</Text>
                        </View>
                        <View style={styles.divider2} />
                    </View>
                    <View style={styles.filter_row1}>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => {updateFilter('Facebook')}}>
                            <View style={[styles.filterItem_row1, {backgroundColor: facebookFilterActive ? Colors.primary : '#aaa'}]}>
                                <MaterialCommunityIcons name="facebook" color="white" size={25} style={{marginHorizontal: 5}}/>
                                <Text style={styles.text}>Facebook</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => {updateFilter('Twitter')}}>
                            <View style={[styles.filterItem_row1, {backgroundColor: twitterFilterActive ? Colors.primary : '#aaa'}]}>
                                <MaterialCommunityIcons name="twitter" color="white" size={25} style={{marginHorizontal: 5}}/>
                                <Text style={styles.text}>Twitter</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => {updateFilter('Instagram')}}>
                            <View style={[styles.filterItem_row1, {backgroundColor: instagramFilterActive ? Colors.primary : '#aaa'}]}>
                                <MaterialCommunityIcons name="instagram" color="white" size={25} style={{marginHorizontal: 5}}/>
                                <Text style={styles.text}>Instagram</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.filter_row2}>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => {updateFilter('Youtube')}}>
                            <View style={[styles.filterItem_row2, {backgroundColor: youtubeFilterActive ? Colors.primary : '#aaa'}]}>
                                <MaterialCommunityIcons name="youtube" color="white" size={25} style={{marginHorizontal: 5}}/>
                                <Text style={styles.text}>Youtube</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => {updateFilter('Web')}}>
                            <View style={[styles.filterItem_row2, {backgroundColor: webFilterActive ? Colors.primary : '#aaa'}]}>
                                <MaterialCommunityIcons name="web" color="white" size={25} style={{marginHorizontal: 5}}/>
                                <Text style={styles.text}>Webs y Blogs</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {renderResources()}
                </View>
                       
            }
            {noResourcesInfo && <View style={styles.contentBlock}>
                <Text style={[styles.text, {alignSelf: 'center'}]}>No hay recursos externos para {animalName}</Text>
            </View>}
            </ScrollView>
            </VirtualizedList>
        </View>
    )
}

export default AnimalExternalResourcesScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#333',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    headerBlock: {
        width: Dimensions.get('window').width*0.97,
        zIndex: 1,
        marginTop: Dimensions.get('window').height * 0.01,
        justifyContent: 'space-between',
        paddingBottom: 40,
        paddingTop: 20,
        borderTopLeftRadius: 7.5,
        borderTopRightRadius: 7.5,
        overflow: 'hidden'
    },
    breadCrumbs: {
        flexDirection: 'row',
        marginLeft: 20,
        marginBottom: 30
    },
    text: {
        fontFamily: 'montserrat',
        fontSize: 14,
        marginRight: 5,
        color: 'white'
    },
    image: {
        width: Dimensions.get('window').width,
        top: 0
    },
    title: {
        fontFamily: 'montserrat-bold',
        color: Colors.primary,
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10
    },
    divider: {
        height: 3,
        width: Dimensions.get('window').width*0.9,
        backgroundColor: Colors.primary,
    },
    divider2: {
        height: 2,
        width: Dimensions.get('window').width*0.9,
        backgroundColor: "#aaa",
        marginBottom: 15
    },
    descriptionBlock: {
        width: Dimensions.get('window').width*0.97,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5
    },
    contentBlock: {
        width: Dimensions.get('window').width * 0.97,
        backgroundColor: Colors.darkBG,
        borderRadius: 7.5,
        zIndex: 3,
        marginTop: -20,
        paddingVertical: 30,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    },
    mediaTitle: {
        fontFamily: 'montserrat-bold',
        color: Colors.primary,
        fontSize: 18,
        marginBottom: 5
    },
    filter_row1: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 5,
        maxWidth: Dimensions.get('window').width*0.9,
    },
    filter_row2: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        maxWidth: Dimensions.get('window').width*0.9,
    },
    filterItem_row1: {
        backgroundColor: '#aaa',
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        marginHorizontal: 10
    },
    filterItem_row2: {
        backgroundColor: '#aaa',
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        marginHorizontal: 3
    },
    filterTitle: {
        width: Dimensions.get('window').width*0.9,
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        alignItems: 'center',
        marginBottom: 10
    }
})
