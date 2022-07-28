import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import C_Button from './C_Button'
import { screenActions } from '../store/screen-slice'
import { useDispatch, useSelector } from 'react-redux'
import { Video, AVPlaybackStatus } from 'expo-av';
import Home_1 from '../assets/video/HomeCards.mp4'
import Menu from '../assets/video/Menu.mp4'
import Logo from '../assets/video/Logo.mp4'
import AnimalCard from '../assets/video/AnimalCard.mp4'
import EmergencyQuestion from '../assets/video/EmergencyQuestion.mp4'
import EmergencyInfo from '../assets/video/EmergencyInfo.mp4'
import {MaterialCommunityIcons} from '@expo/vector-icons'

const InterfaceModal = (props) => {

    const dispatch = useDispatch()

    const id_change = useSelector(state => state.screen.interfaceHelp)

    const [interfaceID, setInterfaceID] = useState(0)

    const [videoSource, setVideoSource] = useState({})

    const [firstPage, setFirstPage] = useState(true)
    const [lastPage, setLastPage] = useState(false)

    const [status, setStatus] = useState({});

    const video = React.useRef(null);

    useEffect(() => {
        video.current.playAsync()
    }, [])

    useEffect(() => {
        if (id_change === 0) {
            setVideoSource(Menu)
        } else if (id_change === 1) {
            setVideoSource(EmergencyQuestion)
        }
        setFirstPage(true)
    }, [id_change])

  return (
    <View style={styles.container}>
        <View style={styles.inner}>
            <TouchableOpacity activeOpacity={0.8} style={{alignItems: 'flex-end', justifyContent: 'flex-end', width: d_width, paddingHorizontal: 30}} onPress={() => {
                dispatch(screenActions.hideInterfaceHelp())
            }}>
                <MaterialCommunityIcons name="close" size={30} color="white" />
            </TouchableOpacity>
            <Video
                ref={video} 
                source={videoSource} 
                style={styles.video} 
                resizeMode="contain"
                isLooping
                onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
            <View style={styles.arrows}>
                <TouchableOpacity onPress={() => {
                    if (videoSource === Home_1) {
                        setVideoSource(Menu)
                        setFirstPage(true)
                        setLastPage(false)
                    } else if (videoSource === AnimalCard) {
                        setVideoSource(Home_1)
                        setLastPage(false)
                    } else if (videoSource === EmergencyInfo) {
                        setVideoSource(EmergencyQuestion)
                        setFirstPage(true)
                        setLastPage(false)
                    }
                }}><MaterialCommunityIcons name='arrow-left' size={30} color={firstPage ? 'gray' : 'white'} /></TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    if (videoSource === Menu) {
                        setVideoSource(Logo)
                        setFirstPage(false)
                    } else if (videoSource === Logo) {
                        setVideoSource(Home_1)
                        setFirstPage(false)
                    } 
                    else if (videoSource === Home_1) {
                        setVideoSource(AnimalCard)
                        setLastPage(true)
                        setFirstPage(false)
                    } else if (videoSource === EmergencyQuestion) {
                        setVideoSource(EmergencyInfo)
                        setLastPage(true)
                        setFirstPage(false)
                    }
                }}><MaterialCommunityIcons name='arrow-right' size={30} color={lastPage ? 'gray' : 'white'} /></TouchableOpacity>
            </View>
        </View>
    </View>
  )
}

export default InterfaceModal

const d_width = Dimensions.get('window').width
const d_height = Dimensions.get('window').height

const styles = StyleSheet.create({
    container: {
        width: d_width,
        height: d_height,
        backgroundColor: "rgba(10,10,10,0.98)",
        position: 'absolute',
        zIndex: 2000
    },
    inner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: d_height,
        marginTop: '-30%'
    },
    text: {
        fontFamily: 'montserrat',
        fontSize: 13,
        color: 'white'
    },
    video: {
        width: d_width * 0.9,
        height: d_height * 0.7
    },
    arrows: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: d_width,
        paddingHorizontal: 30,
        marginTop: 20
    }
})