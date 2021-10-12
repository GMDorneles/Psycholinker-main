import React, { Component, useState, setState, useEffect } from 'react'
import { useCallback } from 'react';
import config from '../../config/config.json';
import { AsyncStorage, FlatList, Pressable } from 'react-native';
import { css } from '../../assets/CSS/css.js';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    View,
    Text,
    Button,
    Modal,
    TextInput,
    Platform,
    RefreshControl,
    Image
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';

HumorTerapeuta = (idPaciente) => {
    const [refresh, setRefresh] = useState(false);
    const [modalVisible, setModalVisible] = useState('')
    const [execucao, setExecucao] = useState(1);

    const [humorimagem, setHumorImagem] = useState(null)
    const [humor, setHumor] = useState(null)
    const [texto, setTexto] = useState('')
    const [relatorios, setRelatorios] = useState([
        {
            humor: null, id: '1', texto:null
        }
    ])

    useEffect(() => {
        gerenciaRelatorios();
    }, [execucao]);
    
    
    async function gerenciaRelatorios() {
        let response = await fetch(`${config.urlRoot}listaRelatorios`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pacienteId: idPaciente.data,
                texto: texto,
                humor: humor
            })

        });
        //obtem resposta do controller
        let json = await response.json();
        if (json === 'error') {
            console.log('error');
        } else {
            // //persistencia dos dados para utilizar na aplicação
            await AsyncStorage.setItem('RelatoriosData', JSON.stringify(json));//json é  a resposta

            let response = await AsyncStorage.getItem('RelatoriosData');
            const jsonNovo = JSON.parse(response);
            setRelatorios(jsonNovo);
            if (execucao < 2) {
                setExecucao(2);
            }
        }
    }


    function ListaRelatorios({ humor, id, texto }) {

        

        if (texto != null) {
            if (humor == 1){         
                humor = <View style ={estilo.imagemrmkcontainer}>
                        <Image style={estilo.imagemrmk}
                                source={require('../../assets/felizao.png')} />
                        </View>  
            }else if(humor == 2){
                humor = <View style ={estilo.imagemrmkcontainer}>
                <Image style={estilo.imagemrmk}
                        source={require('../../assets/felizinho.png')} />
                </View> 
            }else if(humor == 3){
                humor = <View style ={estilo.imagemrmkcontainer}>
                        <Image style={estilo.imagemrmk}
                                source={require('../../assets/normalzinho.png')} />
                        </View> 
            }else if(humor == 4){
                humor = <View style ={estilo.imagemrmkcontainer}>
                <Image style={estilo.imagemrmk}
                        source={require('../../assets/tristinho.png')} />
                </View> 
            }else if(humor == 5){
                humor = <View style ={estilo.imagemrmkcontainer}>
                        <Image style={estilo.imagemrmk}
                                source={require('../../assets/tristao.png')} />
                        </View> 
            }else if(humor == 6){
                humor = <View style ={estilo.imagemrmkcontainer}>
                        <Image style={estilo.imagemrmk}
                                source={require('../../assets/raiva.png')} />
                        </View> 
            }
            return (
                <View>
                    <View
                        style={estilo.observacoescontainer}>
                        <Text
                            style={estilo.observacoeslista}>{id}{humor}{texto}</Text>
                    </View>
                </View >
            )
        } else {
            return (null);
        }
    }

    return(
        <View>
            <Text> Olaaaaaaaa</Text>
            <FlatList style={estilo.lista2}
                        data={relatorios}
                        renderItem={({ item }) => <ListaRelatorios texto={item.texto} id={item.id} humor={item.humor} />}
                        keyExtractor={item => item.id.toString()}
                        extraData={refresh}
                    />
            </View>
    )
}

const estilo = StyleSheet.create({
    imagem: {
        width: 60,
        height: 60
    },
    imagemrmk: {
        width: 40,
        height: 40,
        alignItems:'center'
    },
    imagemrmkcontainer: {
        width: 40,
        height: 40
    },
    imagemContainer: {
        flexDirection: 'row'
    },
    containerquit:{
        flexDirection:'row',
        width:200,
        justifyContent:'space-around'
    }

})
export default HumorTerapeuta