import React from 'react';
import {View,Text,StyleSheet,Image} from 'react-native';

const Clima = ({resultado}) => {

    const {name , main} = resultado;

    if(!name) return null;

    //convertir kelvin a grados
    const kelvin = 275.15;
            
    return ( 
        <View style={styles.clima}>
            <Text style={[styles.texto,styles.actual]}>{parseInt(main.temp - kelvin)}  
                <Text style={styles.temperatura}>&#x2103;</Text>
                
            </Text>
            <View style={styles.img}>
                <Image
                style={{width:60,height:60}}
                source={{uri:`http://openweathermap.org//img/w/${resultado.weather[0].icon}.png`}}
                />
            </View>

            <View style={styles.temperaturas}>
                <Text >
                    <Text style={styles.textoTemp}>Min{' '}
                        {parseInt(main.temp_min-kelvin)}&#x2103;
                    </Text>
                </Text>
                <Text style={styles.textoTemp}>-Max{' '}
                    <Text>
                        {parseInt(main.temp_max-kelvin)}&#x2103;
                    </Text>
                </Text>
            </View>
            
           
        </View>
     );
}


const styles = StyleSheet.create({
    clima:{
        marginTop:20,
        justifyContent:"center"

    },
    texto:{
        color:'white',
        fontSize:70,
        textAlign:"center",
        fontWeight:"bold"
    },
    actual :{
       
    },
    temperatura:{
        color:'white',
        fontWeight:"normal"
    },
    temperaturas:{
        flexDirection:'row',
        justifyContent:'center'

    },
    textoTemp:{
        color:'white',
        fontSize:20,
        fontWeight:"bold"
    },
    img:{
        flexDirection:'row',
        justifyContent:'center'
    }

})
 
export default Clima;