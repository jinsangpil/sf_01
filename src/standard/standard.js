/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
    Container, Content, Text, Card, Header, Body, Button, Title, CardItem ,
    Form, Item, Input
} from 'native-base';
import { Actions } from 'react-native-router-flux';



const styles = StyleSheet.create({
  input: {
    backgroundColor:'red'
  }
 });


export default class Standard extends Component {
  render() {
      console.log(this.props, "this.props");
      console.log(this.props.name, "name");
    /*
        Card = 네모박스
    */
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
                    <Input placeholder="출발지" value={(this.props.startName) ? this.props.startName : ''} />
                </Item>
                <Item>
                    <Input placeholder="도착지" value={(this.props.endName) ? this.props.endName : ''} />
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
                    onPress= {() => {Actions.pop(); }}>
                 <Text>Goto Page 1</Text>
             </Button>
             </Content>
        </Container>
    );
  }
}
