/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import Autocomplete from 'react-native-autocomplete-input';
import React, { Component } from 'react';
import { StyleSheet,View,TouchableOpacity } from 'react-native';
import {
    Container, Content, Text, Card, Header, Body, Button, Title, CardItem ,
    Form, Item, Input
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import AutoInput from './autoInput';



const styles = StyleSheet.create({
  input: {
    backgroundColor:'red'
  }
 });

export default class Standard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startName : '',
            endName : ''
        }
    }

    changeInput = (type, value) => {
        if(type == 'start') {
            this.setState({startName:value});
        } else {
            this.setState({endName:value});
        }
        console.log('value :' + value);
    }


    //액션이 일어날때마다 호출되는곳 으로 보임.
    render() {
    /*
        Card = 네모박스
    */
        /*
            function comp (a, b){
                return a.toLowerCase().trim() === b.toLowerCase().trim();
            }
        */
        //const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
        const comp = (a, b) => a.trim() === b.trim();

        return (
            <Container>
                <Header>
                    <Body>
                        <Title>Standard</Title>
                    </Body>
                </Header>
                <Content padder>

                <Form>
                    <Item>
                        <View style={{flex:1}}>
                            <AutoInput type="start" name={this.state.startName} onChangeInput={this.changeInput}/>
                        </View>
                    </Item>
                    <Item>
                        <View style={{flex:1}}>
                            <AutoInput type='end' name={this.state.endName} onChangeInput={this.changeInput}/>
                        </View>
                    </Item>
                </Form>
                <Card>
                    <CardItem>
                      <Body>
                        <Text>
                            스위스 지하철 어플리케이션!!!!!!!!!!!!
                        </Text>
                      </Body>
                    </CardItem>
                </Card>
                <Button dark bordered style = {{alignSelf: 'center', margin: 30}}
                        onPress= {() => {
                            console.log("---api fetch----");
                            console.log(this.state.startName);

                        }}>
                     <Text>경로 확인</Text>
                 </Button>
                 </Content>
            </Container>
        );
    }
}
