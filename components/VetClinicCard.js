import { Alert, Dimensions, StyleSheet, Text, View, Pressable } from 'react-native'
//import { TouchableOpacity } from 'react-native-gesture-handler'
import React, {useState, useEffect} from 'react'
import Colors from '../constants/Colors'
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons'
import { useSelector } from 'react-redux'


const VetClinicCard = (props) => {
    const {clinicData} = props
    const id = clinicData.id
    const name = clinicData.name
    const address = clinicData.address
    const open = clinicData.open
    const lat = clinicData.lat
    const lon = clinicData.lon
    const cLat = clinicData.cLat
    const cLon = clinicData.cLon
    const lan = clinicData.lan
    const isManual = clinicData.isManual

    const [isLoading, setIsLoading] = useState(true)
    const [contactNumber, setContactNumber] = useState()
    const [distance, setDistance] = useState()
    const [isOpen, setIsOpen] = useState()
    const [clockColor, setClockColor] = useState()
    const [phoneIcon, setPhoneIcon] = useState()

    const api_key = 'AIzaSyDakXR8KVw1AK-X889ht4pRtoPBxlz0Zjw'

    useEffect(() => {
        if (lan === 'ES') {
            if (open === 'no_info') {
                setIsOpen('Sin información de apertura')
                setClockColor('#ffa200') //orange
            } else if (open === true) {
                setIsOpen('Abierto ahora')
                setClockColor(Colors.primary) //green
            } else if (open === false) {
                setIsOpen('Cerrado')
                setClockColor('red')
            }
        } else {
            if (open === 'no_info') {
                setIsOpen('No schedule info')
                setClockColor('#ffa200') //orange
            } else if (open === true) {
                setIsOpen('Open now')
                setClockColor(Colors.primary) //green
            } else if (open === false) {
                setIsOpen('Closed')
                setClockColor('red')
            }
        }
        if(!isManual) {
            getDetails()
            getDrivingDistance()
        } else {
            const distance = clinicData.distance.toString() + " km"
            setDistance(distance)
            const contact = clinicData.contact
            setContactNumber(contact)
            setPhoneIcon('local-phone')
            setIsLoading(false)
        }
    }, [])

    

    const getDetails = async () => {
         await fetch(`https://maps.googleapis.com/maps/api/place/details/json?fields=formatted_phone_number&place_id=${id}&key=${api_key}`, {method: 'GET'})
        .then(response => response.json())
        .then(data => {
            if(data.result.formatted_phone_number) {
                setContactNumber(data.result.formatted_phone_number)
                setPhoneIcon('local-phone')
            } else {
                setPhoneIcon('phone-disabled')
                if (lan === 'ES') {
                    setContactNumber('Sin información de contacto')
                } else {
                    setContactNumber('No contact info')
                }
            }
        })
        .catch(error => console.log(error))
    }

    const getDrivingDistance = async () => {
        await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${lat},${lon}&origins=${cLat},${cLon}&key=${api_key}`)
        .then(response => response.json())
        .then(data => {
            if(data.rows[0]) {
                setDistance(data.rows[0].elements[0].distance.text)
                setIsLoading(false)
            } else {
                if(currentLanguage === 'ES')
                setDistance('?')
                setIsLoading(false)
            }
        }
        )
        .catch(error => console.log(error))
    }

    return (
        <View style={styles.container}>
            <Pressable onPress={props.onClinicPress}>
                {!isLoading && <View>
                <View style={{height: '40%', width: '100%'}}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.text}>{address}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginTop: 5, alignItems: 'center', width: '90%', height: '30%'}}>
                    <MaterialCommunityIcons name="clock-time-eight-outline" size={24} color={clockColor} style={{marginRight: 10}} />
                    <Text style={styles.text}>{isOpen}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: '25%', width: '100%'}}>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginRight: 20, width: '70%'}}>
                        <MaterialIcons name="local-phone" size={24} color={phoneIcon === 'local-phone' ? Colors.primary : 'red'} style={{marginRight: 10}}/>
                        <Text style={styles.text}>{contactNumber}</Text>
                    </View>
                    <Text style={styles.text}>{distance}</Text>
                </View>
                </View>}
            </Pressable>
        </View>
    )
     
}

export default VetClinicCard

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').height * 0.19,
        flex: 1,
        padding: 10,
        marginTop: 10,
        marginHorizontal: 7.5,
        borderRadius: 5,
        backgroundColor: Colors.darkBG,
        justifyContent: 'space-between',
        alignItems: 'stretch',
    },
    text: {
        color: 'white',
        fontFamily: 'montserrat',
        fontSize: 11,
        width: '100%'
    },
    name: {
        fontFamily: 'montserrat-bold',
        fontSize: 13,
        marginBottom: 5,
        color: '#fff'
    }
})