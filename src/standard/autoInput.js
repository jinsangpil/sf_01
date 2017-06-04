/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import Autocomplete from 'react-native-autocomplete-input';
import React, { Component, PropTypes } from 'react';
import { StyleSheet,View,TouchableOpacity, Text } from 'react-native';




const styles = StyleSheet.create({
  input: {
    backgroundColor:'red'
  }
 });


const API = 'https://raw.githubusercontent.com/jinsangpil/sf_01/master/test2.json';

export default class AutoInput extends Component {
    static propTypes = {
        name: PropTypes.string,
        type: PropTypes.string.isRequired,
        onChangeInput: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            name: (this.props.name) ? this.props.name : '',  //출발지

            places: [],
            query: ''
        };
    }

    //Component의 props가 변경되면 호출되는 함수
    componentWillReceiveProps(nextProps){
        //출발지나 도착지가 변경되면, this.state.name 을 변경
        if( nextProps.type == "end" || nextProps.type == "start" ) {
            this.state.name = nextProps.name;
        }
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
    findPlace(query) {
        // console.log("findPlace - query : "+query);
        if (query === '') {
          return [];
        }
// console.log(films, "films- findPlace");
        const place = this.state.places;       //const films = this.state.films;   와 동일
 // console.log(this.state, "films- this.state");
 // console.log(place, "films- rfsfindPlace2");
        const regex = new RegExp(`${query.trim()}`, 'i');
//console.log(films.filter(film => film.title.search(regex) >= 0), "search"); //정규식 title 검색하는거

        var placeResult = [];
        //모든 장소로 for돌리기
        for( var i in place ){
            // console.log( place[i], "place "+i);
            // console.log( place[i]['tag'], "place[tag] ");
            //한국 어플이기 때문에, 부르는 이름이 다를수 있어서 여러가지 이름을 배열에 넣고 모두 검색 할 예정
//console.log(place[i]['name'], 'name');
            for( var k in place[i]['tag'] ){
//console.log('       tag name : '+place[i]['tag'][k]);
//console.log(place[i]['tag'][k].search(regex), "regex");
                //정규식에 맞춰 입력한 값이 있을 경우 break;
                if( place[i]['tag'][k].search(regex) >= 0 ) {
//console.log('-ok-----');
                    placeResult.push(place[i]);
                    break;
                }
            }
        }
        // console.log(placeResult, "placeResult");

        return placeResult;

//        return films.filter(film => film.title.search(regex) >= 0); //정규식 title 검색하는거 - return 검색에 포함되는거 array
    }

    //액션이 일어날때마다 호출되는곳 으로 보임.
    render() {
//      console.log(this.props, "this.props");
      //console.log(this.props.name, "name");
    /*
        Card = 네모박스
    */


        const { query } = this.state;
        const places = this.findPlace(query);
        /*
            function comp (a, b){
                return a.toLowerCase().trim() === b.toLowerCase().trim();
            }
        */
        //const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
//console.log(places, "자동완성-place");
        return (
            <View>
            <Autocomplete
                autoCapitalize="none"
                autoCorrect={false}
                containerStyle={{/*width:300*/}}
                data={places.length === 1 ? [] : places}
                defaultValue={query}
                onChangeText={text => {
                        this.setState({ query: text, name: text });
                        this.props.onChangeInput(this.props.type, text);
                    }
                }
                placeholder={this.props.type=='start'?"출발지":(this.props.type=='end'?'도착지':(this.props.type='pass'?'경유지':this.props.type))}
                value={this.state.name}
                renderItem={({ name }) => (
                <TouchableOpacity onPress={() => {
                        this.setState({ query: name, name: name });
                        this.props.onChangeInput(this.props.type, name);
                    }
                }>
                    <Text>{this.props.type} - {name}</Text>
                </TouchableOpacity>
            )} />
        </View>
        );
    }
}
