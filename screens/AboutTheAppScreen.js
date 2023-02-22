import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, ScrollView, View } from 'react-native'
import { useSelector } from 'react-redux'
import Colors from '../constants/Colors'
import AboutApp from '../assets/database/AboutApp.json'
import Card from '../components/Card'
import {MaterialIcons, MaterialCommunityIcons} from '@expo/vector-icons'

const AboutTheAppScreen = () => {

    const currentLanguage = useSelector(state => state.language.selectedLanguage)

    useEffect(() => {
        renderContent()
        console.log(currentLanguage)
    }, [currentLanguage])

    const origin = AboutApp.filter(data => data.ID === 1)[0]

    const development = AboutApp.filter(data => data.ID === 2)[0]

    const identity = AboutApp.filter(data => data.ID === 3)[0]

    const collaboration = AboutApp.filter(data => data.ID === 4)[0]

    const renderContent = () => {

        let titleOrigin
        let titleDevelopment
        let titleIdentity
        let titleCollaboration
        let descriptionOrigin
        let descriptionDevelopment
        let descriptionIdentity
        let descriptionCollaboration
        let pageTitle

        if(currentLanguage === 'ES') {
            titleOrigin = origin.Title_ES
            titleDevelopment = development.Title_ES
            titleIdentity = identity.Title_ES
            titleCollaboration = collaboration.Title_ES
            descriptionOrigin = origin.Description_ES
            descriptionDevelopment = development.Description_ES
            descriptionIdentity = identity.Description_ES
            descriptionCollaboration = collaboration.Description_ES
            pageTitle = 'Sobre la app'
        } else {
            titleOrigin = origin.Title_EN
            titleDevelopment = development.Title_EN
            titleIdentity = identity.Title_EN
            titleCollaboration = collaboration.Title_EN
            descriptionOrigin = origin.Description_EN
            descriptionDevelopment = development.Description_EN
            descriptionIdentity = identity.Description_EN
            descriptionCollaboration = collaboration.Description_EN
            pageTitle = 'About the app'
        }

        return (
            <ScrollView>
                <Card>
                    <MaterialIcons name="phone-android" size={50} color={Colors.primary} />
                    <Text style={styles.title}>{pageTitle}</Text>
                    <View style={styles.divider}></View>
                    <MaterialCommunityIcons name="source-fork" size={50} color={Colors.primary} />
                    <Text style={styles.title}>{titleOrigin}</Text>
                    <Text style={styles.description}>{descriptionOrigin}</Text>
                </Card>
                <Card>
                    <MaterialIcons name="code" size={50} color={Colors.primary} />
                    <Text style={styles.title}>{titleDevelopment}</Text>
                    <Text style={styles.description}>{descriptionDevelopment}</Text>
                </Card>
                <Card>
                    <MaterialIcons name="verified-user" size={50} color={Colors.primary} />
                    <Text style={styles.title}>{titleIdentity}</Text>
                    <Text style={styles.description}>{descriptionIdentity}</Text>
                </Card>
                <Card>
                    <MaterialCommunityIcons name="handshake" size={50} color={Colors.primary} />
                    <Text style={styles.title}>{titleCollaboration}</Text>
                    <Text style={styles.description}>{descriptionCollaboration}</Text>
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

export default AboutTheAppScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.lightBG,
        height: '100%',
        flex: 1,
        justifyContent: 'center',
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
    }
})
