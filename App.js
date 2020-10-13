
import React,{useState,useEffect} from 'react';
import {View,Text,StyleSheet,TouchableWithoutFeedback,Keyboard,Alert} from 'react-native';

import Formulario from './components/formulario';
import Clima from './components/clima';
import Header from './components/Header';

const App  = () => {

  //state
  const[busqueda,guardarBusqueda] = useState({
    ciudad : ' ',
    pais:''
  })
  const [consultaApi ,guardarConsultaApi] = useState(false);
  const [resultado , guardarResultado ] = useState({});
  const [bgcolor,guardarBg]= useState('#FFF069')

  //destructruring busqueda
  const {ciudad,pais} = busqueda;

  useEffect(()=>{

    const consultarClima = async () => {

      if(consultaApi){
        const appid = '3cc215eedd974b938af02d8d1ccd2327';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appid}`;
        console.log("Entra a if")
        console.log(url);
        try {
            const respuesta = await fetch(url);
            const resultado =  await respuesta.json();
            console.log(resultado);
            guardarResultado(resultado);
            guardarConsultaApi(false);

             //modifica color de bg segun temp
            const kelvin = 273.15;
            const {main}=resultado;
            const actual = main.temp -kelvin;
            if(actual<10 ){
              guardarBg('#60D4EB');
            }
            else if(actual>=10 && actual< 25){
              guardarBg('#008712');
            }
            else{
              guardarBg('#c92646');
            }

        } catch (error) {
          mostrarAlerta();
        }
      }
      
    }
    consultarClima();
  }, [consultaApi] )

  //ocultar teclado
  const ocultarTeclado =()=>{
    Keyboard.dismiss()
  } 

  const mostrarAlerta=()=>{
    Alert.alert(
        'Error',
        'No hay resultado ,intenta con otra ciudad o pais',
        [{text:'Entendido'}]
        
    )
}

const bgColorApp ={
   backgroundColor: bgcolor
}

  return (
    <>
    <TouchableWithoutFeedback onPress={()=>ocultarTeclado()}>
        <View style={[styles.contenido,bgColorApp]}>
          <View style={styles.contenedorEncabezado}>
            <Header/>
          </View>
          <View>
            <Formulario
              busqueda={busqueda}
              guardarBusqueda={guardarBusqueda}
              guardarConsultaApi={guardarConsultaApi}
            />
          </View>
            
            <Clima 
              resultado={resultado}
            />
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
    contenido:{
      
      flex:1,
    },
    titulo:{
      color:'white',
      fontSize: 16
    },
    
});

export default App;
