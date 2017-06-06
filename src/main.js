/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Content, Text, Card, Header, Body, Button, Title } from 'native-base';
import { Actions } from 'react-native-router-flux';

export default class Main extends Component {
  render() {
    return (
        <Container>
            <Header>
                <Body>
                    <Title>Main</Title>
                </Body>
            </Header>
            <Content padder>
                <View>
                    <Button dark bordered style = {{alignSelf: 'center', margin: 30}}
                            onPress= {() => {Actions.standard({
                                // 
                                // "startKey":"arawoo",
                                // "endKey":"herizawoo"
                                // "passName":"ccc",
                                // "showPass":true

                            }); }}>
                         <Text>Goto Page 1</Text>
                     </Button>
                     <Button dark bordered style = {{alignSelf: 'center', margin: 30}}
                             onPress= {() => {Actions.touch(); }}>
                          <Text>Goto Page 2</Text>
                      </Button>
                </View>
             </Content>
        </Container>
    );
  }
}
