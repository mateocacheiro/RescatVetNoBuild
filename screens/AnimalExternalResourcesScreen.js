import React from 'react'
import { StyleSheet, Text, View, ImageBackground, ScrollView, Dimensions, TouchableWithoutFeedback, Linking } from 'react-native'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import Colors from '../constants/Colors'

const AnimalExternalResourcesScreen = () => {
    return (
        <View style={styles.container}>
            <ScrollView>
                <ImageBackground source={require('../assets/img/pigeon_screen.jpg')} resizeMode="cover" style={styles.headerBlock}>
                    <View style={styles.breadCrumbs}>
                        <TouchableWithoutFeedback>
                            <Text style={styles.text}>Inicio</Text>
                        </TouchableWithoutFeedback>
                        <Text style={styles.text}>&gt;</Text>
                        <Text style={styles.text}>Paloma</Text>
                        <Text style={styles.text}>&gt;</Text>
                        <Text style={styles.text}>Recursos externos</Text>
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
                        <MaterialCommunityIcons name='launch' size={70} color={Colors.primary} />
                    </View>
                    <Text style={styles.title}> Recursos externos</Text>
                    <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 10}}><View style={styles.divider}/></View>
                    <View style={styles.descriptionBlock}>
                        <Text style={[styles.text, {textAlign: 'center'}]}>En esta página tendrás acceso a enlaces de páginas y grupos de redes sociales y otras webs, relacionadas con las palomas.</Text>
                    </View> 
                </ImageBackground>
                <View style={styles.contentBlock}>
                    <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginBottom: 10}}>
                        <MaterialCommunityIcons name="facebook" size={40} color={Colors.primary} />
                        <Text style={styles.mediaTitle}>Facebook</Text>
                    </View>
                    <View style={styles.divider2} />
                    <View style={{flexDirection: 'row', marginBottom: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <MaterialCommunityIcons name="flag" size={30} color='white' />
                        <TouchableWithoutFeedback onPress={() => {
                            Linking.openURL('https://www.facebook.com/PalomasEnMiCorazon')
                        }}>
                            <Text style={[styles.text, {textDecorationLine: 'underline', marginLeft: 10}]}>Corazón de paloma</Text>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{flexDirection: 'row', marginBottom: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <MaterialCommunityIcons name="flag" size={30} color='white' />
                        <Text style={[styles.text, {textDecorationLine: 'underline', marginLeft: 10}]}>Arrullo de paloma</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginBottom: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <MaterialCommunityIcons name="flag" size={30} color='white' />
                        <Text style={[styles.text, {textDecorationLine: 'underline', marginLeft: 10}]}>Santuario La paloma triste</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginBottom: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <MaterialCommunityIcons name="flag" size={30} color='white' />
                        <Text style={[styles.text, {textDecorationLine: 'underline', marginLeft: 10}]}>Asociación Birds Friends</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginBottom: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <MaterialCommunityIcons name="flag" size={30} color='white' />
                        <Text style={[styles.text, {textDecorationLine: 'underline', marginLeft: 10}]}>Mis amigas las palomas</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginBottom: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <MaterialCommunityIcons name="flag" size={30} color='white' />
                        <Text style={[styles.text, {textDecorationLine: 'underline', marginLeft: 10}]}>Palomas y compañía</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginBottom: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <MaterialCommunityIcons name="account-group" size={30} color='white' />
                        <Text style={[styles.text, {textDecorationLine: 'underline', marginLeft: 10}]}>Mis amigas emplumadas</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginBottom: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <MaterialCommunityIcons name="account-group" size={30} color='white' />
                        <Text style={[styles.text, {textDecorationLine: 'underline', marginLeft: 10}]}>Palomas y compañía (grupo de defensa y protección)</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginBottom: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <MaterialCommunityIcons name="account-group" size={30} color='white' />
                        <Text style={[styles.text, {textDecorationLine: 'underline', marginLeft: 10}]}>Palomas y compañía (grupo público)</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginBottom: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <MaterialCommunityIcons name="account-group" size={30} color='white' />
                        <Text style={[styles.text, {textDecorationLine: 'underline', marginLeft: 10}]}>Ayudando a volar</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginBottom: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <MaterialCommunityIcons name="account-group" size={30} color='white' />
                        <Text style={[styles.text, {textDecorationLine: 'underline', marginLeft: 10}]}>Aves perdidas, encontradas y rescatadas</Text>
                    </View>


                    <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginBottom: 10}}>
                        <MaterialCommunityIcons name="instagram" size={40} color={Colors.primary} />
                        <Text style={styles.mediaTitle}>Instagram</Text>
                    </View>
                    <View style={styles.divider2} />
                    <View style={{flexDirection: 'row', marginBottom: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <MaterialCommunityIcons name="account" size={30} color='white' />
                        <TouchableWithoutFeedback onPress={() => {
                            Linking.openURL('https://www.instagram.com/al_rescate_deaves/')
                        }}>
                            <Text style={[styles.text, {textDecorationLine: 'underline', marginLeft: 10}]}>Al rescate de aves</Text>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{flexDirection: 'row', marginBottom: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <MaterialCommunityIcons name="account" size={30} color='white' />
                        <Text style={[styles.text, {textDecorationLine: 'underline', marginLeft: 10}]}>Rescate de aves</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginBottom: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <MaterialCommunityIcons name="account" size={30} color='white' />
                        <Text style={[styles.text, {textDecorationLine: 'underline', marginLeft: 10}]}>Mis amigas las palomas</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginBottom: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <MaterialCommunityIcons name="account" size={30} color='white' />
                        <Text style={[styles.text, {textDecorationLine: 'underline', marginLeft: 10}]}>Corazón de paloma</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginBottom: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <MaterialCommunityIcons name="account" size={30} color='white' />
                        <Text style={[styles.text, {textDecorationLine: 'underline', marginLeft: 10}]}>Necesitan volar</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginBottom: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <MaterialCommunityIcons name="account" size={30} color='white' />
                        <Text style={[styles.text, {textDecorationLine: 'underline', marginLeft: 10}]}>Palomas de Madrid (también para información)</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginBottom: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <MaterialCommunityIcons name="account" size={30} color='white' />
                        <Text style={[styles.text, {textDecorationLine: 'underline', marginLeft: 10}]}>La paloma triste</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginBottom: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <MaterialCommunityIcons name="account" size={30} color='white' />
                        <Text style={[styles.text, {textDecorationLine: 'underline', marginLeft: 10}]}>Asociación Birds friends</Text>
                    </View>

                    
                    <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginBottom: 10}}>
                        <MaterialCommunityIcons name="twitter" size={40} color={Colors.primary} />
                        <Text style={styles.mediaTitle}>Twitter</Text>
                    </View>
                    <View style={styles.divider2} />
                    <View style={{flexDirection: 'row', marginBottom: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <MaterialCommunityIcons name="at" size={30} color='white' />
                        <TouchableWithoutFeedback onPress={() => {
                            Linking.openURL('https://twitter.com/Birds_Friends_')
                        }}>
                            <Text style={[styles.text, {textDecorationLine: 'underline', marginLeft: 10}]}>Asociación Birds friends</Text>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{flexDirection: 'row', marginBottom: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <MaterialCommunityIcons name="at" size={30} color='white' />
                        <Text style={[styles.text, {textDecorationLine: 'underline', marginLeft: 10}]}>Mis amigas las palomas</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginBottom: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <MaterialCommunityIcons name="at" size={30} color='white' />
                        <Text style={[styles.text, {textDecorationLine: 'underline', marginLeft: 10}]}>Corazón de paloma</Text>
                    </View>


                    <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginBottom: 10}}>
                        <MaterialCommunityIcons name="youtube" size={40} color={Colors.primary} />
                        <Text style={styles.mediaTitle}>Youtube</Text>
                    </View>
                    <View style={styles.divider2} />
                    <View style={{flexDirection: 'row', marginBottom: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <MaterialCommunityIcons name="video-account" size={30} color='white' />
                        <TouchableWithoutFeedback onPress={() => {
                            Linking.openURL('https://www.youtube.com/c/MisAmigasLasPalomasMALP')
                        }}>
                            <Text style={[styles.text, {textDecorationLine: 'underline', marginLeft: 10}]}>Mis amigas las palomas</Text>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{flexDirection: 'row', marginBottom: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <MaterialCommunityIcons name="video-account" size={30} color='white' />
                        <Text style={[styles.text, {textDecorationLine: 'underline', marginLeft: 10}]}>Refugio La paloma</Text>
                    </View>


                    <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginBottom: 10}}>
                        <MaterialCommunityIcons name="web" size={40} color={Colors.primary} />
                        <Text style={styles.mediaTitle}>Webs y blogs</Text>
                    </View>
                    <View style={styles.divider2} />
                    <View style={{flexDirection: 'row', marginBottom: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <MaterialIcons name="web" size={30} color='white' />
                        <TouchableWithoutFeedback onPress={() => {
                            Linking.openURL('https://birdsfriends.wixsite.com/asociacion?fbclid=IwAR0aVHJvZ4BKlDRHu2dw6PyEq5PpZAWn8VfUwnK9EHe6GHncXublH6m-32E')
                        }}>
                            <Text style={[styles.text, {textDecorationLine: 'underline', marginLeft: 10}]}>Asociación Birds friends</Text>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{flexDirection: 'row', paddingLeft: 11, marginBottom: 10, justifyContent: 'center', alignItems: 'flex-start'}}>
                        <MaterialIcons name="web" size={30} color='white' />
                        <Text style={[styles.text, {textDecorationLine: 'underline', marginLeft: 10}]}>Mis amigas las palomas (no recomendamos seguir pautas de medicación)</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginBottom: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <MaterialIcons name="web" size={30} color='white' />
                        <Text style={[styles.text, {textDecorationLine: 'underline', marginLeft: 10}]}>Santuario La paloma triste</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginBottom: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <MaterialIcons name="web" size={30} color='white' />
                        <Text style={[styles.text, {textDecorationLine: 'underline', marginLeft: 10}]}>Corazón de paloma</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginBottom: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <MaterialIcons name="web" size={30} color='white' />
                        <Text style={[styles.text, {textDecorationLine: 'underline', marginLeft: 10}]}>Henfluencers</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default AnimalExternalResourcesScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#333',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center'
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
        overflow: 'hidden'
    },
    breadCrumbs: {
        flexDirection: 'row',
        marginLeft: 20,
        marginBottom: 30
    },
    text: {
        fontFamily: 'montserrat',
        fontSize: 14,
        marginRight: 5,
        color: 'white'
    },
    image: {
        width: Dimensions.get('window').width,
        top: 0
    },
    title: {
        fontFamily: 'montserrat-bold',
        color: Colors.primary,
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10
    },
    divider: {
        height: 3,
        width: Dimensions.get('window').width*0.9,
        backgroundColor: Colors.primary,
    },
    divider2: {
        height: 2,
        width: Dimensions.get('window').width*0.9,
        backgroundColor: "#aaa",
        marginBottom: 15
    },
    descriptionBlock: {
        width: Dimensions.get('window').width*0.97,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5
    },
    contentBlock: {
        width: Dimensions.get('window').width * 0.97,
        backgroundColor: Colors.darkBG,
        borderRadius: 7.5,
        zIndex: 3,
        marginTop: -20,
        paddingVertical: 30,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 15
    },
    mediaTitle: {
        fontFamily: 'montserrat-bold',
        color: Colors.primary,
        fontSize: 18,
        marginLeft: 10
    }
})
