import React, { Component } from 'react';
import {StyleSheet, View, Text, TouchableOpacity, TextInput} from "react-native";
import { insertNewItem, updateItem } from '../../databases/allSchemas';

export default class AddItemComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            rawData: '',
            isAddNew: true,
        };
    }
    componentDidMount(){
        if(this.props.route.params && this.props.route.params.message)
        this.setState({rawData:this.props.route.params.message})
    }
    render() {
        return (
                <View style={styles.container}>
                    <TextInput style={styles.textInput} placeholder="Enter Item data" autoCorrect={false}
                        onChangeText={(text) => this.setState({ rawData: text })} value={this.state.rawData}
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.button} onPress={() => {
                            if (this.state.rawData.trim() == "") {
                                alert("Please enter item' data");
                                return;
                            }
                            else {
                                const newItem = {
                                    id: Math.floor(Date.now() / 1000),
                                    rawData: this.state.rawData,
                                    creationDate: new Date()
                                };
                                
                                insertNewItem(newItem).then(
                                    (data)=>alert("item: "+data.rawData+" inserted"),
                                    this.props.navigation.navigate('ItemComponent')
                                ).catch((error) => {
                                    alert(`Insert new item error ${error}`);
                                });
                            }
                        }}>
                            <Text style={styles.textLabel}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => {
                            //go back
                            this.props.navigation.navigate('ItemComponent')
                        }}>
                            <Text style={styles.textLabel}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.buttonScanner} onPress={() => {
                            //go to QRCodeScannerComponent
                            this.props.navigation.navigate('QRCodeScannerComponent')
                        }}>
                            <Text style={styles.textLabel}>scan via qr code</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        );
    }
};
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        height: 40,
        padding: 10,
        margin: 10,
        borderColor: 'gray',
        borderWidth: 1
    },
    button: {
        backgroundColor: 'steelblue',
        padding: 10,
        margin: 10
    },
    buttonScanner: {
        backgroundColor: 'black',
        padding: 10,
        margin: 10
    },
    textLabel: {
        color: 'white',
        fontSize: 18,
    }
});