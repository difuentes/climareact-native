import React from 'react';
import {View,Text,StyleSheet,Image} from 'react-native';

const Header = () => {
    return ( 
        <>
            <View style={styles.contenedorHeader}>
                
                <Image
                        style={styles.imgLogo}
                        source={require('../assets/img/logo.png')}
                    />
              
            </View>

            <View >
                <Text style={styles.textHeader}> DiFuentes - Clima </Text>
            </View>
        </>
     );
}
 
const styles = StyleSheet.create({
    contenedorHeader : {
        marginVertical:20,
        paddingHorizontal:145,
        width:100,
        justifyContent:'center', 
    },
    textHeader:{
        color:'white',
        fontSize:25,
        textAlign:'center',
        fontWeight:'bold'
    },
    imgLogo:{
        height:70,
    },
    nombreProyecto:{
        color:'white',
    }
})


export default Header;