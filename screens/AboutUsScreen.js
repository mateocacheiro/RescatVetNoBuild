import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import Card from '../components/Card'
import { MaterialIcons } from '@expo/vector-icons'
import Colors from '../constants/Colors'
import { ScrollView } from 'react-native-gesture-handler'
import AboutUsData from '../assets/database/AboutUs.json'
import { useSelector } from 'react-redux'

const AboutUs = () => {
    
    const currentLanguage = useSelector(state => state.language.selectedLenguage)

    useEffect(() => {
        renderContent()
    }, [currentLanguage])

    const data_0 = AboutUsData.filter(about => about.ID === 0)[0]
    const data_1 = AboutUsData.filter(about => about.ID === 1)[0]

    const renderContent = () => {
        let description_0
        let description_1
        let pageTitle 

        if (currentLanguage === 'ES') {
            description_0 = data_0.Description_ES
            description_1 = data_1.Description_ES
            pageTitle = 'Sobre Nosotros'
        } else {
            description_0 = data_0.Description_EN
            description_1 = data_1.Description_EN
            pageTitle = 'About Us'
        }
        return(
            <ScrollView>
                <Card>
                    <MaterialIcons name="info" size={50} color={Colors.primary} />
                    <Text style={styles.title}>{pageTitle}</Text>
                    <View style={styles.divider}></View>
                    <View style={styles.imageContainer}>
                        <Image source={require('../assets/img/woman_vector.png')} style={{
                            width: 60,
                            resizeMode: 'contain',
                            height: 82
                        }} />
                        <Image source={require('../assets/img/man_vector.png')} style={styles.image} />
                    </View>
                    <Text style={styles.title}>{data_0.Name}</Text>
                    <Text style={styles.description}>{description_0}</Text>
                </Card>
                <Card>
                    <View style={styles.imageContainer}>
                        <Image source={require('../assets/img/man2_vector.png')} style={styles.image} />
                    </View>
                    <Text style={styles.title}>{data_1.Name}</Text>
                    <Text style={styles.description}>{description_1}</Text>
                </Card>
            </ScrollView>
        )
    }


    return (
        <View style={styles.container}>
            {renderContent()}
        </View>
    )
}

export default AboutUs

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#333',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    title: {
        fontFamily: 'montserrat-bold',
        color: Colors.primary,
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 15
    },
    description: {
        fontSize: 14,
        fontFamily: 'montserrat',
        color: 'white',
        textAlign: 'justify',
        width: '100%'
    },
    divider: {
        width: '100%',
        height: 0.5,
        backgroundColor: 'white',
        marginBottom: 15
    },
    imageContainer: {
        flexDirection: 'row',
        marginBottom: 15
    },
    image: {
        width: 60,
        resizeMode: 'contain',
        height: 82
    },
    textPadding: {
        marginVertical: 10
    }
})
