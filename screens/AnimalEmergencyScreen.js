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
    const currentLanguage = useSelector(state => state.language.selectedLenguage)
    const modal_info_visible = useSelector(state => state.emergency.modal_info_visible)

    const [SituationModalVisible, setSituationModalVisible] = useState(false)
    const [InfoModalVisible, setInfoModalVisible] = useState(false)
    const [EmergencyHelpShown, setEmergencyHelpShown] = useState(false)
    const [EmergencyFormQuestions, setEmergencyFormQuestions] = useState()
    const [questionsReady, setQuestionsReady] = useState(false)
    const [formPageActive, setFormPageActive] = useState(1)
    const [formPages, setFormPages] = useState(1)
    const [pagStartIndex, setPagStartIndex] = useState(0)
    const [pagEndIndex, setPagEndIndex] = useState(4)
    const [formCompleted, setFormCompleted] = useState(false)
    const [questionNum, setQuestionNum] = useState()
    const [animalTitle, setAnimalTitle] = useState()
    const [homeTitle, setHomeTitle] = useState()
    const [emergencyBCTitle, setEmergencyBCTitle] = useState()
    const [emergencyTitle, setEmergencyTitle] = useState()
    const [arrowLeftBg, setArrowLeftBg] = useState()
    const [arrowRightBg, setArrowRightBg] = useState()


    useEffect(() => {
        preProcessData()
    }, [])

    useEffect(() => {
        setQuestionsReady(true)
    }, [EmergencyFormQuestions])

    useEffect(() => {
        console.log('New answeredList length: ' + answeredList.length + ' for ' + questionNum + ' questions.')
        if (answeredList && answeredList.length == questionNum) {
            setFormCompleted(true)
            renderAnswers()
        }
    }, [answeredList])

    useEffect(() => {
        if (questionsReady) {renderQuestions()}
        const animalObj = AnimalsData.filter(function(element){return element.ID == animalID})[0]
        if (currentLanguage == 'ES') {
            setAnimalTitle(animalObj.NameES)
            setHomeTitle("Inicio")
            setEmergencyBCTitle("Emergencias")
            setEmergencyTitle("Formulario de Emergencias")
        } else {
            setAnimalTitle(animalObj.NameEN)
            setHomeTitle("Home")
            setEmergencyBCTitle("Emergencies")
            setEmergencyTitle("Emergency Form")
        }
    }, [currentLanguage])

    useEffect(() => {
        console.log(modal_info_visible)
        if (modal_info_visible) {
            setInfoModalVisible(true)
        } else {
            setInfoModalVisible(false)
        }
    }, [modal_info_visible])

    const renderAnswers = () => {
        let accordionList = []
        answeredList.map((element) => {
            const element_id = element.id
            const answer = element.answer
            switch(element_id) {
                case 1: {
                    // If it doesn't breathe: 3 (artificial breathing), 4 (contusion), 19 (choking), 20 (Asphyxiation)
                    if (!accordionList.includes(3)) {accordionList.push(3)}
                    if (!accordionList.includes(4)) {accordionList.push(4)}
                    if (!accordionList.includes(19)) {accordionList.push(19)}
                }
                case 2: {
                    // Difficulty breathing: 19 (choking), 12 (tricomonas)
                    if (!accordionList.includes(19)) {accordionList.push(19)}
                    if (!accordionList.includes(12)) {accordionList.push(12)}
                }
                case 3: {
                    // Slow breathing: 4 (contusion)
                    if (!accordionList.includes(4)) {accordionList.push(4)}
                }
                case 4: {
                    // Fast and superficial breathing: 4 (contusion), 15 (heat stroke), 18 (bite), 22 (laying eggs)
                    if (!accordionList.includes(4)) {accordionList.push(4)}
                    if (!accordionList.includes(15)) {accordionList.push(15)}
                    if (!accordionList.includes(18)) {accordionList.push(18)}
                    if (!accordionList.includes(22)) {accordionList.push(22)}
                }
                case 5: {
                    // If it's unconscious: 4 (contusion), 15 (heat stroke), 16 (hypothermia)
                    if (!accordionList.includes(4)) {accordionList.push(4)}
                    if (!accordionList.includes(16)) {accordionList.push(16)}
                    if (!accordionList.includes(15)) {accordionList.push(15)}
                }
                case 6: {
                    // Pupils not reacting to light: 4 (contusion)
                    if (!accordionList.includes(4)) {accordionList.push(4)}
                }
                case 7: {
                    // If it's unstable or falling down: 4 (contusion), 14 (poisoning), 15 (heat stroke)
                    if (!accordionList.includes(4)) {accordionList.push(4)}
                    if (!accordionList.includes(14)) {accordionList.push(14)}
                }
                case 8: {
                    // Blood on the feathersuit: 6 (broken wing), 18 (bite), 21 (foreign body)
                    if (!accordionList.includes(6)) {accordionList.push(6)}
                    if (!accordionList.includes(18)) {accordionList.push(18)}
                    if (!accordionList.includes(21)) {accordionList.push(21)}
                }
                case 9: {
                    // Bleeds from body orifice: 4 (contusion), 14 (poisoning)
                    if (!accordionList.includes(4)) {accordionList.push(4)}
                    if (!accordionList.includes(14)) {accordionList.push(14)}
                }
                case 10: {
                    // It has open wounds: 18 (bite)
                    if (!accordionList.includes(18)) {accordionList.push(18)}
                }
                case 11: {
                    // Visible guts: 4 (contusion), 18 (bite), 22 (laying eggs)
                    if (!accordionList.includes(4)) {accordionList.push(4)}
                    if (!accordionList.includes(18)) {accordionList.push(18)}
                    if (!accordionList.includes(22)) {accordionList.push(22)}
                }
                case 12: {
                    // Visible burns: 23 (burns)
                    if (!accordionList.includes(23)) {accordionList.push(23)}
                }
                case 13: {
                    // Low temperature: 4 (contusion), 14 (poisoning), 16 (hypothermia)
                    if (!accordionList.includes(4)) {accordionList.push(4)}
                    if (!accordionList.includes(14)) {accordionList.push(14)}
                    if (!accordionList.includes(16)) {accordionList.push(16)}
                }
                case 14: {
                    // Head in unnatural position: 9 (paramixovirus), 14 (poisoning)
                    if (!accordionList.includes(9)) {accordionList.push(9)}
                    if (!accordionList.includes(14)) {accordionList.push(14)}
                }
                case 15: {
                    // Wing in unnatural position: 4 (contusion), 5 (dislocated wing), 6 (broken wing)
                    if (!accordionList.includes(4)) {accordionList.push(4)}
                    if (!accordionList.includes(5)) {accordionList.push(5)}
                    if (!accordionList.includes(6)) {accordionList.push(6)}
                }
                case 16: {
                    // Leg in unnatural position: 4 (contusion), 7 (broken leg), 8 (dislocated leg), 22 (laying eggs)
                    if (!accordionList.includes(4)) {accordionList.push(4)}
                    if (!accordionList.includes(7)) {accordionList.push(7)}
                    if (!accordionList.includes(8)) {accordionList.push(8)}
                    if (!accordionList.includes(22)) {accordionList.push(22)}
                }
                case 17: {
                    // It's lethargic: 10 (coccidios), 14 (poisoning), 16 (hypothermia), 22 (laying eggs)
                    if (!accordionList.includes(10)) {accordionList.push(10)}
                    if (!accordionList.includes(14)) {accordionList.push(14)}
                    if (!accordionList.includes(16)) {accordionList.push(16)}
                    if (!accordionList.includes(22)) {accordionList.push(22)}
                }
                case 18: {
                    // Fluid coming out of the beak: 20 (Asphyxiation)
                    if (!accordionList.includes(20)) {accordionList.push(20)}
                }
                case 19: {
                    // Swollen crop: 4 (contusion)
                    if (!accordionList.includes(4)) {accordionList.push(4)}
                }
                case 20: {
                    // Swollen abdomen: 22 (laying eggs)
                    if (!accordionList.includes(22)) {accordionList.push(22)}
                }
                case 21: {
                    // Vomit: 17 (vomit)
                    if (!accordionList.includes(17)) {accordionList.push(17)}
                }
                case 22: {
                    // Dirty cloaca: 10 (coccidios), 12 (tricomonas)
                    if (!accordionList.includes(10)) {accordionList.push(10)}
                    if (!accordionList.includes(12)) {accordionList.push(12)}
                }
                case 24: {
                    // Liquid feces: 9 (paramixovirus), 10 (coccidios)
                    if (!accordionList.includes(9)) {accordionList.push(9)}
                    if (!accordionList.includes(10)) {accordionList.push(10)}
                }
                case 25: {
                    // Greenish feces: 10 (coccidios)
                    if (!accordionList.includes(10)) {accordionList.push(10)}
                }
                case 26: {
                    // Blood in feces: 9 (paramixovirus), 10 (coccidios)
                    if (!accordionList.includes(9)) {accordionList.push(9)}
                    if (!accordionList.includes(10)) {accordionList.push(10)}
                }
                case 27: {
                    // Thick feces: 10 (coccidios)
                    if (!accordionList.includes(10)) {accordionList.push(10)}
                }
                case 28: {
                    // Papules: 11 (pox)
                    if (!accordionList.includes(11)) {accordionList.push(11)}
                }
                case 29: {
                    // Plaques: 12 (tricomonas)
                    if (!accordionList.includes(12)) {accordionList.push(12)}
                }
                case 30: {
                    // Entangled hairs or threads: 13 (entangled hairs)
                    if (!accordionList.includes(13)) {accordionList.push(13)}
                }
            }
        })
        
        return(
            <View style={styles.formContainer}>
                {formCompleted && <View>
                    <Text style={styles.text}>FORM COMPLETED</Text>
                    {accordionList.map(function(element, idx){
                        return(
                            <AccordionItem id={element} key={idx} type="emergency" />
                        )
                    })}
                </View>}
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
        let questionCount = 0
        EmergencyQuestions.map(function(element){
            if (element.AnimalID == 0 || element.AnimalID == animalID) {
                if (element.Children > 0) {
                    lastParentID = element.ID
                    lastParentChildren = element.Children
                    questionBlock = questionBlock.concat(element)
                    questionCount += 1
                }
                if (element.ParentID && element.ID <= (lastParentID + lastParentChildren)) {
                    questionBlock = questionBlock.concat(element)
                    if (element.ID == lastParentID+lastParentChildren) {
                        blockObj = Object.assign({}, questionBlock)
                        formQuestions = formQuestions.concat(blockObj)
                        questionBlock = []
                    }
                    questionCount += 1
                }
                if (element.Children == 0 && !element.ParentID) {
                    questionObj = Object.assign({}, [element])
                    formQuestions = formQuestions.concat(questionObj)
                    questionCount += 1
                }
            }
        })
        setEmergencyFormQuestions(formQuestions)
        const length = Object.keys(formQuestions).length
        const pages = Math.ceil(length/4)
        setFormPages(pages)
        setQuestionNum(questionCount)
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
            {InfoModalVisible && <InfoModal />}
            <ScrollView contentContainerStyle={styles.container}>
                    <View style={styles.breadCrumbs}>
                        <TouchableWithoutFeedback>
                            <Text style={styles.text}>{homeTitle}</Text>
                        </TouchableWithoutFeedback>
                        <Text style={styles.text}>&gt;</Text>
                        <Text style={styles.text}>{animalTitle}</Text>
                        <Text style={styles.text}>&gt;</Text>
                        <Text style={styles.text}>{emergencyBCTitle}</Text>
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
                        <MaterialIcons name='local-hospital' size={70} color={Colors.primary} />
                    </View>
                    <Text style={styles.title}>{emergencyTitle}</Text>
                <View style={styles.formContainer}>
                    <AccordionItem id={1} type="emergency" />
                </View>
                <View style={styles.formContainer}>
                    {questionsReady && renderQuestions()}
                    <View style={styles.arrows}>
                        <TouchableOpacity onPress={() => {formPageHandler('left')}}><MaterialCommunityIcons name={'arrow-left'} size={30} color={formPageActive == 1 ? "#aaa" : Colors.primary} /></TouchableOpacity>
                        <Text style={styles.text}>{formPageActive}/{formPages}</Text>
                        <TouchableOpacity onPress={() => {formPageHandler('right')}}><MaterialCommunityIcons name={'arrow-right'} size={30} color={formPageActive == formPages ? "#aaa" : Colors.primary} /></TouchableOpacity>
                    </View>
                </View>
                {formCompleted && renderAnswers()}
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
        width: d_width * 0.97,
        zIndex: 1,
        marginTop: d_width * 0.01,
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

/*
            <View style={styles.animalPicking}>
                <AccordionItem title="Cómo coger al animal" animalID={animalID} contentID={26} />
            </View>
*/