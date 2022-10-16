import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Pressable, Touchable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import Colors from '../constants/Colors'
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { careActions } from '../store/care-slice';
import EmergencyInfo from '../assets/database/EmergencyInfo.json'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


const AccordionItem = (props) => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [isContentHidden, setIsContentHidden] = useState(true)
    const [iconName, setIconName] = useState('down')
    const type = props.type
    const info_id = props.id
    let title
    let description
    if (type == "emergency") {
        title = EmergencyInfo[info_id-1]['TitleES']
        description = EmergencyInfo[info_id-1]['DescriptionES']
    } else if (type == "care") {
        // Get title and description from the BasicCareInfo table
        console.log("Bruh")
    }


    const renderContent = () => {

        let splitData = []
        let dataObj = []

        if (description.includes("<sub>")) {
            splitData = description.split('<sub>')
            splitData.shift()
        } else {
            splitData = splitData.concat(description)
        }

        const getStr = (splitDescription, type) => {
            let out_value = []
            {splitDescription.map(function(element){
                if(!element.includes("<src>")) {
                    out_value.push(<Text style={styles.text}>{element}</Text>)
                } else if (element.includes("<src>") && type == "link") {
                    const splitLink = element.split("<src>")
                    splitLink.shift()
                    const src_link = splitLink[0]
                    const text_link = splitLink[1]
                    out_value.push(<View><TouchableOpacity onPress={() => {navigation.jumpTo(src_link)}}><Text style={[styles.textBold, {marginHorizontal: 5}]}>{text_link}</Text></TouchableOpacity></View>)
                } else if (element.includes("<src>") && type == "scroll") {
                    const splitScroll = element.split("<src>")
                    splitScroll.shift()
                    const src_scroll = splitScroll[0]
                    const text_scroll = splitScroll[1]
                    out_value.push(<View><TouchableOpacity onPress={() => {console.log("Scroll to"+src_scroll)}}><Text style={styles.textBold}>{text_scroll}</Text></TouchableOpacity></View>)
                }
            })}
            return(
                <Text>
                    {out_value.map(function(element){
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
                        return(
                            <View key={idx}>
                                <Text style={e_index%2 == 0 ? styles.title2 : styles.text}>{element}</Text>
                                {e_index%2 == 0 && <View style={styles.subdivider} />}
                            </View>
                        )
                    } else if (element.includes('<link>') && !element.includes('<scroll>')) {
                        const splitDescription = element.split('<link>')
                        return(
                            getStr(splitDescription, type="link")
                        )
                    } else if (element.includes('<scroll>') && !element.includes('<link>')) {
                        const splitDescription = element.split('<scroll')
                        return(
                            getStr(splitDescription, type="scroll")
                        )
                    } else if (element.includes('<link>') && element.includes('<scroll>')) {
                        // Brainfuck level 1000
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
        marginVertical: 10,
        width: '100%'
    },
    title: {
        fontFamily: 'montserrat-bold',
        fontSize: 18,
        color: Colors.primary,
        maxWidth: '85%'
    },
    content: {
        justifyContent: 'flex-start',
        width: '100%'
    },
    text: {
        fontFamily: 'montserrat',
        color: 'white',
        fontSize: 14,
        marginBottom: 10
    },
    title2: {
        fontFamily: 'montserrat-bold',
        fontSize: 16,
        color: Colors.primary,
        marginBottom: 5
    },
    subdivider: {
        height: 2,
        width: Dimensions.get('window').width*0.87,
        backgroundColor: "#aaa",
        marginBottom: 10
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