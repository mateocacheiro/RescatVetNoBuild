import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import Colors from '../constants/Colors'
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { careActions } from '../store/care-slice';
import EmergencyInfo from '../assets/database/EmergencyInfo.json'


const AccordionItem = (props) => {
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const [isContentHidden, setIsContentHidden] = useState(true)
    const [iconName, setIconName] = useState('down')

    const info_id = props.id
    
    const title = EmergencyInfo[info_id-1]['TitleES']
    const description = EmergencyInfo[info_id-1]['DescriptionES']

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

        /*

        Splitting data

        Haz click <link><src>BasicCare<src>aquí<link> para ir a cuidados básicos

        if splitData[e_index].includes('<link>') =>
            splitDescription = ['Haz click','<src>BasicCare<src>aquí', 'para ir a cuidados básicos']
            if splitDescription[0] == "" =>
                splitDescription.shift()
            splitDescription.map(function(element){
                const d_index = splitDescription.indexOf(element)
                if (d_index%2 != 0) {
                    splitLink = ['BasicCare', 'aquí']
                    evalString = '<TouchableOpacity activeOpacity={0.8} onPress={navigation.navigate(splitLink[0])}><Text style={[styles.bold, {textDecoration: 'underline'}]}>{splitLink[1]}</Text></TouchableOpacity>
                }
            })
        if splitDescription%2 != 0 =>
            splitLink = ['BasicCare', 'aquí']        
        */

        const getEval = (splitDescription) => {
            //console.log(splitDescription)
            let evalString = '<Text>'
            splitDescription.map(function(element){
                //console.log(element)
                if (!element.includes('<src>')){
                    evalString += element
                } else {
                    const splitLink = element.split('<src>')
                    splitLink.shift()
                    const linkStr = "<TouchableOpacity activeOpacity={0.8} onPress={navigation.navigate('"+splitLink[0].toString()+"')}><Text style={[styles.bold, {textDecoration: 'underline'}]}>"+splitLink[1]+"</Text></TouchableOpacity> "
                    evalString += linkStr
                    //console.log(linkStr)
                }
            })
            evalString += '</Text>'
            return(evalString)
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
                        const formattedStr = getEval(splitDescription)
                        return(
                            <Text>{formattedStr}</Text>
                        )
                        console.log(formattedStr)
                    }
                })}
            </View>
        )
    }

    // <TouchableOpacity onPress={() => {props.onScrollToNoPulse}}>Section name<Text style={{}}></Text></TouchableOpacity></Text>

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