import React,{Component} from "react";
import ImageLoader from './ImageLoader';
// import {StyleSheet, View} from 'react-native';

// const styles= StyleSheet.create({
//     parentView:{
//         flex:1,
//         flexDirection:'row'
//     },  
//     imagePicker1:{
//         flex:1,
//         justifyContent: 'space-around',
//         // alignItems:'center'
//     },
//     imagePicker2:{
//         flex:1,
//         justifyContent: 'space-around',
//     }
// })

class Dashboard extends Component{
    render(){
        return(
            <ImageLoader />
        // <View style={{flex:1,flexDirection:"column"}}>
        //         <View style={styles.parentView}>
        //              <View style={styles.imagePicker1} >
        //                  <ImageLoader />
        //              </View>
        //              <View style={styles.imagePicker2}>
        //                 <ImageLoader />
        //              </View>
        //         </View>
        // </View>
        );
    }
}
export default Dashboard;