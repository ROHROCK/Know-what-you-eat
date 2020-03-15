import {StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
   baseText:{
     fontSize:20,
     fontFamily:'Arial'
   },
   parentView:{
     flex:1,
     flexDirection:'column',
     backgroundColor:'red'
   },
   imageView:{
     flex:1,
     flexDirection:'row',
     padding:2,
     backgroundColor:'blue'
   },  
   imagePicker1:{
       flex:1,
       justifyContent: 'space-around',
       alignItems:'center'
   },
   imagePicker2:{
       flex:1,
       justifyContent: 'space-around',
       alignItems:'center'
   },
   submitButton:{
     flex:1
   }
 });