import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ItemComponent from './ItemComponent'
import AddItemComponent from './AddItemComponent'
import QRCodeScannerComponent from './QRCodeScannerComponent'
const Stack = createStackNavigator();

class StackComponent extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="ItemComponent" options={{ title: 'item list' }}>
                        {props => <ItemComponent route={props.route} navigation={props.navigation}/>}
                    </Stack.Screen>
                    <Stack.Screen name="AddItemComponent" options={{ title: 'add new item' }}>
                        {props => <AddItemComponent route={props.route} navigation={props.navigation}/>}
                    </Stack.Screen>
                    <Stack.Screen name="QRCodeScannerComponent" component={QRCodeScannerComponent} options={{ title: 'scan qr code' }} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}
export default StackComponent;