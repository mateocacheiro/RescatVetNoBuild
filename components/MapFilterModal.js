import { StyleSheet, Text, View, Dimensions, Modal, Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { mapActions } from '../store/map-slice'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Colors from '../constants/Colors'
import { useSelector, useDispatch } from 'react-redux'
import Slider from '@react-native-community/slider'


// Filter Options

/*

1 - Animales aceptados
2 - Radio km
3 - Máximo número de resultados
4 - Abierto ahora

*/

const MapFilterModal = () => {

    const modalVisible = useSelector(state => state.map.modals.filter_modal_visible)
    const currentRadius = useSelector(state => state.map.filter.radius)
    const currentOpen = useSelector(state => state.map.filter.open_now)

    const [radiusRange, setRadiusRange] = useState(currentRadius)
    const [openFilter, setOpenFilter] = useState(currentOpen)

    const dispatch = useDispatch()
  return (
    <Modal animationType='fade' animationInTiming={0.5} animationOutTiming={0.5} transparent={true} visible={modalVisible}>
        <Pressable style={styles.modal}>
            <View style={styles.inner}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.title}>Animales aceptados</Text>
                    <View style={styles.divider} />
                    <TouchableOpacity activeOpacity={0.8} style={styles.option} onPress={() => {}}>
                        <Text style={styles.text}>Todos</Text>
                        <MaterialCommunityIcons name="circle-slice-8" size={20} color={Colors.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} style={styles.option} onPress={() => {}}>
                        <Text style={styles.text}>Animales Domésticos</Text>
                        <MaterialCommunityIcons name="circle-outline" size={20} color={Colors.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} style={[styles.option, {marginBottom: 20}]} onPress={() => {}}>
                        <Text style={styles.text}>Animales Exóticos</Text>
                        <MaterialCommunityIcons name="circle-outline" size={20} color={Colors.primary} />
                    </TouchableOpacity>
                    <Text style={[styles.title, {marginTop: 15}]}>Filtrar por distancia</Text>
                    <View style={styles.divider} />
                    <View style={styles.sliderBlock}>
                        <TouchableOpacity onPress={() => {setRadiusRange(radiusRange-0.5)}} style={{width: 40, height: 40, backgroundColor: Colors.lightBG, borderRadius: 4, justifyContent: 'center', alignItems: 'center'}}>
                            <MaterialCommunityIcons name="chevron-down" size={35} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.radiusText}>{radiusRange} Km</Text>
                        <TouchableOpacity onPress={() => {setRadiusRange(radiusRange+0.5)}} style={{width: 40, height: 40, backgroundColor: Colors.lightBG, borderRadius: 4, justifyContent: 'center', alignItems: 'center'}}>
                            <MaterialCommunityIcons name="chevron-up" size={35} color="white" />
                        </TouchableOpacity>
                    </View>
                    <Text style={[styles.title, {marginTop: 15}]}>Apertura</Text>
                    <View style={styles.divider} />
                    <TouchableOpacity activeOpacity={0.8} style={styles.option} onPress={() => setOpenFilter('all')}>
                        <Text style={styles.text}>Todos los horarios</Text>
                        <MaterialCommunityIcons name={openFilter === 'all' ? "circle-slice-8" : "circle-outline"} size={20} color={Colors.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} style={styles.option} onPress={() => setOpenFilter('open')}>
                        <Text style={styles.text}>Abierto ahora</Text>
                        <MaterialCommunityIcons name={openFilter === 'open' ? "circle-slice-8" : "circle-outline"} size={20} color={Colors.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => {
                        dispatch(mapActions.updateFilter({radius: radiusRange, open_now: openFilter}))
                        dispatch(mapActions.toggleModal(1))
                    }}>
                        <Text style={styles.btnText}>Filtrar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cancel} activeOpacity={0.8} onPress={() => dispatch(mapActions.toggleModal(1))}>
                        <Text style={styles.text}>Cancelar</Text>
                    </TouchableOpacity>
                </View>  
            </View>
        </Pressable>
    </Modal>
  )
}

export default MapFilterModal

const d_width = Dimensions.get('window').width

const d_height = Dimensions.get('window').height

const styles = StyleSheet.create({
    text: {
        fontFamily: 'montserrat',
        fontSize: 14,
        color: 'white'
    },
    title: {
        fontFamily: 'montserrat-bold',
        fontSize: 18,
        color: Colors.primary,
        textAlign: 'center',
        marginBottom: 10
    },
    modal: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inner: {
        backgroundColor: '#222',
        width: d_width*0.7,
        paddingVertical: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 200,
        marginVertical: 10
    },
    divider: {
        height: 1,
        backgroundColor: '#aaa',
        width: Dimensions.get('window').width * 0.5,
        marginBottom: 15,
        zIndex: 5
    },
    radiusText: {
        fontFamily: 'montserrat',
        fontSize: 14,
        color: 'white',
        textAlign: 'center',
    },
    slider: {
        width: '100%',
        height: Dimensions.get('window').height * 0.05
    },
    sliderBlock: {
        width: Dimensions.get('window').width * 0.6,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row'
    },
    button: {
        backgroundColor: Colors.primary,
        width: d_width * 0.6,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
        borderRadius: 7.5
    },
    btnText: {
        fontFamily: 'montserrat-bold',
        fontSize: 14,
        color: 'white'
    }
})