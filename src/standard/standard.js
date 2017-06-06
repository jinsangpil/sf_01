/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import Autocomplete from 'react-native-autocomplete-input';
import React, { Component } from 'react';
import { StyleSheet,View,TouchableOpacity,AsyncStorage } from 'react-native';
import {
    Container, Content, Text, Card, Header, Body, Button, Title, CardItem ,
    Form, Item, Input
} from 'native-base';
import DatePicker from 'react-native-datepicker'
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

        //config
        var Environment = require('../../environment.js');

        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();

        this.state = {
            startKey : (this.props.startKey) ? this.props.startKey : '',
            passKey : (this.props.passKey) ? this.props.passKey : '',
            endKey : (this.props.endKey) ? this.props.endKey : '',
            date : year+"-"+(month<10?"0":"")+month+"-"+day+" "+hour+":"+minute,     //today date
            minDate : year+"-"+(month<10?"0":"")+month+"-"+day,     //today date
            maxDate : (year+1)+"-"+(month<10?"0":"")+month+"-"+day,     //Next Year
            showPass : (this.props.showPass) ? this.props.showPass : false,
            places : {}
        }
        console.log(this.state, "===this.state===");
// console.log("================1================");
//         const API = Environment.SBB_DATA_JSON;
// console.log("================2================");
//
//         fetch(`${API}`).then(res => res.json()).then((json) => {
//             // console.log(json , "json");
// console.log("================3================");
// console.log(json, "json");
//           const { results: places } = json;
//           this.setState({ places });
// console.log("================4================");
//         //   console.log(films, "films");
//         });
/*
        testSetData = {
            'a':'b'
        }

        AsyncStorage.setItem('test_key', JSON.stringify(testSetData), () => {

        });

*/
/*
        AsyncStorage.getItem('test_key', (err, result) => {
            console.log(err, "err");
            console.log(result, "result");
        });
*/
    }

    //[바꾸기] 버튼 클릭
    changeInput = (type, value) => {
        console.log("function changeInput()");
        console.log("type : "+type+" , value : "+value);
        //parentKey 구하기
        var parentKey = "";
        for( var key in this.state.places ){
            if( this.state.places[key].name == value ) {
                parentKey = key;
                break;
            }
        }

        if( parentKey != "" ) {
            if(type == 'start') {
                this.setState({startKey:parentKey});
            } else if (type == 'pass') {
                this.setState({passKey:parentKey});
            } else {
                this.setState({endKey:parentKey});
            }
        }
        // console.log(parentKey, "parentKet");
        // console.log('value :' + value);
    }

    //API호출 ( 경로확인 )
    findPath = () => {
        //console.log(this.state.startKey);
        console.log("api호출");
console.log(this.state.startKey, "start");
        console.log(typeof this.state.startKey, "typeof start");
        //foreach( )
        //if( typeof this.state.startKey != "undefind" )
        //AsyncStorage.setItem('recentInput', JSON.stringify(testSetData), () => {

        //});

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
                            <AutoInput type="start" keys={this.state.startKey} onChangeInput={this.changeInput}/>
                        </View>
                    </Item>
                    <Item style={this.state.showPass ? {} : { display: 'none' }}>
                        <View style={{flex:1}}>
                            <AutoInput type="pass" keys={this.state.passKey} onChangeInput={this.changeInput}/>
                        </View>
                    </Item>
                    <Item>
                        <View style={{flex:1}}>
                            <AutoInput type='end' keys={this.state.endKey} onChangeInput={this.changeInput}/>
                        </View>
                    </Item>
                    <Item>
                        <DatePicker
                            style={{width: 200}}
                            date={this.state.date}
                            mode="datetime"     //date , datetime, time
                            placeholder="날짜 선택"     //default값이 있어 없어도 됨.
                            format="YYYY-MM-DD HH:mm"
                            minDate={this.state.minDate}
                            maxDate={this.state.maxDate}
                            confirmBtnText="확인"
                            cancelBtnText="취소"
                            customStyles={{
                              dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                              },
                              dateInput: {
                                marginLeft: 36
                              }

                            }}
                            onDateChange={(date) => {this.setState({date: date})}}
                          />

                        <Button bordered danger onPress= {() => {
                                console.log("바꾸기!");

                                var _endKey = this.state.startKey;
                                this.setState({startKey:this.state.endKey, endKey:_endKey});

                            }
                        }>
                             <Text>바꾸기</Text>
                         </Button>
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
                            this.findPath();
                        }}>
                     <Text>경로 확인</Text>
                 </Button>
                 </Content>
            </Container>
        );
    }
}
