import React, { Component } from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Platform, Image, Alert} from "react-native";
const HeaderComponent = props => {
    const { hasAddButton, navigation} = props;
    return (//show this TouchableOpacity if hasAddButton==true
        <View style={styles.container}>
            {hasAddButton && <TouchableOpacity style={styles.addButton} onPress={() => {navigation.navigate('AddItemComponent')}}>
                <Image style={styles.addButtonImage} source={require('../images/add-icon.png')} />
            </TouchableOpacity>}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgb(224, 93, 144)',
        height: Platform.OS === 'ios' ? 100 : 80,
    },
    titleText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        position: 'absolute',
        textAlign: 'center',        
        justifyContent: 'center',        
        alignItems: 'center',        
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        padding: 50
    }, 
    addButton: {
        zIndex: 2,
        marginRight: 10,
        marginTop: 30,
    },    
    addButtonImage: {
        width: 42,
        height: 42,    
        tintColor: 'white'    
    },
});
export default HeaderComponent;