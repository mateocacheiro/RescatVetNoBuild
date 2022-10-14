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
    }


    const renderContent = () => {

        /*
        If there are no <sub>, render the entire content
        If there are <sub> tags, slice the data buy the tags
        */

        let splitData = []
        let dataObj = []

        if (description.includes("<sub>")) {
            splitData = description.split('<sub>')
            splitData.shift()
        }

        const getStr = (splitDescription) => {
            console.log(splitDescription)
            let link_value = []
            {splitDescription.map(function(element){
                if(!element.includes("<src>")) {
                    link_value.push(<Text style={styles.text}>{element}</Text>)
                    console.log("Link value not containing src: ", link_value)
                } else if (element.includes("<src>")) {
                    const splitLink = element.split("<src>")
                    splitLink.shift()
                    const src_link = splitLink[0]
                    link_value.push(<View><TouchableOpacity onPress={() => {navigation.jumpTo(src_link)}}><Text style={[styles.textBold, {marginHorizontal: 5}]}>{splitLink[1]}</Text></TouchableOpacity></View>)
                }
            })}
            return(
                <Text>
                    {link_value.map(function(element){
                        return element
                    })}
                </Text>
            )
        }

        return(
            <View style={styles.content}>
                {splitData.map(function(element, idx) {
                    const e_index = splitData.indexOf(element)
                    if (!element.includes('<link>')) {
                        return(
                            <View key={idx}>
                                <Text style={e_index%2 == 0 ? styles.title2 : styles.text}>{element}</Text>
                                {e_index%2 == 0 && <View style={styles.subdivider} />}
                            </View>
                        )
                    } else if (element.includes('<link>')) {
                        const splitDescription = element.split('<link>')
                        const jsx_return = getStr(splitDescription)
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