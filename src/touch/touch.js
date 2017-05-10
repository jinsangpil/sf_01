/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    PanResponder,
    Animated,
    Text,
    Dimensions
} from 'react-native';
import { Container, Content, Card, Header, Body, Button, Title, CardItem } from 'native-base';
import { Actions } from 'react-native-router-flux';

let CIRCLE_RADIUS = 36;
let Window = Dimensions.get('window');
let styles = StyleSheet.create({
    mainContainer: {
        flex    : 1
    },
    dropZone    : {
        height         : 100,
        backgroundColor:'#2c3e50'
    },
    text        : {
        marginTop   : 25,
        marginLeft  : 5,
        marginRight : 5,
        textAlign   : 'center',
        color       : '#fff'
    },
    draggableContainer: {
        position    : 'absolute',
        top         : Window.height/2 - CIRCLE_RADIUS,
        left        : Window.width/2 - CIRCLE_RADIUS,
    },
    circle      : {
        backgroundColor     : '#1abc9c',
        width               : CIRCLE_RADIUS*2,
        height              : CIRCLE_RADIUS*2,
        borderRadius        : CIRCLE_RADIUS
    }
});

export default class Touch extends Component {
    constructor(props){
        super(props);

        this.state = {
            showDraggable   : true,
            dropZoneValues  : null,
            pan     : new Animated.ValueXY(),
        };

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder : () => true,
            onPanResponderMove           : Animated.event([null,{
                dx : this.state.pan.x,
                dy : this.state.pan.y
            }]),
            onPanResponderRelease           : (e, gesture) => {
                if(this.isDropZone(gesture)){ //Step 1
                    this.setState({
                        showDraggable : false //Step 3
                    });
                }else{
                    Animated.spring(
                        this.state.pan,
                        {toValue:{x:0,y:0}}
                    ).start();
                }
            }
            /*
            onPanResponderRelease        : (e, gesture) => {
                Animated.spring(
                    this.state.pan,
                    {toValue:{x:0,y:0}}
                ).start();
            }
            */
        });
    }

    isDropZone(gesture){     //Step 2
        var dz = this.state.dropZoneValues;
        return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height;
    }
    renderDraggable(){
        if(this.state.showDraggable){
            return (
                <View style={styles.draggableContainer}>
                    <Animated.View
                        {...this.panResponder.panHandlers}
                        style={[this.state.pan.getLayout(), styles.circle]}>
                        <Text style={styles.text}>Drag me!</Text>
                    </Animated.View>
                </View>
            );
        }
    }
    setDropZoneValues(event){
        this.setState({
            dropZoneValues : event.nativeEvent.layout
        });
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View
                    onLayout={this.setDropZoneValues.bind(this)}
                    style={styles.dropZone}>
                    <Text style={styles.text}>Drop me here!</Text>
                </View>

                {this.renderDraggable()}
            </View>
        );
    }
}
