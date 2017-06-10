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
//         //   const { results: places } = json;
//         console.log(json.results, "json.results");
//           this.setState({ places:json.results });
// console.log("================4================");
//         //   console.log(films, "films");
//         console.log(this.state.places, "construct - this.state.places");
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
    changeInput = (type, value, places) => {
        console.log("function changeInput()");
        console.log("type : "+type+" , value : "+value);
        //parentKey 구하기
        var parentKey = "";
        console.log(places, "this.state.place - changeInput");
        for( var key in places ){
            if( places[key].name == value ) {
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

    array_push = (x, y) => {
        var obj = {};
        for (var i = x.length-1; i >= 0; -- i)
            obj[x[i]] = x[i];
        for (var i = y.length-1; i >= 0; -- i)
            obj[y[i]] = y[i];
        var res = [];
        for (var k in obj) {
            if (obj.hasOwnProperty(k)) res.push(obj[k]);
        }
        return res;

        for( var i in y ){
            x.push(y[i])
        }
    }



    //API호출 ( 경로확인 )
    findPath = () => {
        //console.log(this.state.startKey);
        console.log("api호출");
console.log(this.state.startKey, "start");
        console.log(typeof this.state.startKey, "typeof start");


        var params = new Array();
        if( !this.state.startKey || !this.state.endKey ){
            alert('목적지 설정이 안되있음');
        }
        params['from'] = this.state.startKey;
        params['to'] = this.state.endKey;

        var queryString = "";
        for( var key in params ){
            queryString += "&"+key+"="+params[key];
        }

        console.log(queryString, "queryString");
//TODO
queryString = "from=Lausanne&to=Genève";
        var url = "http://transport.opendata.ch/v1/connections?"+queryString;


        //API 호출(Swiss transport)
        fetch(`${url}`).then(res => res.json()).then((json) => {
            console.log("----------swiss Transport API-------");

console.log(json, "json");
        //   const { results: places } = json;

console.log("================apiEnd================");


            //최근검색지 검색 후 Set
            AsyncStorage.getItem('test_key', (err, recentKey) => {
                //string으로 되어있는 저장된 값을 parsing하여 Array로 변화
                recentKey = JSON.parse(recentKey);
console.log(recentKey, "기존 들어가있는 최근검색지");

                //현재 검색한 값을 배열에 담음
                var searchKey = [this.state.startKey, this.state.endKey];
                if( this.state.passKey ) {
                    searchKey.push(this.state.passKey);
                }
console.log(searchKey, "검색지역");

                //검색한 키값을, 원래 있던 최근검색지에서 뺌 (맨 뒤에다가 다시 붙이기 위함)
                var tmpRecentKey = new Array();
console.log("------------start----------");
                for( var key in recentKey ) {
console.log("-s : "+recentKey[key]+"------");
                    //현재 최근검색지에 있는 항목과 검색한 항목을 비교해서 중복된 값은 뺌
                    duplicateKey = false;

                    for( var key2 in searchKey ){
                        if( recentKey[key] == searchKey[key2] ) {
                            duplicateKey = true;
                            break;
                        }
                    }
console.log((duplicateKey==true?"true":"false"), "duplicateKey");
                    //중복된 값일 경우 break;
                    if( duplicateKey === true ){
                        continue;
                    }
                    //중복된 값이 아니면 배열에 다시 담음
                    tmpRecentKey.push(recentKey[key]);
                }
console.log(tmpRecentKey, "recentKey2-중복제거");
                //검색한 키값을 merge시킴
                for( var i in searchKey ){
                    tmpRecentKey.push(searchKey[i]);
                }
                recentKey = tmpRecentKey;

console.log(recentKey, "recentKey3-중복제거후 union");

                var shiftCount = 0;
                var limitRecentKey = 5;
                if( recentKey.length > limitRecentKey ){
                    shiftCount = recentKey.length-limitRecentKey;
                }
console.log(shiftCount, "shift갯수");
                //앞에서부터 갯수 짜르기
                for( var i=0; i<shiftCount; i++ ){
                    recentKey.shift();
                }
console.log(recentKey, "recentKey4-shift후");

                AsyncStorage.setItem('test_key', JSON.stringify(recentKey), () => {

                });

            });
        });


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
