import React from 'react';
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner}  from 'expo-barcode-scanner'  

export default class TransactionScreen extends React.Component{
    constructor(){
        super()
        this.state={
            hasCameraPermissions:null,
            scanned:false,
            scannedData:"",
            buttonState:"normal",
        }
    }
    handleBarCodeScanned=async({type,data})=>{
        this.setState({
            scanned:true,
            scannedData:data,
            buttonState:"normal"
        })
    }
     getCameraPermission=async()=>{
         const {status}=await Permissions.askAsync(Permissions.CAMERA)
         this.setState({hasCameraPermissions:status ===  "granted" ,
                  buttonState :"clicked",
                  scanned:false
        })
     }
    render(){
        const hasCameraPermissions=this.state.hasCameraPermissions;
        const scanned=this.state.scanned;
        const buttonState=this.state.buttonState;
        if(buttonState === "clicked" && hasCameraPermissions  ){
            return(
                <BarCodeScanner
                 onBarCodeScanned={scanned? undefined:this.handleBarCodeScanned}
                 style={StyleSheet.absoluteFillObject}
                />

            )
        }else if(buttonState === "normal"){
        return(
            
            <View style={styles.container}>
                <Text style={styles.displayText}> {hasCameraPermissions === true
                 ? this.state.scannedData:"RequestCameraPermissions"
                }</Text>
                
                   <TouchableOpacity
                     style={styles.scanButton}
                     onPress={this.getCameraPermission}>

                       <Text style={styles.buttonText}> Scan QR Code</Text>
                   </TouchableOpacity>
            </View>
        )}
    }
}

const styles=StyleSheet.create(
    {
        container:{
            flex:1,
            justifyContent:"center",
            alignItems:"center"
        },
        displayText:{
          textDecorationLine:"underline",
          fontSize:30,
          padding:20
        },
        scanButton:{
            backgroundColor:"yellow",
            padding:20,
            margin:10
        },
        buttonText:{
            fontSize:40
        }
    }
)