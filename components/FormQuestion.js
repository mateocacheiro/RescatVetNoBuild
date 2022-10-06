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
    const [infoID, setInfoID] = useState('')

    const questionTitleES = props.question[activeQuestionIndex]['QuestionTitleES']

    const questionInfo = props.question[activeQuestionIndex]['InfoES']

    const question_length = Object.keys(props.question).length

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
    }

  return (
    <View style={styles.container}>
        {question_length > 1 && <TouchableOpacity style={styles.chevron} activeOpacity={0.8} onPress={() => {questionChangeHandler('left')}}> 
            <MaterialCommunityIcons name='chevron-left' size={30} color={chevronLeftBg} />
        </TouchableOpacity>
        }
        <View style={styles.middle}>
            <View style={styles.question}>
                <Text style={styles.text}>{questionTitleES}</Text>
                {questionInfo && <TouchableOpacity style={styles.info} onPress={() => {
                    dispatch(emergencyActions.updateInfoID(infoID))
                    dispatch(emergencyActions.toggleModal())
                }}>
                    <MaterialCommunityIcons name="information" size={20} color="white" />
                </TouchableOpacity>}
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity style={[styles.button, {backgroundColor: bg_yes}]} onPress={() => {
                    setBg_yes('green')
                    setBg_no('rgba(0,0,0,0)')
                    dispatch(emergencyActions.updateAnswer({id: question_id, value: 'yes'}))
                }}>
                    <Text style={styles.btnText}>Si</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, {backgroundColor: bg_no}]} onPress={() => {
                    props.onAnswerPress
                    setBg_no('green')
                    setBg_yes('rgba(0,0,0,0)')
                    dispatch(emergencyActions.updateAnswer({id: question_id, value: 'no'}))
                }}>
                    <Text style={styles.btnText}>No</Text>
                </TouchableOpacity>
            </View>
        </View>
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