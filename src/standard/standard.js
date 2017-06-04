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

        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();

        this.state = {
            startName : (this.props.startName) ? this.props.startName : '',
            passName : (this.props.passName) ? this.props.passName : '',
            endName : (this.props.endName) ? this.props.endName : '',
            date : year+"-"+(month<10?"0":"")+month+"-"+day+" "+hour+":"+minute,     //today date
            minDate : year+"-"+(month<10?"0":"")+month+"-"+day,     //today date
            maxDate : (year+1)+"-"+(month<10?"0":"")+month+"-"+day,     //Next Year
            showPass : (this.props.showPass) ? this.props.showPass : false,
        }
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

    changeInput = (type, value) => {
        if(type == 'start') {
            this.setState({startName:value});
        } else if (type == 'pass') {
            this.setState({passName:value});
        }else {
            this.setState({endName:value});
        }
        console.log('value :' + value);
    }

    //API호출 ( 경로확인 )
    findPath = () => {
        //console.log(this.state.startName);
        console.log("api호출");
        /*
        JSON =
        {
        "results" : [
                {
                "name":"아라우",
                "tag":["아라우", "arawoo"]
                },
                {
                "name":"헤리지우",
                "tag":["헤리자우", "herizawoo"]
                }
        ]
}
        */
console.log(this.state.startName, "start");
        console.log(typeof this.state.startName, "typeof start");
        //foreach( )
        //if( typeof this.state.startName != "undefind" )
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
                            <AutoInput type="start" name={this.state.startName} onChangeInput={this.changeInput}/>
                        </View>
                    </Item>
                    <Item style={this.state.showPass ? {} : { display: 'none' }}>
                        <View style={{flex:1}}>
                            <AutoInput type="pass" name={this.state.passName} onChangeInput={this.changeInput}/>
                        </View>
                    </Item>
                    <Item>
                        <View style={{flex:1}}>
                            <AutoInput type='end' name={this.state.endName} onChangeInput={this.changeInput}/>
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
                            /* TODO ????????????????????????????????????????? */
                            console.log("바꾸기!");

                                var _endName = this.state.startName;
                                this.setState({startName:this.state.endName, endName:_endName});
                                console.log(this.state.startName, "startName");
                                console.log(this.state.endName, "endName");
                                //
                                // this.state.startName = this.state.endName;
                                // console.log("start결과  :"+this.state.startName);
                                // this.state.endName = startName;
                                // console.log("end결과 : "+this.state.endName);
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
