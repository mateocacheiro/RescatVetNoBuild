import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Modal, Pressable } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { searchActions } from '../store/search-slice'

const ClassModal = () => {

    const dispatch = useDispatch()

    const classSelected = useSelector(state=> state.search.classSelected)

    const modalVisible = useSelector(state => state.search.modalVisible)

    return (
            <Modal animationType='fade' transparent={true} visible={modalVisible}>
                <Pressable style={styles.modal} onPress={() => {dispatch(searchActions.toggleModal(1))}}>
                    <View style={styles.inner}>
                        <View>
                            <TouchableOpacity style={styles.option} onPress={() => {
                                dispatch(searchActions.updateClassSelection('all'))
                                dispatch(searchActions.toggleModal(1))
                            }}>
                                <Text style={styles.text}>Mostrar Todos</Text>
                                {classSelected !== 'all' && <View style={styles.checkCircle}></View>}
                                {classSelected === 'all' && <View style={styles.checkCircleActive}></View>}
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity style={styles.option} onPress={() => {
                                dispatch(searchActions.updateClassSelection('mamifero'))
                                dispatch(searchActions.toggleModal(1))
                            }}>
                                <Text style={styles.text}>Mamífero</Text>
                                {classSelected !== 'mamifero' && <View style={styles.checkCircle}></View>}
                                {classSelected === 'mamifero' && <View style={styles.checkCircleActive}></View>}
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity style={styles.option} onPress={() => {
                                dispatch(searchActions.updateClassSelection('ave'))
                                dispatch(searchActions.toggleModal(1))
                            }}>
                                <Text style={styles.text}>Ave</Text>
                                {classSelected !== 'ave' && <View style={styles.checkCircle}></View>}
                                {classSelected === 'ave' && <View style={styles.checkCircleActive}></View>}
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity style={styles.option} onPress={() => {
                                dispatch(searchActions.updateClassSelection('anfibio'))
                                dispatch(searchActions.toggleModal(1))
                            }}>
                                <Text style={styles.text}>Anfibio</Text>
                                {classSelected !== 'anfibio' && <View style={styles.checkCircle}></View>}
                                {classSelected === 'anfibio' && <View style={styles.checkCircleActive}></View>}
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity style={styles.option} onPress={() => {
                                dispatch(searchActions.updateClassSelection('reptil'))
                                dispatch(searchActions.toggleModal(1))
                            }}>
                                <Text style={styles.text}>Reptil</Text>
                                {classSelected !== 'reptil' && <View style={styles.checkCircle}></View>}
                                {classSelected === 'reptil' && <View style={styles.checkCircleActive}></View>}
                            </TouchableOpacity>
                        </View>
                    </View>
                </Pressable>
            </Modal>
    )
}

export default ClassModal

const d_width = Dimensions.get('window').width

const d_height = Dimensions.get('window').height

const styles = StyleSheet.create({
    text: {
        fontFamily: 'montserrat',
        fontSize: 20,
        color: 'white'
    },
    checkCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderColor: 'green',
        borderWidth: 2
    },
    checkCircleActive: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderColor: 'green',
        backgroundColor: '#17BB48',
        borderWidth: 2,
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
        height: d_height*0.35,
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
    
})