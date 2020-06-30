import React, { Component } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { updateItem, deleteItem, queryAllItems, deleteAllItems } from '../../databases/allSchemas';
import realm from '../../databases/allSchemas';
import Swipeout from 'react-native-swipeout';
import HeaderComponent from './HeaderComponent';
import PushNotification from "react-native-push-notification"
import Pusher from 'pusher-js/react-native';
const setupPushNotification = (handleNotification) => {
    PushNotification.configure({
        onRegister: function (token) {
            console.log("TOKEN:", token);
        },
        onNotification: function(notification) {
            handleNotification(notification)
        },
        permissions: {
            alert: true,
            badge: true,
            sound: true,
        },
        popInitialNotification: true,
        requestPermissions: false,
    });
  
    return PushNotification
}
let FlatListItem = props => {
    const { itemIndex, id, rawData, creationDate, onPressItem } = props;
    const showEditModal = () => {
        alert("editing")
    }
    const showDeleteConfirmation = () => {
        Alert.alert(
            'Delete',
            'Delete a item',
            [
                {
                    text: 'No', onPress: () => { },//Do nothing
                    style: 'cancel'
                },
                {
                    text: 'Yes', onPress: () => {
                        deleteItem(id).then((e)=>console.log(e))
                    }
                },
            ],
            { cancelable: true }
        );
    };
    return (
        <Swipeout right={[
            {
                text: 'Edit',
                backgroundColor: 'rgb(81,134,237)',
                onPress: showEditModal
            },
            {
                text: 'Delete',
                backgroundColor: 'rgb(217, 80, 64)',
                onPress: showDeleteConfirmation
            }
        ]} autoClose={true} rowId={itemIndex}>
            <TouchableOpacity onPress={onPressItem}>
                <View style={{ backgroundColor: itemIndex % 2 == 0 ? 'powderblue' : 'skyblue' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, margin: 10 }}>{rawData}</Text>
                    <Text style={{ fontSize: 18, margin: 10 }} numberOfLines={2}>{creationDate.toLocaleString()}</Text>
                </View>
            </TouchableOpacity>
        </Swipeout >
    );
}
export default class ItemComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };

        this.reloadData();
        //when database change
        realm.addListener('change', () => {
            this.reloadData();
        });
    }

    componentDidMount() {
        this.pushNotification = setupPushNotification(this._handleNotificationOpen)
        this.listen()
    }

    reloadData = () => {
        queryAllItems().then((items) => {
            
            this.setState({ items });
        }).catch((error) => {
            this.setState({ items: [] });
        });
    }

    listen(){
        Pusher.logToConsole = true;
        var pusher = new Pusher('e3e7681e29c903e50f12', {
          cluster: 'mt1',
          activityTimeout: 6000
        });
        
        var channel = pusher.subscribe('products');
        channel.bind('newProduct', (newitem) => {
          this.testPush('new item',JSON.stringify(newitem))
        });
        
    }

    testPush = (title, message) => {
        PushNotification.localNotification({
        title,
        message
        });
    }

    _handleNotificationOpen = ({title,message}) => {
        this.props.navigation.navigate('AddItemComponent', { title:title, message:message })
    }
    render() {
        console.log(this.state.items)
        return (
            <View >
                <HeaderComponent  hasAddButton={true} navigation={this.props.navigation}/>
                <FlatList
                    
                    data={this.state.items}
                    renderItem={({ item, index }) => <FlatListItem {...item} itemIndex={index} id={item.id} rawData={item.rawData} creationDate={item.creationDate} onPressItem={() => {alert(`You pressed item `);}} />}
                    keyExtractor={item => item.id.toString()}
                    // ListEmptyComponent={console.log('yes')}  
                />
                
            </View>
        );
    }
}
const styles = StyleSheet.create({
    
    
});