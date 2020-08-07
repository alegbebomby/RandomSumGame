import React from 'react';
import PropTypes from 'prop-types';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
 
const  RandomNumber = ({randomNumber,id, isDisabled, onPress})=>  {  

    //touchable opacity
    //touchableHighlight
   
    const handlePress = () =>{
       if(isDisabled){
            return;
        }else{
            onPress(id);
        }
      

    }
   
    return (
        <TouchableOpacity onPress={handlePress}>  
        <Text style={[styles.randomNumber, isDisabled && styles.selected] }>{randomNumber}</Text>
        </TouchableOpacity> 
    )
    
   
}



const styles = StyleSheet.create({

    randomNumber:{
        paddingHorizontal:20,
        marginVertical:15,
        textAlign:'center',
        width:100,
        fontSize:40,
        backgroundColor: 'gray',

    },
    selected:{
        opacity:0.3
    }

  });
  RandomNumber.propTypes = {
    randomNumber: PropTypes.number.isRequired,
   isDisabled: PropTypes.bool.isRequired,
    onPress : PropTypes.func.isRequired,
    id: PropTypes.number.isRequired
  }

export default RandomNumber;