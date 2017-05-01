/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Container, Content, Text, Card, Header, Body, Button, Title, CardItem } from 'native-base';
import { Actions } from 'react-native-router-flux';

export default class Touch extends Component {
  render() {
    return (
        <Container>
            <Header>
                <Body>
                    <Title>Touch</Title>
                </Body>
            </Header>
            <Content padder>
            <Card>
                    <CardItem>
                      <Body>
                        <Text>
                            This is Page One, Press button to goto page two
                        </Text>
                      </Body>
                    </CardItem>
                    </Card>
                    <Button dark bordered style = {{alignSelf: 'center', margin: 30}}
                            onPress= {() => {Actions.pop(); }}>
                         <Text>Goto Page 2</Text>
                     </Button>
             </Content>
        </Container>
    );
  }
}
