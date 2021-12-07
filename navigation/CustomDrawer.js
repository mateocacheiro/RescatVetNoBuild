import React, {useEffect, useState} from 'react'
import { View, Text } from 'react-native'
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import Colors from '../constants/Colors'
import {MaterialIcons} from '@expo/vector-icons'
import { useSelector, useDispatch } from 'react-redux'
import { languageActions } from '../store/language-slice'

const CustomDrawer = ({...props}) => {
    
    const dispatch = useDispatch()
    
    const currentLanguage = useSelector(state => state.language.selectedLenguage)
    
    const showLanguages = useSelector(state => state.language.showLanguages)

    const drawerLabel = 'Language          ' + currentLanguage

    return (
        <DrawerContentScrollView {...props} style={{backgroundColor: '#222'}}>
            <DrawerItemList {...props}/>
            <DrawerItem 
                label={drawerLabel} 
                labelStyle={{color: 'white', fontFamily: 'montserrat'}} 
                icon={() => <MaterialIcons name="translate" color="white" size={30}/>} 
                onPress={() => {
                    dispatch(languageActions.showLanguages())
                }}
            />
            {showLanguages && 
                <DrawerItem 
                    label='[ES] Español' 
                    labelStyle={{color: currentLanguage === 'ES' ? Colors.primary : 'white', fontFamily: 'montserrat', marginLeft: '29%'}}
                    onPress={() => {
                        dispatch(languageActions.changeLanguage('ES'))
                        dispatch(languageActions.showLanguages())
                    }}
                />
            }
            {showLanguages && 
                <DrawerItem 
                    label='[EN] English' 
                    labelStyle={{color: currentLanguage === 'EN' ? Colors.primary : 'white', fontFamily: 'montserrat', marginLeft: '29%'}}
                    onPress={() => {
                        dispatch(languageActions.changeLanguage('EN'))
                        dispatch(languageActions.showLanguages())
                    }}
                />
            }
        </DrawerContentScrollView>
    )
}

export default CustomDrawer