import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, TouchableOpacity, View, Dimensions, ImageBackground, TouchableWithoutFeedback, Text, ScrollView } from 'react-native'
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

const AnimalEmergencyScreen = ({navigation}) => {

    const dispatch = useDispatch()
    //const navigation = useNavigation()

    const interface_id = useSelector(state => state.screen.interfaceHelp)
    const interface_help_shown = useSelector(state => state.screen.interfaceHelpShown)

    const [EmergencyHelpShown, setEmergencyHelpShown] = useState(false)

    useEffect(() => {
        if (interface_id === 1 && interface_help_shown === true) {
            console.log("Showing help for interface with id 1")
            setEmergencyHelpShown(true)
        } else if (interface_id === 1 && interface_help_shown === false) {
            console.log("Hiding help for interface with id 1")
            setEmergencyHelpShown(false)
        }
    }, [interface_id, interface_help_shown])

    // States for each question

    const animalID = useSelector(state => state.search.animalSelected_id)
    const modal_info_visible = useSelector(state => state.emergency.modal_info_visible)
    const info_id = useSelector(state => state.emergency.info_id)
    const question_change = useSelector(state => state.emergency.question_change)
    
    const [animalName, setAnimalName] = useState('')

    //const animalSelected = AnimalsData.filter(animal => animal.ID === animalID)[0]

    const last_answer_id = useSelector(state => state.emergency.question_id)
    const last_answer_value = useSelector(state => state.emergency.value)

    const [activeBarWidth, setActiveBarWidth] = useState(d_width*0.85 / 5)
    const [formComplete, setFormComplete] = useState(false)
    const [isConscious, setIsConscious] = useState(2)
    const [isBreathing, setIsBreathing] = useState(2)
    const [hasPulse, setHasPulse] = useState(2)
    const [hasHeavyBreathing, setHasHeavyBreathing] = useState(2)
    const [hasSlowBreathing, setHasSlowBreathing] = useState(2)
    const [hasFastBreathing, setHasFastBreathing] = useState(2)
    const [pupils, setPupils] = useState(2)
    const [isFalling, setIsFalling] = useState(2)
    const [isTired, setIsTired] = useState(2)
    const [hasBlood, setHasBlood] = useState(2)
    const [bloodOrifice, setBloodOrifice] = useState(2)
    const [hasOpenWounds, setHasOpenWounds] = useState(2)
    const [hasLowTemp, setHasLowTemp] = useState(2)
    const [naturalHead, setNaturalHead] = useState(2)
    const [naturalWing, setNaturalWing] = useState(2)
    const [naturalLeg, setNaturalLeg] = useState(2)
    const [dirtyCloaca, setDirtyCloaca] = useState(2)
    const [liquidBeak, setLiquidBeak] = useState(2)
    const [buche, setBuche] = useState(2)
    const [feces, setFeces] = useState(2)
    const [liquidFeces, setLiquidFeces] = useState(2)
    const [greenFeces, setGreenFeces] = useState(2)
    const [bloodFeces, setBloodFeces] = useState(2)
    const [denseFeces, setDenseFeces] = useState(2)
    const [papulas, setPapulas] = useState(2)
    const [placas, setPlacas] = useState(2)
    const [hairs, setHairs] = useState(2)
    const [vomit, setVomit] = useState(2)

    const [renderPulse, setRenderPulse] = useState(0)
    const [renderBreathing, setRenderBreathing] = useState(1)
    const [renderBreathingSub1, setRenderBreathingSub1] = useState(0)
    const [renderBreathingSub2, setRenderBreathingSub2] = useState(0)
    const [renderBreathingSub3, setRenderBreathingSub3] = useState(0)
    const [renderPupils, setRenderPupils] = useState(0)
    const [renderConscious, setRenderConscious] = useState(0)
    const [renderBlood, setRenderBlood] = useState(1)
    const [renderBloodSub1, setRenderBloodSub1] = useState(0)
    const [renderBloodSub2, setRenderBloodSub2] = useState(0)
    const [renderFeces, setRenderFeces] = useState(1)
    const [renderFecesSub1, setRenderFecesSub1] = useState(0)
    const [renderFecesSub2, setRenderFecesSub2] = useState(0)
    const [renderFecesSub3, setRenderFecesSub3] = useState(0)
    const [renderFecesSub4, setRenderFecesSub4] = useState(0)

    const [renderBlock1, setRenderBlock1] = useState(1)
    const [renderBlock2, setRenderBlock2] = useState(0)
    const [renderBlock3, setRenderBlock3] = useState(0)
    const [renderBlock4, setRenderBlock4] = useState(0)
    const [renderBlock5, setRenderBlock5] = useState(0)
    
    const [renderContusion, setRenderContusion] = useState(0)
    const [renderDislocatedWing, setRenderDislocatedWing] = useState(0)
    const [renderDislocatedLeg, setRenderDislocatedLeg] = useState(0)
    const [renderBrokenLeg, setRenderBrokenLeg] = useState(0)
    const [renderBrokenWing, setRenderBrokenWing] = useState(0)
    const [renderParamixovirus, setRenderParamixovirus] = useState(0)
    const [renderCoccidios, setRenderCoccidios] = useState(0)
    const [renderTricho, setRenderTricho] = useState(0)
    const [renderPoisoning, setRenderPoisoning] = useState(0)
    const [renderPox, setRenderPox] = useState(0)
    const [renderHairs, setRenderHairs] = useState(0)
    const [renderHeat, setRenderHeat] = useState(0)
    const [renderHypothermia, setRenderHypothermia] = useState(0)
    const [renderChoking, setRenderChoking] = useState(0)
    const [renderAsphyxiation, setRenderAsphyxiation] = useState(0)
    const [renderForeignObject, setRenderForeignObject] = useState(0)
    const [renderBite, setRenderBite] = useState(0)
    const [renderRcp, setRenderRcp] = useState(0)
    const [renderVomit, setRenderVomit] = useState(0)
    const [renderArtificialBreathing, setRenderArtificialBreathing] = useState(0)
    const [cont_sub_ids, setCont_sub_ids] = useState([])


    const [arrowLeftColor, setArrowLeftColor] = useState('rgba(0,0,0,0)')
    const [arrowRightColor, setArrowRightColor] = useState('green')

    const [brokenLegPosition, setBrokenLegPosition] = useState(0)
    const [brokenWingPosition, setBrokenWingPosition] = useState(0)
    const [dislocatedLegPosition, setdislocatedLegPosition] = useState(0)
    const [dislocatedWingPosition, setdislocatedWingPosition] = useState(0)
    const [noPulsePosition, setNoPulsePosition] = useState(0)
    const [artificialBreathingPosition, setArtificialBreathingPosition] = useState(0)
    const [chokingPosition, setChokingPosition] = useState(0)
    const [asphyxiationPosition, setAsphyxiationPosition] = useState(0)

    const af_answers_list = []

    const refScrollView = useRef(null);

    const moveTo = (section) => {
    if (section == 0) { //Broken wing
        refScrollView.current.scrollTo({y: brokenWingPosition+920});
    }
    else if (section == 1) {
        refScrollView.current.scrollTo({y: brokenLegPosition+920});
    }
    else if (section == 2) {
        refScrollView.current.scrollTo({y: dislocatedWingPosition+920});
    }
    else if (section == 3) {
        refScrollView.current.scrollTo({y: dislocatedLegPosition+920});
    }
    else if (section == 4) {
        refScrollView.current.scrollTo({y: noPulsePosition+920})
    }
    else if (section == 5) {
        refScrollView.current.scrollTo({y: artificialBreathingPosition+920})
    }
    else if (section == 6) {
        refScrollView.current.scrollTo({y: chokingPosition+920})
    }
    else if (section == 7) {
        refScrollView.current.scrollTo({y: asphyxiationPosition+920})
    }
    // or just refScrollView.current.scrollTo({x: value1}); if you want to scroll horizontally
    // or just refScrollView.current.scrollTo({y: value2}); if you want to scroll vertically
  }

    useEffect(()=>{
        if(last_answer_id == 0) {
            if(last_answer_value == 'yes') {
                console.log("Pigeon is breathing")
                setRenderBreathing(0)
                setRenderBreathingSub1(1)
                setRenderBreathingSub2(0)
                setRenderBreathingSub3(0)
                setIsBreathing(1)
                dispatch(emergencyActions.updateChevronStates({id: 0, value: 1}))
                
            } else {
                console.log("Pigeon is not breathing")
                setRenderBreathing(1)
                setRenderBreathingSub1(0)
                setRenderBreathingSub2(0)
                setRenderBreathingSub3(0)
                setRenderPulse(0)
                setIsBreathing(0)
                setRenderChoking(1)
                setRenderAsphyxiation(1)
                dispatch(emergencyActions.updateChevronStates({id: 0, value: 0}))
                //setFormComplete(true)
                setRenderContusion(1)
                const sub_ids = cont_sub_ids
                sub_ids.push(0)
                setCont_sub_ids(sub_ids)
            }
           setRenderConscious(1) 
        }
        if (last_answer_id == 4) {
            if(last_answer_value == 'yes') {
                console.log("Pigeon has heavy breathing")
                setHasHeavyBreathing(1)
                setRenderBreathingSub1(0)
                setRenderBreathingSub2(1)
                setRenderBreathingSub3(0)
                setRenderBreathing(0)
                setRenderAsphyxiation(0)
            } else {
                console.log("Pigeon doesn't have heavy breathing")
                setHasHeavyBreathing(0)
                setRenderBreathing(0)
                setRenderBreathingSub1(0)
                setRenderBreathingSub2(1)
                setRenderBreathingSub3(0)
                setRenderTricho(1)
            }
            dispatch(emergencyActions.updateChevronStates({id: 4, value: hasHeavyBreathing}))
        }
        if (last_answer_id == 5) {
            if(last_answer_value == 'yes') {
                console.log("Pigeon has slow breathing")
                setHasSlowBreathing(1)
                setRenderBreathingSub1(0)
                setRenderBreathingSub3(0)
                setRenderBreathing(0)
                setRenderConscious(1)
                setRenderContusion(1)
            } else {
                console.log("Pigeon doesn't have slow breathing")
                setHasSlowBreathing(0)
                setRenderBreathing(0)
                setRenderBreathingSub1(0)
                setRenderBreathingSub2(0)
                setRenderBreathingSub3(1)
                
            }
            dispatch(emergencyActions.updateChevronStates({id: 5, value: hasSlowBreathing}))
        }
        if (last_answer_id == 6) {
            if(last_answer_value == 'yes') {
                console.log("Pigeon has fast breathing")
                setHasFastBreathing(1)
                setRenderBreathingSub1(0)
                setRenderBreathingSub2(0)
                setRenderBreathingSub3(1)
                setRenderBreathing(0)
                setRenderConscious(1)
                setRenderContusion(1)
                setRenderHeat(1)
                setRenderBite(1)
            } else {
                console.log("Pigeon doesn't have fast breathing")
                setHasFastBreathing(0)
                setRenderBreathing(0)
                setRenderBreathingSub1(0)
                setRenderBreathingSub2(0)
                setRenderBreathingSub3(1)
                setRenderConscious(1)
            }
            dispatch(emergencyActions.updateChevronStates({id: 6, value: hasFastBreathing}))
        }
        if(last_answer_id == 1) {
            if(last_answer_value == 'yes') {
                console.log("Pigeon is conscious")
                setIsConscious(1)
                if (hasFastBreathing == 1) {
                    cont_sub_ids.push(2)
                }
                setRenderAsphyxiation(1)
                setRenderChoking(1)
            } else {
                console.log("Pigeon is unconscious")
                setRenderPulse(0)
                //setFormComplete(true)
                setRenderContusion(1)
                setRenderAsphyxiation(1)
                setRenderChoking(1)
                setRenderHeat(1)
                const sub_ids = cont_sub_ids
                sub_ids.push(1)
                setCont_sub_ids(sub_ids)
            }
            setRenderPulse(1)
        }
        if(last_answer_id == 2) {
            if(last_answer_value == 'yes') {
                console.log("Pigeon has a pulse")
                setHasPulse(1)
                setRenderChoking(1)
            } else {
                console.log("Pigeon doesn't have a pulse")
                setRenderPupils(0)
                setHasPulse(0)
                setRenderRcp(true)
                //setFormComplete(true)
                setRenderChoking(1)
                setRenderContusion(1)
                const sub_ids = cont_sub_ids
                sub_ids.push(5)
                setCont_sub_ids(sub_ids)
            }
            setRenderPupils(1)
        }
        if(last_answer_id == 3) {
            if(last_answer_value == 'yes') {
                console.log("Pigeon's pupils react to light")
                setPupils(1)
                setRenderContusion(1)
            } else {
                console.log("Pigeon's pupils don't react to light")
                setPupils(0)
            }
        }

        if(last_answer_id == 7) {
            if(last_answer_value == 'yes') {
                console.log("Pigeon is wobbly")
                setIsFalling(1)
                setRenderContusion(1)
                setRenderPoisoning(1)
                setRenderHeat(1)
                const sub_ids = cont_sub_ids
                sub_ids.push(3)
                setCont_sub_ids(sub_ids)
            } else {
                console.log("Pigeon is not wobbly")
                setIsFalling(0)
            }
        }
        
        if(last_answer_id == 8) {
            if(last_answer_value == 'yes') {
                console.log("Pigeon has blood")
                setHasBlood(1)
                setRenderBlood(0)
                setRenderBloodSub1(1)
                setRenderBrokenWing(1)
                setRenderBite(1)
                setRenderForeignObject(1)   
            } else {
                console.log("Pigeon doesn't have blood")
                setHasBlood(0)
            }
        }
        
        if(last_answer_id == 9) {
            if(last_answer_value == 'yes') {
                console.log("Pigeon has blood coming out of an orifice")
                setHasBlood(1)
                setRenderBloodSub1(0)
                setRenderBloodSub2(1)
                setRenderContusion(1)
                setRenderPoisoning(1)
                const sub_ids = cont_sub_ids
                sub_ids.push(4)
                setCont_sub_ids(sub_ids)
            } else {
                console.log("Pigeon doesn't have blood coming out of an orifice")
                setHasBlood(0)
            }
        }
        if(last_answer_id == 10) {
            if(last_answer_value == 'yes') {
                console.log("Pigeon has open wounds")
                setHasOpenWounds(1)
                setRenderContusion(1)
                setRenderBrokenWing(1)
                setRenderBrokenLeg(1)
                setRenderBite(1)
                const sub_ids = cont_sub_ids
                sub_ids.push(5, 6)
                setCont_sub_ids(sub_ids)
            } else {
                console.log("Pigeon doesn't have open wounds")
                setHasOpenWounds(0)
            }
        }
        if(last_answer_id == 11) {
            if(last_answer_value == 'yes') {
                console.log("Pigeon's temperature is low")
                setHasLowTemp(1)
                setRenderContusion(1)
                setRenderPoisoning(1)
                setRenderAsphyxiation(1)
            } else {
                console.log("Pigeon's temperature is not low")
                setHasLowTemp(0)
            }
        }
        if(last_answer_id == 12) {
            if(last_answer_value == 'yes') {
                console.log("Pigeon is tired")
                setIsTired(1)
                setRenderCoccidios(1)
                setRenderPoisoning(1)
                setRenderAsphyxiation(1)
            } else {
                console.log("Pigeon is not tired")
                setIsTired(0)
            }
        }
        if(last_answer_id == 13) {
            if(last_answer_value == 'yes') {
                console.log("Pigeon's head is in an unnatural position")
                setNaturalHead(1)
                setRenderParamixovirus(1)
                setRenderPoisoning(1)
            } else {
                console.log("Pigeon's head is in an unnatural position")
                setNaturalHead(0)
            }
        }
        if(last_answer_id == 14) {
            if(last_answer_value == 'yes') {
                console.log("Pigeon's wing is in an unnatural position")
                setNaturalWing(1)
                setRenderDislocatedWing(1)
                setRenderBrokenWing(1)
                setRenderContusion(1)
                const sub_ids = cont_sub_ids
                sub_ids.push(7)
                setCont_sub_ids(sub_ids)
            } else {
                console.log("Pigeon's wing is in an unnatural position")
                setNaturalWing(0)
            }
        }
        if(last_answer_id == 15) {
            if(last_answer_value == 'yes') {
                console.log("Pigeon's leg is in an unnatural position")
                setNaturalLeg(1)
                setRenderContusion(1)
                setRenderDislocatedLeg(1)
            } else {
                console.log("Pigeon's leg is in an unnatural position")
                setNaturalLeg(0)
            }
        }
        if(last_answer_id == 16) {
            if(last_answer_value == 'yes') {
                console.log("Pigeon's cloaca is dirty")
                setDirtyCloaca(1)
                setRenderCoccidios(1)
                setRenderTricho(1)
            } else {
                console.log("Pigeon's cloaca is not dirty")
                setDirtyCloaca(0)
            }
        }
        if(last_answer_id == 17) {
            if(last_answer_value == 'yes') {
                console.log("Pigeon has liquid coming out of the beak")
                setLiquidBeak(1)
                setRenderAsphyxiation(1)
            } else {
                console.log("Pigeon doesn't have liquid coming out of the beak")
                setLiquidBeak(0)
            }
        }
        if(last_answer_id == 18) {
            if(last_answer_value == 'yes') {
                console.log("Pigeon has swollen buche")
                setBuche(1)
            } else {
                console.log("Pigeon doesn't have swollen buche")
                setBuche(0)
            }
        }
        if(last_answer_id == 19) {
            if(last_answer_value == 'yes') {
                console.log("Pigeon has feces")
                setFeces(1)
                setRenderFeces(0)
                setRenderFecesSub1(1)
            } else {
                console.log("Pigeon doesn't have feces")
                setFeces(0)
            }
        }
        if(last_answer_id == 20) {
            if(last_answer_value == 'yes') {
                console.log("Pigeon has liquid feces")
                setLiquidFeces(1)
                setRenderFecesSub1(0)
                setRenderFecesSub2(1)
                setRenderParamixovirus(1)
                setRenderCoccidios(1)
            } else {
                console.log("Pigeon doesn't have liquid feces")
                setLiquidFeces(0)
                setRenderFecesSub1(0)
                setRenderFecesSub2(1)
            }
        }
        if(last_answer_id == 21) {
            if(last_answer_value == 'yes') {
                console.log("Pigeon has green feces")
                setGreenFeces(1)
                setRenderFecesSub2(0)
                setRenderFecesSub3(1)
                setRenderCoccidios(1)
            } else {
                console.log("Pigeon doesn't have green feces")
                setGreenFeces(0)
                setRenderFecesSub2(0)
                setRenderFecesSub3(1)
            }
        }
        if(last_answer_id == 22) {
            if(last_answer_value == 'yes') {
                console.log("Pigeon has blood feces")
                setBloodFeces(1)
                setRenderFecesSub3(0)
                setRenderFecesSub4(1)
                setRenderParamixovirus(1)
                setRenderCoccidios(1)
            } else {
                console.log("Pigeon doesn't have blood feces")
                setBloodFeces(0)
                setRenderFecesSub3(0)
                setRenderFecesSub4(1)
            }
        }
        if(last_answer_id == 23) {
            if(last_answer_value == 'yes') {
                console.log("Pigeon has dense feces")
                setDenseFeces(1)
                setRenderCoccidios(1)
            } else {
                console.log("Pigeon doesn't dense feces")
                setDenseFeces(0)
            }
        }
        if(last_answer_id == 24) {
            if(last_answer_value == 'yes') {
                console.log("Pigeon has papules")
                setPapulas(1)
                setRenderPox(1)
            } else {
                console.log("Pigeon doesn't have papules")
                setPapulas(0)
            }
        }
        if(last_answer_id == 25) {
            if(last_answer_value == 'yes') {
                console.log("Pigeon has plaques")
                setPlacas(1)
                setRenderTricho(1)
            } else {
                console.log("Pigeon doesn't have plaques")
                setPlacas(0)
            }
        }
        if(last_answer_id == 26) {
            if(last_answer_value == 'yes') {
                console.log("Pigeon has hairs")
                setHairs(1)
            } else {
                console.log("Pigeon doesn't have hairs")
                setHairs(0)
            }
        }
        if(last_answer_id == 27) {
            if(last_answer_value == 'yes') {
                console.log('Pigeon has puked')
                setVomit(1)
                setRenderVomit(1)
            } else {
                setVomit(0)
            }
        }
        if(last_answer_id == 28) {
            if(last_answer_value == 'yes') {
                console.log('Pigeon has a foreign object')
                setRenderForeignObject(1)
            }
            setFormComplete(true)
        }
        
        if (isBreathing == 0 || isConscious == 0 || hasPulse == 0) {
            setRenderContusion(1)
        }

        if (isBreathing == 0 && hasPulse == 1) {
            setRenderArtificialBreathing(1)
        }

        if(hasSlowBreathing == 1 || hasFastBreathing == 1) {
            if (isConscious == 1 && hasPulse == 1 && pupils != 2 && isFalling != 2 && hasBlood != 2 && hasLowTemp != 2 && isTired != 2 && naturalHead != 2 && naturalWing != 2 && naturalLeg !=2 && dirtyCloaca != 2 && liquidBeak != 2 && buche != 2 && papulas != 2 && placas != 2 && hairs != 2) {
                setFormComplete(true)
                // conditions for contusion
                if (hasSlowBreathing == 1 || hasFastBreathing == 1 || pupils == 1 || bloodOrifice == 1 || naturalLeg == 1 || naturalWing == 1 || isFalling == 1 || hasOpenWounds == 1 || hasLowTemp == 1) {
                    setRenderContusion(true)
                }
                // conditions for dislocated wing
                if (naturalWing == 1) {
                    setRenderDislocatedWing(true)
                }
            }
        }
    }, [last_answer_value, last_answer_id])

    useEffect(() => {
        console.log(info_id)
    }, [modal_info_visible])

    useEffect(() => {
        console.log('Question change to ', question_change)
        if(question_change == 0) {
            setRenderBreathing(1)
            setRenderBreathingSub1(0)
        } else if (question_change == 4) {
            setRenderBreathing(0)
            setRenderBreathingSub2(0)
            setRenderBreathingSub1(1)
        } else if (question_change == 5) {
            setRenderBreathingSub3(0)
            setRenderBreathingSub2(1)
        } else if (question_change == 8) {
            setRenderBloodSub1(0)
            setRenderBlood(1)
            setRenderBloodSub2(0)
        } else if (question_change == 9) {
            setRenderBloodSub1(1)
            setRenderBlood(0)
            setRenderBloodSub2(0)
        } else if (question_change == 10) {
            setRenderBloodSub2(1)
            setRenderBlood(0)
            setRenderBloodSub1(0)
        }
        else if (question_change == 19) {
            setRenderFeces(1)
            setRenderFecesSub1(0)
            setRenderFecesSub2(0)
            setRenderFecesSub3(0)
            setRenderFecesSub4(0)
        }
        else if (question_change == 20) {
            setRenderFeces(0)
            setRenderFecesSub1(1)
            setRenderFecesSub2(0)
            setRenderFecesSub3(0)
            setRenderFecesSub4(0)
        }
        else if (question_change == 21) {
            setRenderFeces(0)
            setRenderFecesSub1(0)
            setRenderFecesSub2(1)
            setRenderFecesSub3(0)
            setRenderFecesSub4(0)
        }
        else if (question_change == 22) {
            setRenderFeces(0)
            setRenderFecesSub1(0)
            setRenderFecesSub2(0)
            setRenderFecesSub3(1)
            setRenderFecesSub4(0)
        }
        else if (question_change == 23) {
            setRenderFeces(0)
            setRenderFecesSub1(0)
            setRenderFecesSub2(0)
            setRenderFecesSub3(0)
            setRenderFecesSub4(1)
        }
    }, [question_change])

    const renderHelp = () => {
        return(
            <InterfaceModal id={1} />
        )
    }

    useEffect(() => {
        if (animalID === 0) {
            setAnimalName('Paloma')
        }
    }, [animalID])

    return (
        <View style={{backgroundColor: "#333", height: '100%'}}>
        {EmergencyHelpShown && renderHelp()}
        <ScrollView contentContainerStyle={styles.container} ref={refScrollView}>
            <ImageBackground source={require('../assets/img/pigeon_screen.jpg')} resizeMode="cover" style={styles.headerBlock}>
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
            </ImageBackground>
            <View style={styles.animalPicking}>
                <AccordionItem title="Cómo coger al animal" animalID={1} contentID={26} />
            </View>
            <View style={styles.formContainer}>
                {modal_info_visible && <InfoModal id={info_id} />}
                {renderBlock1 == 1 && <View>
                    {renderBreathing == 1 && <FormQuestion id={0} isMultiple={true} hasInfo={false} />}
                    {renderBreathingSub1 == 1 && <FormQuestion id={4} isMultiple={true} hasInfo={false} />}
                    {renderBreathingSub2 == 1 && <FormQuestion id={5} isMultiple={true} hasInfo={false} />}
                    {renderBreathingSub3 == 1 && <FormQuestion id={6} isMultiple={true} hasInfo={false} />}
                    {renderConscious == 1 && <FormQuestion id={1} isMultiple={false} hasInfo={false}/>}
                    {renderPulse == 1 && <FormQuestion id={2} isMultiple={false} hasInfo={true}/>}
                    {renderPupils == 1 && <FormQuestion id={3} isMultiple={false} hasInfo={true}/>}
                </View>}
                {renderBlock2 == 1 && <View>
                    <FormQuestion id={7} isMultiple={false} hasInfo={false} />
                    {renderBlood == 1 && <FormQuestion id={8} isMultiple={true} hasInfo={false} />}
                    {renderBloodSub1 == 1 && <FormQuestion id={9} isMultiple={true} hasInfo={false} />}
                    {renderBloodSub2 == 1 && <FormQuestion id={10} isMultiple={true} hasInfo={false} />}
                    <FormQuestion id={11} isMultiple={false} hasInfo={true} />
                    <FormQuestion id={12} isMultiple={false} hasInfo={true} />
                </View>}
                {renderBlock3 == 1 && <View>
                    <FormQuestion id={13} isMultiple={false} hasInfo={true} />
                    <FormQuestion id={14} isMultiple={false} hasInfo={true} />
                    <FormQuestion id={15} isMultiple={false} hasInfo={false} />
                    <FormQuestion id={16} isMultiple={false} hasInfo={true} />
                </View>}
                {renderBlock4 == 1 && <View>
                    <FormQuestion id={17} isMultiple={false} hasInfo={false} />
                    <FormQuestion id={18} isMultiple={false} hasInfo={false} />
                    <FormQuestion id={27} isMultiple={false} hasInfo={false} />
                    {renderFeces == 1 && <FormQuestion id={19} isMultiple={true} hasInfo={false} />}
                    {renderFecesSub1 == 1 && <FormQuestion id={20} isMultiple={true} hasInfo={false} />}
                    {renderFecesSub2 == 1 && <FormQuestion id={21} isMultiple={true} hasInfo={false} />}
                    {renderFecesSub3 == 1 && <FormQuestion id={22} isMultiple={true} hasInfo={false} />}
                    {renderFecesSub4 == 1 && <FormQuestion id={23} isMultiple={true} hasInfo={false} />}
                </View>}
                {renderBlock5 == 1 && <View>
                    <FormQuestion id={24} isMultiple={false} hasInfo={true} />
                    <FormQuestion id={25} isMultiple={false} hasInfo={false} />
                    <FormQuestion id={26} isMultiple={false} hasInfo={false} />
                    <FormQuestion id={28} isMultiple={false} hasInfo={true} />
                </View>}
                <View style={styles.arrows}>
                    <TouchableOpacity onPress={() => {
                        if(renderBlock2 == 1) {
                            setRenderBlock2(0)
                            setRenderBlock1(1)
                            setArrowLeftColor('rgba(0,0,0,0)')
                        }
                        if(renderBlock3 == 1) {
                            setRenderBlock3(0)
                            setRenderBlock2(1)
                        }
                        if(renderBlock4 == 1) {
                            setRenderBlock4(0)
                            setRenderBlock3(1)
                        }
                        if(renderBlock5 == 1) {
                            setRenderBlock5(0)
                            setRenderBlock4(1)
                            setArrowRightColor('green')
                        }
                        setActiveBarWidth(activeBarWidth - d_width*0.85/5)
                    }}><MaterialCommunityIcons name='arrow-left' size={30} color={arrowLeftColor} /></TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        if (renderBlock1 == 1) {
                            setRenderBlock1(0)
                            setRenderBlock2(1)
                            setArrowLeftColor('green')
                        }
                        if (renderBlock2 == 1) {
                            setRenderBlock2(0)
                            setRenderBlock3(1)
                        }
                        if (renderBlock3 == 1) {
                            setRenderBlock3(0)
                            setRenderBlock4(1)
                        }
                        if (renderBlock4 == 1) {
                            setRenderBlock4(0)
                            setRenderBlock5(1)
                            setArrowRightColor('rgba(0,0,0,0)')
                        }
                        setActiveBarWidth(activeBarWidth + d_width*0.85/5)
                    }}><MaterialCommunityIcons name='arrow-right' size={30} color={arrowRightColor} /></TouchableOpacity>
                </View>
                <View style={[styles.progressBarActive, {width: activeBarWidth}]} />
                <View style={styles.progressBarBG} />
            </View>
            {formComplete && <View style={styles.action}>
                <Text style={styles.title}>Plan de actuación</Text>
                <View style={styles.subdivider} />
                <Text style={[styles.text, {textAlign: 'center', fontSize: 14, width: '90%', alignSelf: 'center', fontFamily: 'montserrat'}]}>A continuación verás las situaciones en las que se puede encontrar el animal en función de tus respuestas, y cómo actuar sobre ellas.</Text>
                {renderRcp == 1 && <View onLayout={event => {
                    const no_pulse_layout = event.nativeEvent.layout
                    setNoPulsePosition(no_pulse_layout.y)
                    console.log(console.log('RCP Y: ', noPulsePosition))
                }}><AccordionItem title="Si no tiene pulso" animalID={1} contentID={18}/></View>}
                {renderArtificialBreathing == 1 && <View onLayout={event => {
                    const artificial_breathing_layout = event.nativeEvent.layout
                    setArtificialBreathingPosition(artificial_breathing_layout.y)
                    console.log('Artificial Breathing Y: ', artificialBreathingPosition)
                }}><AccordionItem title="Si tiene pulso pero no respira" animalID={1} contentID={22} onScrollToNoPulse={() => {
                    setRenderRcp(1)
                    moveTo(4)
                }} onScrollToChoking={() => {
                    console.log("Scroll to Choking")
                    moveTo(6)
                }} onScrollToAsphyxiation={() => {
                    moveTo(7)
                }}/></View>}
                {renderContusion == 1 && <AccordionItem title="Contusión" animalID={1} contentID={5} sub_ids={cont_sub_ids} onScrollToBrokenWing={() => {
                    moveTo(0)
                }} onScrollToBrokenLeg={() => {
                    moveTo(1)
                }} onScrollToDislocatedWing={() => {
                    moveTo(2)
                }} onScrollToDislocatedLeg={() => {
                    moveTo(3)
                }} onScrollToNoPulse={() => {
                    setRenderRcp(1)
                    moveTo(4)
                }} onScrollToArtificialBreathing={() => {
                    setRenderArtificialBreathing(1)
                    moveTo(5)
                }}/>}
                {renderDislocatedWing == 1 && <View onLayout={event => {
                    const dislocated_wing_layout = event.nativeEvent.layout
                    setdislocatedWingPosition(dislocated_wing_layout.y)
                    console.log('Dislocated Wing Y: ', dislocatedWingPosition)
                }}><AccordionItem title="Ala dislocada/luxada" animalID={1} contentID={6}/></View>}
                {renderBrokenWing == 1 && <View onLayout={event => {
                    const broken_wing_layout = event.nativeEvent.layout
                    setBrokenWingPosition(broken_wing_layout.y)
                    console.log('Broken Wing Y: ', brokenWingPosition)
                }}><AccordionItem title="Ala rota" animalID={1} contentID={7}/></View>}
                {renderDislocatedLeg == 1 && <View onLayout={event => {
                    const dislocated_leg_layout = event.nativeEvent.layout
                    setdislocatedLegPosition(dislocated_leg_layout.y)
                    console.log('Dislocated Leg Y: ', dislocatedLegPosition)
                }}><AccordionItem title="Pata dislocada/luxada" animalID={1} contentID={8}/></View>}
                {renderBrokenLeg == 1 && <View onLayout={event => {
                    const broken_leg_layout = event.nativeEvent.layout
                    setBrokenLegPosition(broken_leg_layout.y)
                    console.log('Broken Leg Y: ', brokenLegPosition)
                }}><AccordionItem title="Pata rota" animalID={1} contentID={9}/></View>}
                {renderParamixovirus == 1 && <AccordionItem title="Paramixovirus" animalID={1} contentID={10}/>}
                {renderCoccidios == 1 && <AccordionItem title="Coccidios" animalID={1} contentID={11}/>}
                {renderPox == 1 && <AccordionItem title="Viruela" animalID={1} contentID={12}/>}
                {renderTricho == 1 && <AccordionItem title="Tricomonas" animalID={1} contentID={13}/>}
                {renderHairs == 1 && <AccordionItem title="Pelos o hilos enredados en los dedos" animalID={1} contentID={14}/>}
                {renderPoisoning == 1 && <AccordionItem title="Envenenamiento" animalID={1} contentID={15} onScrollToNoPulse={() => {
                        setRenderRcp(1)
                        moveTo(4)
                    }}/>}
                {renderHeat == 1 && <AccordionItem title="Golpe de calor" animalID={1} contentID={16} onScrollToNoPulse={() => {
                        setRenderRcp(1)
                        moveTo(4)
                    }} onScrollToArtificialBreathing={() => {
                        setRenderArtificialBreathing(1)
                        moveTo(5)
                    }} />}
                {renderHypothermia == 1 && <AccordionItem title="Hipotermia" animalID={1} contentID={21} onScrollToNoPulse={() => {
                        setRenderRcp(1)
                        moveTo(4)
                    }} onScrollToArtificialBreathing={() => {
                        setRenderArtificialBreathing(1)
                        moveTo(5)}
                    }/>}
                {renderBite == 1 && <AccordionItem title="Mordedura" animalID={1} contentID={17}/>}
                {renderVomit == 1 && <AccordionItem title="Vómito/Regurgitación" animalID={1} contentID={20} />}
                {renderChoking == 1 && <View onLayout={event => {
                    const choking_layout = event.nativeEvent.layout
                    setChokingPosition(choking_layout.y)
                    console.log('Choking Y: ', chokingPosition)
                }}><AccordionItem title="Atragantamiento" animalID={1} contentID={23} onScrollToNoPulse={() => {
                        setRenderRcp(1)
                        moveTo(4)
                    }} onScrollToArtificialBreathing={() => {
                        setRenderArtificialBreathing(1)
                        moveTo(5)
                    }} /></View>}
                {renderAsphyxiation == 1 && <View onLayout={event => {
                    const asph_layout = event.nativeEvent.layout
                    setAsphyxiationPosition(asph_layout.y)
                    console.log('Asphyxiation Y: ', asphyxiationPosition)
                }}><AccordionItem title="Ahogamiento" animalID={1} contentID={24} onScrollToNoPulse={() => {
                        setRenderRcp(1)
                        moveTo(4)
                    }} /></View>}
                {renderForeignObject == 1 && <AccordionItem title="Cuerpo extraño" animalID={1} contentID={25} onScrollToChoking={() => {
                    console.log("Scroll to choking")
                    moveTo(6)
                }} />}
            </View>}
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
        justifyContent: 'center',
        alignItems: 'center',
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
        color: 'white'
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
