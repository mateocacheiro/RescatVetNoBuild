import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Pressable, Touchable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import Colors from '../constants/Colors'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { careActions } from '../store/care-slice';
import EmergencyInfo from '../assets/database/EmergencyInfo.json'
import PrimaryCareInfo from '../assets/database/PrimaryCareInfo.json'


const AccordionItem = (props) => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const currentLanguage = useSelector(state => state.language.selectedLanguage)
    const [isContentHidden, setIsContentHidden] = useState(true)
    const [iconName, setIconName] = useState('down')
    const type = props.type
    const info_id = props.id
    let title
    let description
    if (type == "emergency") {
        if (currentLanguage === 'ES') {
            title = EmergencyInfo[info_id-1]['TitleES']
            description = EmergencyInfo[info_id-1]['DescriptionES']
        } else {
            title = EmergencyInfo[info_id-1]['TitleEN']
            description = EmergencyInfo[info_id-1]['DescriptionEN']
        }
    } else if (type == "care") {
        // Get title and description from the BasicCareInfo table
        if (currentLanguage === 'ES') {
            title = PrimaryCareInfo[info_id-1]['TitleES']
            description = PrimaryCareInfo[info_id-1]['DescriptionES']
        } else {
            title = PrimaryCareInfo[info_id-1]['TitleEN']
            description = PrimaryCareInfo[info_id-1]['DescriptionEN']
        }
    }


    const renderContent = () => {

        let splitData = []

        if (description.includes("<sub>")) {
            splitData = description.split('<sub>')
            //splitData.shift()
        } else {
            splitData = splitData.concat(description)
            //console.log(splitData)
        }

        const scrollHandler = (src) => {
            console.log("Scroll to " + src)
        }

        const getStr = (splitDescription) => {
            let out_value = []
            {splitDescription.map(function(element){
                if(!element.includes("<src1>") && !element.includes("<src2") && !element.includes("<bold>")) {
                    out_value.push(<Text style={styles.text}>{element}</Text>)
                } else if (element.includes("<src1>")) {
                    const splitLink = element.split("<src1>")
                    splitLink.shift()
                    const src_link = splitLink[0]
                    const text_link = splitLink[1]
                    out_value.push(<View><TouchableOpacity onPress={() => {navigation.jumpTo(src_link)}}><Text style={[styles.hypertext, {marginHorizontal: 5}]}>{text_link}</Text></TouchableOpacity></View>)
                } else if (element.includes("<src2>")) {
                    const splitScroll = element.split("<src2>")
                    splitScroll.shift()
                    const src_scroll = splitScroll[0]
                    const text_scroll = splitScroll[1]
                    out_value.push(<View><TouchableOpacity onPress={() => {scrollHandler(src_scroll)}}><Text style={styles.hypertext}>{text_scroll}</Text></TouchableOpacity></View>)
                } else if (element.includes("<bold>")) {
                    const splitBold = element.split(/(<bold>)/)
                    splitBold.map(function(element){
                        if (element.startsWith('<s>') && element.endsWith('<s>')){
                            const bold_text = element.split('<s>')[1]
                            out_value.push(<Text style={styles.textBold}>{bold_text}</Text>)
                        } else if (element == "<bold>") {
                            return
                        } else {
                            out_value.push(<Text style={styles.text}>{element}</Text>)
                        }
                    })
                }
            })}
            return(
                <Text>
                    {out_value.map((element, idx) => {
                        return element
                    })}
                </Text>
            )
        }

        return(
            <View style={styles.content}>
                {splitData.map(function(element, idx) {
                    const e_index = splitData.indexOf(element)
                    
                    if (!element.includes('<link>') && !element.includes('<scroll>')) {
                        if (e_index % 2 != 0) {
                            return (
                                <View>
                                    <Text style={styles.title}>{element}</Text>
                                    <View style={styles.subdivider} />
                                </View>
                            )
                        } else if (e_index % 2 == 0 && !element.includes("<bold>")) {
                            return(
                                <View>
                                    <Text style={styles.text}>{element}</Text>
                                </View>
                            )
                        } else if (e_index % 2 == 0 && element.includes("<bold>")) {
                            const element_a = [element]
                            return(
                                getStr(element_a)
                            )
                        }

                    } else if (element.includes('<link>') && !element.includes('<scroll>')) {
                        const splitDescription = element.split('<link>')
                        return(
                            getStr(splitDescription)
                        )
                    } else if (element.includes('<scroll>') && !element.includes('<link>')) {
                        const splitDescription = element.split('<scroll>')
                        return(
                            getStr(splitDescription)
                        )
                    } else if (element.includes('<link>') && element.includes('<scroll>')) {
                        const splitDescription = element.split('<link>').join(',').split('<scroll>').join(',').split(',')
                        return(
                            getStr(splitDescription)
                        )
                    }
                })}
            </View>
        )
    }

    const toggleContent = () => {
        setIsContentHidden(!isContentHidden)
        if(isContentHidden) {
            setIconName('up')
        } else {
            setIconName('down')
        }
    }

  return (
    <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.8} style={styles.accordionHeader} onPress={toggleContent}>
            <Text style={styles.title}>{title}</Text>
            <AntDesign name={iconName} size={20} color={Colors.primary} />
        </TouchableOpacity>
        {!isContentHidden && renderContent()}
    </View>
  )
}

export default AccordionItem

const styles = StyleSheet.create({
    accordionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 50,
        alignItems: 'center',
        width: '90%',
        marginVertical: 5
    },
    container: {
        width: Dimensions.get('screen').width*0.95
    },
    title: {
        fontFamily: 'montserrat-bold',
        fontSize: 16,
        color: Colors.primary,
        maxWidth: '85%'
    },
    content: {
        justifyContent: 'flex-start',
        width: '95%'
    },
    text: {
        fontFamily: 'montserrat',
        color: 'white',
        fontSize: 14,
        maxWidth: '95%'
    },
    title2: {
        fontFamily: 'montserrat-bold',
        fontSize: 16,
        color: Colors.primary
    },
    subdivider: {
        height: 2,
        width: Dimensions.get('window').width*0.87,
        backgroundColor: "#aaa",
        marginBottom: 5
    },
    hypertext: {
        fontFamily: 'montserrat-bold',
        fontSize: 14,
        color: '#bfffc1',
        textDecorationLine: 'underline',
    },
    textBold: {
        fontFamily: 'montserrat-bold', 
        color: '#bfffc1'
    }
})