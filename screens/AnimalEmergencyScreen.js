import React, { useState, useEffect, useRef, useCallback } from 'react'
import { StyleSheet, FlatList, View, Dimensions, ImageBackground, TouchableWithoutFeedback, TouchableOpacity, Text, ScrollView } from 'react-native'
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
    const dispatch = useDispatch()
    const animalID = useSelector(state => state.search.animalSelected_id)
    const answeredList = useSelector(state => state.emergency.answeredList)
    
    const [SituationModalVisible, setSituationModalVisible] = useState(false)
    const [EmergencyHelpShown, setEmergencyHelpShown] = useState(false)
    const [EmergencyFormQuestions, setEmergencyFormQuestions] = useState()
    const [questionsReady, setQuestionsReady] = useState(false)
    const [formPageActive, setFormPageActive] = useState(1)
    const [formPages, setFormPages] = useState(1)
    const [pagStartIndex, setPagStartIndex] = useState(0)
    const [pagEndIndex, setPagEndIndex] = useState(4)
    const [arrowLeftBg, setArrowLeftBg] = useState("#aaa")
    const [arrowRightBg, setArrowRightBg] = useState(Colors.primary)
    //const [answeredList, setAnsweredList] = useState([])
    


    useEffect(() => {
        preProcessData()
    }, [])

    useEffect(() => {
        setQuestionsReady(true)
    }, [EmergencyFormQuestions])

    useEffect(() => {
        renderAnswers()
    }, [answeredList])

    const renderAnswers = () => {
        return(
            <View>
                {answeredList.map(function(element, idx){
                    return(
                        <View key={idx} style={{marginVertical: 10}}>
                            <Text>Question ID: {element.id}</Text>
                            <Text>Question Answer: {element.answer}</Text>
                        </View>
                    )
                })}
            </View>
        )
    }

    useEffect(() => {
        if (formPageActive == 1) {
            setArrowLeftBg("#aaa")
        }
        if (formPageActive == formPages) {
            setArrowRightBg("#aaa")
        }
        if (formPageActive > 1) {
            setArrowLeftBg(Colors.primary)
        }
        if (formPageActive < formPages) {
            setArrowRightBg(Colors.primary)
        }
    }, [formPageActive])

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
        const length = Object.keys(formQuestions).length
        const pages = Math.ceil(length/4)
        setFormPages(pages)
    }

    const renderQuestions = () => {
        // Slice the array
        let sliced_questions = EmergencyFormQuestions.slice(pagStartIndex, pagEndIndex)
        return(
            sliced_questions.map(function(element, idx){
                return(
                    <FormQuestion question={element} key={idx} />
                )
            })
        )
    }

    const formPageHandler = (direction) => {
        if (direction == 'right') {
            if(formPageActive < formPages) {
                setFormPageActive((prevFormPageActive) => prevFormPageActive + 1)
                setPagStartIndex((prevPagStartIndex) => prevPagStartIndex + 4)
                setPagEndIndex((prevPagEndIndex) => prevPagEndIndex + 4)
            }
        } else if (direction == 'left') {
            if (formPageActive > 1) {
                setFormPageActive((prevFormPageActive) => prevFormPageActive -1)
                setPagStartIndex((prevPagStartIndex) => prevPagStartIndex - 4)
                setPagEndIndex((prevPagEndIndex) => prevPagEndIndex -4)
            }
        }
        dispatch(emergencyActions.updateFormPage())
        renderQuestions()
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
                <View style={styles.arrows}>
                    <TouchableOpacity onPress={() => {formPageHandler('left')}}><MaterialCommunityIcons name={'arrow-left'} size={30} color={formPageActive == 1 ? "#aaa" : Colors.primary} /></TouchableOpacity>
                    <Text style={styles.text}>{formPageActive}/{formPages}</Text>
                    <TouchableOpacity onPress={() => {formPageHandler('right')}}><MaterialCommunityIcons name={'arrow-right'} size={30} color={formPageActive == formPages ? "#aaa" : Colors.primary} /></TouchableOpacity>
                </View>
            </View>
            {renderAnswers()}
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
        width: '100%',
        marginVertical: 10
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
