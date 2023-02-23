import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import Colors from '../constants/Colors'
import { useDispatch, useSelector } from 'react-redux'
import { emergencyActions } from '../store/emergency-slice'


const FormQuestion = (props) => {
    const dispatch = useDispatch()
    
    const [bg_yes, setBg_yes] = useState('')
    const [bg_no, setBg_no] = useState('')
    const [chevronLeftBg, setChevronLeftBg] = useState('#aaa')
    const [chevronRightBg, setChevronRightBg] = useState('#aaa')
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)
    const answeredList = useSelector(state => state.emergency.answeredList)
    const newFormPage = useSelector(state => state.emergency.newFormPage)
    const [infoID, setInfoID] = useState('')
    const [newQuestionLoaded, setNewQuestionLoaded] = useState(false)
    const currentLanguage = useSelector(state => state.language.selectedLanguage)
    const [indexUpdated, setIndexUpdated] = useState(false)

    let questionTitle

    const question_length = Object.keys(props.question).length
    
    const questionInfo = props.question[activeQuestionIndex]['InfoES']

    const question_id = props.question[activeQuestionIndex]['ID']

    const parent_id = props.question[activeQuestionIndex]['ParentID']

    useEffect(() => {
        if (parent_id) {
            const indexOfItem = answeredList.findIndex(q => q.id == question_id)
            if (indexOfItem > -1) {
                setActiveQuestionIndex(question_id-parent_id)
            } else {
                setActiveQuestionIndex(0)
            }
        }
        setIndexUpdated(true)
        updateBtnBg()
        renderQuestion()
    }, [newFormPage])

    if (currentLanguage == 'ES') {
        questionTitle = props.question[activeQuestionIndex]['QuestionTitleES']
    } else {
        questionTitle = props.question[activeQuestionIndex]['QuestionTitleEN']
    }

    useEffect(() => {
        updateBtnBg()
        renderQuestion()
    }, [newQuestionLoaded])

    useEffect(() => {
        updateBtnBg()
        renderQuestion()
    }, [answeredList])

    const updateBtnBg = () => {
        const indexOfItem = answeredList.findIndex(q => q.id == question_id)

        if (indexOfItem > -1) {
            if (answeredList[indexOfItem].answer == 'yes') {
                setBg_yes(Colors.primary)
                setBg_no('rgba(0,0,0,0)')
            } else if (answeredList[indexOfItem].answer == 'no') {
                setBg_yes('rgba(0,0,0,0)')
                setBg_no(Colors.primary)
            }
        } else {
            setBg_no('rgba(0,0,0,0)')
            setBg_yes('rgba(0,0,0,0)')
        }
    }

    useEffect(() => {
        if(question_length > 1) {
            if (activeQuestionIndex == 0) {
                setChevronLeftBg("#aaa")
            } else {
                setChevronLeftBg(Colors.primary)
            }

            if (activeQuestionIndex == question_length-1) {
                setChevronRightBg("#aaa")
            } else {
                setChevronRightBg(Colors.primary)
            }
        }
    }, [activeQuestionIndex])

    const questionChangeHandler = (direction) => {
        if (direction == 'right') {
            if (activeQuestionIndex < question_length-1) {
                setActiveQuestionIndex((prevActiveQuestionIndex) => prevActiveQuestionIndex+1)
            }
        } else if (direction == 'left') {
            if (activeQuestionIndex > 0) {
                setActiveQuestionIndex((prevActiveQuestionIndex) => prevActiveQuestionIndex-1)
            }
        }
        renderQuestion()
        setNewQuestionLoaded((prevNewQuestionLoaded) => !prevNewQuestionLoaded)
    }

    const questionAnswerHandler = (ans) => {
        dispatch(emergencyActions.updateAnswer({
            id: question_id,
            answer: ans
        }))
    }

    const infoHandler = () => {
        dispatch(emergencyActions.toggleInfoModal(question_id))
        console.log("Info toggled for question with id ", question_id)
    }

    const renderQuestion = () => {
        
        return(
            <View style={styles.middle}>
                <View style={styles.question}>
                    <Text style={styles.text}>{questionTitle}</Text>
                    {questionInfo && <TouchableOpacity style={styles.info} onPress={infoHandler}>
                        <MaterialCommunityIcons name="information" size={20} color="white" />
                    </TouchableOpacity>}
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity style={[styles.button, {backgroundColor: bg_yes}]} onPress={() => {
                        questionAnswerHandler('yes')
                    }}>
                        <Text style={styles.btnText}>{currentLanguage == "ES" ? "Si" : "Yes"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, {backgroundColor: bg_no}]} onPress={() => {
                        questionAnswerHandler('no')
                    }}>
                        <Text style={styles.btnText}>No</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

  return (
    <View style={styles.container}>
        {question_length > 1 && <TouchableOpacity style={styles.chevron} activeOpacity={0.8} onPress={() => {questionChangeHandler('left')}}> 
            <MaterialCommunityIcons name='chevron-left' size={30} color={chevronLeftBg} />
        </TouchableOpacity>
        }
        {indexUpdated && renderQuestion()}
        {question_length > 1 && <TouchableOpacity style={styles.chevron} activeOpacity={0.8} onPress={() => {questionChangeHandler('right')}}> 
            <MaterialCommunityIcons name='chevron-right' size={30} color={chevronRightBg} />
        </TouchableOpacity>
        }
    </View>
  )
}

export default FormQuestion

d_width = Dimensions.get('window').width
//d_height = Dimensions.get('window').height

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,0)',
        alignItems: 'center',
        alignSelf: 'center',
        alignContent: 'center',
        width: '100%',
        marginVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    text: {
        fontFamily: 'montserrat',
        color: 'white',
        fontSize: 13,
        marginHorizontal: 5,
        textAlign: 'center',
        color: 'white'  
    },
    question: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        flexDirection: 'row'
    },
    buttons: {
        flexDirection: 'row',
        width: d_width*0.5,
        height: Dimensions.get('window').height*0.05,
        justifyContent: 'space-evenly',
        alignContent: 'center',
        alignSelf: 'center'
    },
    button: {
        width: d_width * 0.25,
        marginHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderColor: 'green',
        borderWidth: 1.5
    },
    btnText: {
        fontFamily: 'montserrat-bold',
        color: 'white',
        fontSize: 14 
    },
    chevron: {
        width: '10%'
    },
    middle: {
        width: '70%'
    }
})