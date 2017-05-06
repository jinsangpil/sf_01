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
    constructor(props) {
    super(props);
    this.state = {
        startName: (this.props.startName) ? this.props.startName : '',
        endName: (this.props.endName) ? this.props.endName : ''
    };
  }

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
                    <Input placeholder="출발지"
                        onChangeText={(text) =>
                        this.setState({startName:text})
                        }
                        value={this.state.startName} />
                </Item>
                <Item>
                    <Input placeholder="도착지"
                        onChangeText={(text) =>
                        this.setState({endName:text})
                        }
                        value={this.state.endName}  />
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
