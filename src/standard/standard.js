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



const styles = StyleSheet.create({
  input: {
    backgroundColor:'red'
  }
 });


 const API = 'https://raw.githubusercontent.com/jinsangpil/sf_01/master/test.json';
 const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

export default class Standard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startName: (this.props.startName) ? this.props.startName : '',  //출발지
            endName: (this.props.endName) ? this.props.endName : '',         //도착지

            places: [],
            query: ''
        };
    }

    //첫 Component 가 로드 되었을경우 호출 되는 부분으로 보임 ( web의 document.ready() 느낌 ) - render보다 빠른 실행
    componentDidMount() {
        fetch(`${API}`).then(res => res.json()).then((json) => {
            // console.log(json , "json");
          const { results: places } = json;
          this.setState({ places });
        //   console.log(films, "films");
        });
    }

    //render() 에서 호출 하고 있는 함수
    findFilm(query) {
        // console.log("findFilm - query : "+query);
        if (query === '') {
          return [];
        }
// console.log(films, "films- findFilm");
        const place = this.state.places;       //const films = this.state.films;   와 동일
 // console.log(this.state, "films- this.state");
 // console.log(place, "films- findFilm2");
        const regex = new RegExp(`${query.trim()}`, 'i');
//console.log(films.filter(film => film.title.search(regex) >= 0), "search"); //정규식 title 검색하는거

        var placeResult = [];
        for( var i in place ){
            // console.log( place[i], "place "+i);
            // console.log( place[i]['tag'], "place[tag] ");
            //한국 어플이기 때문에, 부르는 이름이 다를수 있어서 여러가지 이름을 배열에 넣고 모두 검색 할 예정
console.log(place[i]['name'], 'name');
            for( var k in place[i]['tag'] ){
console.log('       tag name : '+place[i]['tag'][k]);
console.log(place[i]['tag'][k].search(regex), "regex");
                if( place[i]['tag'][k].search(regex) >= 0 ) {
console.log('-ok-----');
                    placeResult.push(place[i]);
                    break;
                }
            }
        }
        // console.log(placeResult, "placeResult");
    console.log("--findFilm() end ---------------------------------");
        return placeResult;

//        return films.filter(film => film.title.search(regex) >= 0); //정규식 title 검색하는거 - return 검색에 포함되는거 array
    }

    //액션이 일어날때마다 호출되는곳 으로 보임.
    render() {
      console.log(this.props, "this.props");
      console.log(this.props.name, "name");
    /*
        Card = 네모박스
    */


        const { query } = this.state;
        const places = this.findFilm(query);
        /*
            function comp (a, b){
                return a.toLowerCase().trim() === b.toLowerCase().trim();
            }
        */
        //const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
        const comp = (a, b) => a.trim() === b.trim();
console.log(places, "자동완성-place");
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
                            <Autocomplete
                                autoCapitalize="none"
                                autoCorrect={false}
                                containerStyle={{/*width:300*/}}
                                data={places.length === 1 ? [] : places}
                                defaultValue={query}
                                onChangeText={text => this.setState({ query: text, startName:text })}
                                placeholder="출발지"
                                value={this.state.startName}
                                renderItem={({ name }) => (
                                <TouchableOpacity onPress={() => this.setState({ query: name, startName: name }) }>
                                    <Text>start - {name}</Text>
                                </TouchableOpacity>
                            )} />
                        </View>
                    </Item>
                    <Item>
                        <View style={{flex:1}}>
                            <Autocomplete
                                autoCapitalize="none"
                                autoCorrect={false}
                                containerStyle={{/*width:300*/}}
                                data={places.length === 1 ? [] : places}
                                defaultValue={query}
                                onChangeText={text => this.setState({ query: text, endName:text })}
                                placeholder="도착지"
                                value={this.state.endName}
                                renderItem={({ name }) => (
                                <TouchableOpacity onPress={() => this.setState({ query: name, endName: name }) }>
                                    <Text>end - {name}</Text>
                                </TouchableOpacity>
                            )} />
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

                        }}>
                     <Text>경로 확인</Text>
                 </Button>
                 </Content>
            </Container>
        );
    }
}
