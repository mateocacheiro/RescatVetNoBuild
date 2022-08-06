import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ActivityIndicator, Image } from 'react-native'
import React, {useState, useRef, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Colors from '../constants/Colors'
import * as MediaLibrary from 'expo-media-library'
import * as ImagePicker from 'expo-image-picker';
//import {cropPicture} from '../helpers/image-helper.js';


const ClassifierScreen = () => {

    const [imageIsProcessing, setImageIsProcessing] = useState(false)

    const [imageProcessed, setImageProcessed] = useState(false)

    const [renderInit, setRenderInit] = useState(true)

    const [image, setImage] = useState(null);

    const [imageUri, setImageUri] = useState(null)

    const [startCamera, setStartCamera] = useState(false)

    //const [type, setType] = useState(CameraType.back)

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        });

        if (!result.cancelled) {
            setImage(result.base64)
            setImageUri(result.uri)
        }
    };

    const verifyPermissions = async () => {
        let { status } = await ImagePicker.getCameraPermissionsAsync().catch(error => console.log)
        if (status !== 'granted') {
            Alert.alert('', 'Permission not granted!')
            return false
        }
        return true
    }

    const getPictureFromGallery = async () => {
        pickImage()
    }

    useEffect(() => {
        if(image) {
            setRenderInit(false)
            setImageIsProcessing(true)
        }
    }, [image, imageUri])

    const takePicture = async () => {
        const hasPermissions = await verifyPermissions()
        if(hasPermissions) {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: false,
                aspect: [4, 3],
                quality: 0.5,
                base64: true,
            });

            if (!result.cancelled) {
                setImage(result.base64)
                setImageUri(result.uri)
            }
        } else {
            console.log('No camera available')
        }
    }

    const makePrediction = (img) => {
        console.log(img)
        setImageIsProcessing(true)
        setRenderInit(false)
    }

  return (
    <View style={styles.container}>
        {renderInit && <View style={{alignItems: 'center'}}>
            <MaterialCommunityIcons name="image-filter-center-focus-strong-outline" size={70} color={Colors.primary} />
            <Text style={styles.title}>Clasificador de especies</Text>
            <View style={styles.optionsBlock}>
                <TouchableOpacity activeOpacity={0.9} style={styles.cameraBlock} onPress={takePicture}>
                    <MaterialCommunityIcons name="camera-plus-outline" size={50} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.9} style={styles.cameraBlock} onPress={getPictureFromGallery} >
                    <MaterialCommunityIcons name="folder-multiple-outline" size={50} color="#fff" />
                </TouchableOpacity>
            </View>
            <View style={styles.optionsText}>
                <Text style={styles.text}>Hacer foto con la cámara</Text>
                <Text style={styles.text}>Escoger de la galería</Text>
            </View>
        </View>
        }
        {imageIsProcessing && <View style={{alignItems: 'center'}}>
            {imageUri && <Image source={{uri: imageUri}} style={{width: 224, height: 224}} />}
            <ActivityIndicator size={'large'} color="#fff" style={{marginVertical: 20}} />
            <Text style={[styles.text, {alignSelf: 'center'}]}>Procesando imagen...</Text>
        </View>}
    </View>
  )
}

export default ClassifierScreen

d_width = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        width: d_width,
        height: Dimensions.get('window').height,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.darkBG
    },
    text: {
        fontFamily: 'montserrat',
        fontSize: 14,
        color: 'white',
        alignSelf: 'flex-start',
        textAlign: 'center',
        width: d_width*0.45
    },
    title: {
        fontFamily: 'montserrat-bold',
        color: Colors.primary,
        fontSize: 18,
        alignSelf: 'center',
        marginVertical: 20
    },
    cameraBlock: {
        width: d_width*0.45,
        height: d_width*0.45,
        borderRadius: 10,
        backgroundColor: Colors.lightBG,
        justifyContent: 'center',
        alignItems: 'center'
    },
    optionsBlock: {
        width: d_width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    optionsText: {
        width: d_width,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        paddingHorizontal: 10
    }
})