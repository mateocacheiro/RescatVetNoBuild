import React, { useState, useEffect, useRef, useCallback } from 'react'
import { StyleSheet, FlatList, View, Dimensions, ImageBackground, TouchableWithoutFeedback, Text, ScrollView } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import AnimalsData from '../assets/database/Animals.json'
import FormQuestion from '../components/FormQuestion'
import InfoModal from '../components/InfoModal'
import { emergencyActions } from '../store/emergency-slice'
import Colors from '../constants/Colors'
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons'
import AccordionItem from '../components/AccordionItem'
import InterfaceModal from '../components/InterfaceModal'
import { useNavigation } from '@react-navigation/native';
import SituationModal from '../components/SituationModal'
import EmergencyQuestions from '../assets/database/EmergencyQuestions.json'

const AnimalEmergencyScreen = ({navigation}) => {

    const animalID = useSelector(state => state.search.animalSelected_id)
    const [SituationModalVisible, setSituationModalVisible] = useState(false)
    const [EmergencyHelpShown, setEmergencyHelpShown] = useState(false)
    const [EmergencyFormQuestions, setEmergencyFormQuestions] = useState()
    const [questionsReady, setQuestionsReady] = useState(false)

    useEffect(() => {
        preProcessData()
    }, [])

    useEffect(() => {
        setQuestionsReady(true)
    }, [EmergencyFormQuestions])

    const renderHelp = () => {
        return(
            <InterfaceModal id={1} />
        )
    }

    const preProcessData = () => {
        let formQuestions = []
        let questionBlock = []
        let lastParentID
        let lastParentChildren
        let blockObj
        let questionObj
        EmergencyQuestions.map(function(element){
            if (element.Children > 0) {
                lastParentID = element.ID
                lastParentChildren = element.Children
                questionBlock = questionBlock.concat(element)
            }
            if (element.ParentID && element.ID <= (lastParentID + lastParentChildren)) {
                questionBlock = questionBlock.concat(element)
                if (element.ID == lastParentID+lastParentChildren) {
                    blockObj = Object.assign({}, questionBlock)
                    formQuestions = formQuestions.concat(blockObj)
                    questionBlock = []
                }
            }
            if (element.Children == 0 && !element.ParentID) {
                questionObj = Object.assign({}, [element])
                formQuestions = formQuestions.concat(questionObj)
            }
        })
        setEmergencyFormQuestions(formQuestions)
    }

    const renderQuestions = () => {
        return(
            EmergencyFormQuestions.map(function(element){
                return(
                    <FormQuestion question={element} />
                )
            })
        )
    }

    return (
        <View style={{backgroundColor: "#333", height: '100%'}}>
        {EmergencyHelpShown && renderHelp()}
        {SituationModalVisible && <SituationModal />}
        <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.breadCrumbs}>
                    <TouchableWithoutFeedback>
                        <Text style={styles.text}>Inicio</Text>
                    </TouchableWithoutFeedback>
                    <Text style={styles.text}>&gt;</Text>
                    <Text style={styles.text}>Paloma</Text>
                    <Text style={styles.text}>&gt;</Text>
                    <Text style={styles.text}>Emergencias</Text>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
                    <MaterialIcons name='local-hospital' size={70} color={Colors.primary} />
                </View>
                <Text style={styles.title}>Formulario de emergencias</Text>
            <View style={styles.animalPicking}>
                <AccordionItem title="Cómo coger al animal" animalID={animalID} contentID={26} />
            </View>
            <View style={styles.formContainer}>
                {questionsReady && renderQuestions()}
            </View>
        </ScrollView>
        </View>
    )
}

export default AnimalEmergencyScreen

const d_width = Dimensions.get('window').width
const d_height = Dimensions.get('window').height

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        backgroundColor: '#333',
        alignItems: 'center',
        width: d_width,
    },
    formContainer: {
        marginBottom: 5,
        marginTop: 5,
        paddingVertical: 20,
        paddingHorizontal: 20,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#111',
        width: d_width*0.974,
        borderRadius: 5,
        elevation: 10,
        zIndex: 0
    },
    animalPicking: {
        marginBottom: 5,
        marginTop: 5,
        paddingVertical: 20,
        paddingHorizontal: 0,
        backgroundColor: '#111',
        width: d_width*0.974,
        borderRadius: 5,
        elevation: 10,
        zIndex: 0
    },
    arrows: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15,
        width: d_width*0.85
    },
    progressBarBG: {
        width: d_width*0.85,
        height: 5,
        backgroundColor: '#aaa',
        marginTop: 15,
        borderRadius: 5,
        position: 'relative',
        zIndex: 1
    },
    progressBarActive: {
        height: 5,
        backgroundColor: 'green',
        marginBottom: -20,
        marginTop: 15,
        borderRadius: 5,
        position: 'relative',
        zIndex: 2,
        justifyContent: 'flex-start',
        alignSelf: 'flex-start'
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
        overflow: 'hidden',
        marginBottom: -15
    },
    breadCrumbs: {
        flexDirection: 'row',
        marginLeft: 20,
        marginBottom: 30
    },
    image: {
        width: Dimensions.get('window').width,
        top: 0
    },
    title: {
        fontFamily: 'montserrat-bold',
        color: Colors.primary,
        fontSize: 18,
        textAlign: 'center'
    },
    text: {
        fontFamily: 'montserrat',
        fontSize: 14,
        marginRight: 5,
        color: 'white',
        marginVertical: 5
    },
    action: {
        width: Dimensions.get('window').width * 0.97,
        backgroundColor: Colors.darkBG,
        borderRadius: 7.5,
        zIndex: 3,
        paddingVertical: 30,
        marginBottom: 10
    },
    subdivider: {
        height: 3,
        width: Dimensions.get('window').width*0.87,
        backgroundColor: "green",
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    }
})
