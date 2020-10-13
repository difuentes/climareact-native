import React,{useState} from 'react';
import {View,Text,StyleSheet,TextInput,TouchableWithoutFeedback,Animated,Alert} from 'react-native';
import {Picker} from '@react-native-community/picker';

const Formulario = ({busqueda,guardarBusqueda,guardarConsultaApi}) => {

    //destructuring a busqueda
    const {pais,ciudad} = busqueda;


    //state de animacion
    const[animacionBoton] = useState(new Animated.Value(1));

    //animacion entrada
    const animacionEntrada =()=>{
      
       Animated.spring (animacionBoton , {
           toValue : .75,
           useNativeDriver: true
       }).start();
    }
    //animacion salida
    const animacionSalida =()=>{
       
        Animated.spring (animacionBoton , {
            toValue : 1,
            useNativeDriver: true,
            friction:1,
            tension:30
        }).start();
    }

    const consultarClima=()=>{
        //validar
        if(pais.trim()==='' ||ciudad.trim()==='' ){
            mostrarAlerta();
            return;
        }
        //
       
        guardarConsultaApi(true);
    }

    const mostrarAlerta=()=>{
        Alert.alert(
            'Error',
            'Seleciona una ciudad y un pais',
            [{text:'Entendido'}]
            
        )
    }


    //Estilo animacion
    const estiloAnimacion = {
        transform: [{scale: animacionBoton}]
    }

    return ( 
        <>
            <View style={styles.formulario}>
                <View>
                    <TextInput
                        value={ciudad}
                        placeholder="Ciudad"
                        placeholderTextColor="black"
                        style={styles.input}
                        onChangeText={ciudad => guardarBusqueda({...busqueda,ciudad})}
                    />
                </View>

                <View style={styles.PickerPais}>
                        <Picker 
                            itemStyle={{backgroundColor:'#FFF'}}
                            selectedValue={pais}
                            onValueChange={pais => guardarBusqueda({...busqueda,pais})}
                        >
                            <Picker.Item label="Seleccione un pais" value=""/>
                            <Picker.Item label="Chile" value="CL"/>
                            <Picker.Item label="Argentina" value="AR"/>
                            <Picker.Item label="España" value="ES"/>
                            <Picker.Item label="Costa Rica" value="CR"/>
                            <Picker.Item label="Colombia" value="CO"/>
                            <Picker.Item label="Mexico" value="MX"/>
                            <Picker.Item label="Estados Unidos " value="EU"/>
                        </Picker>
                </View>

                <TouchableWithoutFeedback
                    onPressIn={()=>animacionEntrada() }
                    onPressOut={()=>animacionSalida()}
                    onPress={ () =>consultarClima()}
                >
                        <Animated.View style={[styles.btnConsultar, estiloAnimacion]}>
                            <Text style={styles.labelbtnConsultar}> Buscar Clima</Text>
                        </Animated.View>
                </TouchableWithoutFeedback>
               
          </View>
        </>
     );
}

const styles = StyleSheet.create({
    formulario:{
        marginTop:20,
        marginHorizontal:30
    },
    PickerPais:{
        borderColor:"white",
        borderWidth: 1,
        color:"white",
        marginTop:10
    },
    label:{
        color:"#71D3DB"
    },
    fontInput:{
        fontSize:15,
    },
    input: {
        marginTop: 10,
        height: 50,
        borderColor: 'white',
        borderWidth: 1,
        borderStyle: 'solid',
        backgroundColor:'white',
        color:'black'
    },
    btnConsultar:{
        backgroundColor:'#6C49EB',
        marginVertical:10,
        paddingVertical: 20,
        textTransform:'uppercase',
        borderRadius:20
    },
    labelbtnConsultar:{
        color:'white',
        textTransform:'uppercase',
        fontSize:15,
        textAlign:"center",
        fontWeight:'bold'
    }
})
 
export default Formulario;