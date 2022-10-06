import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import C_Button from './C_Button'
import { useDispatch, useSelector } from 'react-redux'
import { emergencyActions } from '../store/emergency-slice'


const FormQuestion = (props) => {
    const dispatch = useDispatch()
    const isBreathing = useSelector(state => state.emergency.chevron_state.isBreathing)
    const hasHeavyBreathing = useSelector(state => state.emergency.chevron_state.hasHeavyBreathing)
    const hasSlowBreathing = useSelector(state => state.emergency.chevron_state.hasSlowBreathing)
    const hasBlood = useSelector(state => state.emergency.chevron_state.hasSlowBreathing)
    const hasFeces = useSelector(state => state.emergency.chevron_state.hasFeces)
    const bloodOrifice = useSelector(state => state.emergency.chevron_state.hasSlowBreathing)
    const hasOpenWounds = useSelector(state => state.emergency.chevron_state.hasSlowBreathing)
    const [bg_yes, setBg_yes] = useState('')
    const [bg_no, setBg_no] = useState('')
    const [chevronLeftBg, setChevronLeftBg] = useState('#aaa')
    const [chevronRightBg, setChevronRightBg] = useState('#aaa')
    const [qText, setQText] = useState('')
    const [infoID, setInfoID] = useState('')
    const question_id = props.id
    const isMultiple = props.isMultiple
    const hasInfo = props.hasInfo

    useEffect(() => {
        if (question_id == 0) {
            setQText("¿Respira?")
            setChevronLeftBg('rgba(0,0,0,0)')
            setInfoID(0)
        }

        if (question_id == 1) {
            setQText("¿Está consciente?")
        }

        if (question_id == 2) {
            setQText("¿Tiene pulso?")
            setInfoID(1)
        }

        if (question_id == 3) {
            setQText("¿Las pupilas reaccionan a la luz?")
            setInfoID(2)
        }

        if (question_id == 4) {
            setQText("¿Respira con dificultad, como si tuviese una obstrucción?")
            setChevronLeftBg('green')
            setChevronRightBg('green')
        }

        if (question_id == 5) {
            setQText("¿La respiración es lenta y profunda?")
            setChevronLeftBg('green')
            setChevronRightBg('#aaa')
        }

        if (question_id == 6) {
            setQText("¿La respiración es rápida y superficial?")
            setChevronLeftBg('green')
            setChevronRightBg('rgba(0,0,0,0)')
        }

        if (question_id == 7) {
            setQText("¿Se tambalea o se cae?")
        }
        if (question_id == 8) {
            setQText("¿Tiene sangre en el plumaje?")
            setChevronLeftBg('rgba(0,0,0,0)')
            setChevronRightBg('#aaa')
        }
        if (question_id == 9) {
            setQText("¿Sangra por algún orificio corporal?")
            setChevronLeftBg('green')
            setChevronRightBg('green')
        }
        if (question_id == 10) {
            setQText("¿Tiene heridas abiertas?")
            setChevronRightBg('rgba(0,0,0,0)')
            setChevronLeftBg('green')
            setChevronRightBg('green')
        }
        if (question_id == 11) {
            setQText("¿Tiene la temperatura baja?")
            setInfoID(3)
        }
        if (question_id == 12) {
            setQText("¿Está aletargada o cansada?")
            setInfoID(4)
        }
        if (question_id == 13) {
            setQText("¿Tiene la cabeza en una posición no natural?")
            setInfoID(5)
        }
        if (question_id == 14) {
            setQText("¿Tiene algún ala en una posición no natural?")
            setInfoID(6)
        }
        if (question_id == 15) {
            setQText("¿Tiene alguna pata en posición no natural?")
        }
        if (question_id == 16) {
            setQText("¿Tiene la cloaca sucia?")
            setInfoID(7)
        }
        if (question_id == 17) {
            setQText("¿Le sale líquido por el pico?")
        }
        if (question_id == 18) {
            setQText("¿Tiene el buche hinchado?")
        }
        if (question_id == 19) {
            setQText("¿Ha defecado?")
            setChevronLeftBg('rgba(0,0,0,0)')
        }
        if (question_id == 20) {
            setQText("¿Las heces son muy líquidas?")
            setChevronLeftBg('green')
            setChevronRightBg('green')
        }
        if (question_id == 21) {
            setQText("¿Las heces son verdosas?")
            setChevronLeftBg('green')
            setChevronRightBg('green')
        }
        if (question_id == 22) {
            setQText("¿Las heces tienen sangre?")
            setChevronLeftBg('green')
            setChevronRightBg('green')
        }
        if (question_id == 23) {
            setQText("¿Las heces son pastosas?")
            setChevronLeftBg('green')
            setChevronRightBg('rgba(0,0,0,0)')
        }
        if (question_id == 24) {
            setQText("¿Tiene pápulas por el cuerpo?")
            setInfoID(8)
        }
        if (question_id == 25) {
            setQText("¿Tiene placas blancas o amarillentas dentro del pico o por fuera?")
        }
        if (question_id == 26) {
            setQText("¿Tiene pelos o hilos enredados en los dedos o patas?")
        }
        if (question_id == 27) {
            setQText("¿Vomita / regurgita?")
        }
        if (question_id == 28) {
            setQText("¿Tiene algún cuerpo extraño clavado en el cuerpo?")
            setInfoID(9)
        }
        if (question_id == 29) {
            setQText("¿Tiene vísceras visibles?")
            setChevronRightBg('rgba(0,0,0,0)')
            setChevronLeftBg('green')
        }
        if (question_id == 30) {
            setQText("¿Tiene el abdomen hinchado?")
        }
    }, [])

    

    useEffect(() => {
        if (question_id == 0) {
            if (isBreathing == 0) {
                setChevronLeftBg('rgba(0,0,0,0)')
                setChevronRightBg('#aaa')
            }
            if (isBreathing == 1) {
                setChevronLeftBg('rgba(0,0,0,0)')
                setChevronRightBg('green')
            }
        }
        if (question_id == 5) {
            if (hasSlowBreathing == 0) {
                setChevronRightBg('green')
            } else if (hasSlowBreathing == 1) {
                setChevronRightBg('#aaa')
            }
        }
        if (question_id == 19) {
            if (hasFeces == 0) {
                setChevronRightBg('#aaa')
            } else if (hasFeces == 1) {
                setChevronRightBg('green')
            }
        }
    }, [isBreathing, hasSlowBreathing, hasHeavyBreathing, hasBlood, hasFeces])

    const chevronHandler = (direction) => {
        if (direction == 0) {
            // Go back
            if (question_id == 4) {
                dispatch(emergencyActions.changeQuestion(0))
            }
            else if (question_id == 5) {
                dispatch(emergencyActions.changeQuestion(4))
            }
            else if (question_id == 6) {
                dispatch(emergencyActions.changeQuestion(5))
            }
            else if (question_id == 9) {
                dispatch(emergencyActions.changeQuestion(8))
            }
            else if (question_id == 10) {
                dispatch(emergencyActions.changeQuestion(9))
            }
            else if (question_id = 29) {
                dispatch(emergencyActions.changeQuestion(10))
            }
            else if (question_id == 20) {
                dispatch(emergencyActions.changeQuestion(19))
            }
            else if (question_id == 21) {
                dispatch(emergencyActions.changeQuestion(20))
            }
            else if (question_id == 22) {
                dispatch(emergencyActions.changeQuestion(21))
            }
            else if (question_id == 23) {
                dispatch(emergencyActions.changeQuestion(22))
            }
        }
        if (direction == 1) {
            // Go forward
            if (question_id == 0) {
                dispatch(emergencyActions.changeQuestion(4))
            }
            else if (question_id == 4) {
                dispatch(emergencyActions.changeQuestion(5))
            }
            else if (question_id == 5) {
                dispatch(emergencyActions.changeQuestion(6))
            }
            else if (question_id == 8) {
                dispatch(emergencyActions.changeQuestion(9))
            }
            else if (question_id == 9) {
                dispatch(emergencyActions.changeQuestion(10))
            }
            else if (question_id == 10) {
                dispatch(emergencyActions.changeQuestion(29))
            }
            else if (question_id == 19) {
                dispatch(emergencyActions.changeQuestion(20))
            }
            else if (question_id == 20) {
                dispatch(emergencyActions.changeQuestion(21))
            }
            else if (question_id == 21) {
                dispatch(emergencyActions.changeQuestion(22))
            }
            else if (question_id == 22) {
                dispatch(emergencyActions.changeQuestion(23))
            }
        }
    }

  return (
    <View style={styles.container}>
        {isMultiple && <TouchableOpacity style={styles.chevron} onPress={()=>{chevronHandler(0)}}>
            <MaterialCommunityIcons name="chevron-left" size={40} color={chevronLeftBg} />
        </TouchableOpacity>}
        {!isMultiple && <MaterialCommunityIcons name="chevron-left" size={40} color="rgba(0,0,0,0)" />}
        <View style={styles.middle}>
            <View style={styles.question}>
                <Text style={styles.text}>{qText}</Text>
                {hasInfo && <TouchableOpacity style={styles.info} onPress={() => {
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
        {isMultiple && <TouchableOpacity onPress={()=>{chevronHandler(1)}}>
            <MaterialCommunityIcons name="chevron-right" size={40} color={chevronRightBg} />
        </TouchableOpacity>}
        {!isMultiple && <MaterialCommunityIcons name="chevron-left" size={40} color="rgba(0,0,0,0)" />}
    </View>
  )
}

export default FormQuestion

d_width = Dimensions.get('window').width
//d_height = Dimensions.get('window').height

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,0)',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        width: d_width*0.9,
        marginVertical: 15
    },
    text: {
        fontFamily: 'montserrat',
        color: 'white',
        fontSize: 13,
        marginHorizontal: 5,
        textAlign: 'center',
        maxWidth: '78%',
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
    
})