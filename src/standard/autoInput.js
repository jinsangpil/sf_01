/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import Autocomplete from 'react-native-autocomplete-input';
import React, { Component, PropTypes } from 'react';
import { StyleSheet,View,TouchableOpacity, Text,AsyncStorage } from 'react-native';




const styles = StyleSheet.create({
  input: {
    backgroundColor:'red'
  }
 });

var Environment = require('../../environment.js');
const API = Environment.SBB_DATA_JSON; //'https://raw.githubusercontent.com/jinsangpil/sf_01/master/test2.json';

export default class AutoInput extends Component {
    static propTypes = {
        keys: PropTypes.string,
        type: PropTypes.string.isRequired,
        onChangeInput: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            keys: (this.props.keys) ? this.props.keys : '',  //출발지
            name : '', //(this.props.keys) ? places[this.props.keys].name : '',
            places: {},
            query: '',
            recentPlace : []
        };

        //keys값이 있을 경우 데이터에서 name값을 가져옴
        // console.log("-------------------------------autoInput-constructer---------");
        fetch(`${API}`).then(res => res.json()).then((json) => {
             console.log(json.results , "json.results");
         // const { results: places } = json;
          this.setState({ places : json.results});


          if( this.state.keys && this.state.places[this.props.keys] ) {
              this.setState({name:this.state.places[this.props.keys].name});
          }
        });


        AsyncStorage.getItem('test_key', (err, recentKey) => {
            //string으로 되어있는 저장된 값을 parsing하여 Array로 변화
            recentKey = JSON.parse(recentKey);
            this.setState({recentPlace: recentKey});
        });
    }

    //Component의 props가 변경되면 호출되는 함수
    componentWillReceiveProps(nextProps){
        //출발지나 도착지가 변경되면, this.state.keys 을 변경
        if( nextProps.type == "end" || nextProps.type == "start" ) {
            // console.log(nextProps, "nextProps.keys");
            this.state.keys = nextProps.keys;

            // console.log(this.state.places, "places");
            // console.log(nextProps.keys);
            // console.log(this.state.places[nextProps.keys], "aaa");
            this.state.name = nextProps.keys != "" ? this.state.places[nextProps.keys].name : "";
        }
    }

    //첫 Component 가 로드 되었을경우 호출 되는 부분으로 보임 ( web의 document.ready() 느낌 ) - render보다 빠른 실행
    componentDidMount() {
    }

    isEmptyObj( obj ) {
        for ( var prop in obj ) {
            return false;
        }
        return true;
    }

    //render() 에서 호출 하고 있는 함수
    findPlace(query) {
        var placeResult = [];

        // console.log("findPlace - query : "+query);
        // console.log(this.state.places, "places-----------");

        //최근검색지 TODO --------------
// this.setState(function(prevState, props) {
//     console.log(prevState, "prevState");
//     console.log(props, "props");
// });
console.log("================start================");
        //fetch를 통하여 places값이 입력되어서 비교할 대상이 생겼는지 확인
        if( !this.isEmptyObj(this.state.places) ){
            var recentPlaces = {};
            //최근검색지를 for문으로 확인
            for( var i in this.state.recentPlace ) {
                //fetch를 통하여 가져온 places내에 최근검색지가 있는지 체크 -> [최근검색지]를 붙이기 위해..
                if( typeof this.state.places[this.state.recentPlace[i]] !== "undefined") {
                    //state의 변수를 temp변수에 할당할때는 Object.assign() 사용하기.
                    recentPlaces = Object.assign({}, this.state.places[this.state.recentPlace[i]]);
                    recentPlaces['recent'] = true;
                    placeResult.push(recentPlaces);
                }
            }
        }

console.log(placeResult, "placeResult=================");

        //입력값이 없으면, 최근검색지만
        if (query === '') {
          return placeResult;
        }
// console.log(films, "films- findPlace");
        const place = this.state.places;       //const films = this.state.films;   와 동일
 // console.log(this.state, "films- this.state");
 // console.log(place, "films- rfsfindPlace2");
        const regex = new RegExp(`${query.trim()}`, 'i');
//console.log(films.filter(film => film.title.search(regex) >= 0), "search"); //정규식 title 검색하는거

        //모든 장소로 for돌리기
        for( var i in place ){
            // console.log( place[i], "place "+i);
            // console.log( place[i]['tag'], "place[tag] ");
            //한국 어플이기 때문에, 부르는 이름이 다를수 있어서 여러가지 이름을 배열에 넣고 모두 검색 할 예정
//console.log(place[i]['keys'], 'keys');
            for( var k in place[i]['tag'] ){
//console.log('       tag keys : '+place[i]['tag'][k]);
//console.log(place[i]['tag'][k].search(regex), "regex");
                //정규식에 맞춰 입력한 값이 있을 경우 break;
                if( place[i]['tag'][k].search(regex) >= 0 ) {
//console.log('-ok-----');
                    placeResult.push(place[i]);
                    break;
                }
            }
        }
        console.log(placeResult, "placeResult");

        return placeResult;

//        return films.filter(film => film.title.search(regex) >= 0); //정규식 title 검색하는거 - return 검색에 포함되는거 array
    }

    //액션이 일어날때마다 호출되는곳 으로 보임.
    render() {
//      console.log(this.props, "this.props");
      //console.log(this.props.keys, "keys");
    /*
        Card = 네모박스
    */


        const { query } = this.state;
        const places = query != "" ? this.findPlace(query) : [];
// console.log(query, "query");

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
                        this.props.onChangeInput(this.props.type, text, this.state.places);
                    }
                }
                placeholder={this.props.type=='start'?"출발지":(this.props.type=='end'?'도착지':(this.props.type='pass'?'경유지':this.props.type))}
                value={this.state.name}
                renderSeparator = { (sectionID, rowID) => {
                    console.log(rowID, "rowID");
                    }
                }

                renderItem={({ name }) => (
                    <TouchableOpacity onPress={() => {
                        console.log("Touchable : "+name);
                            this.setState({ query: name, name: name });
                            this.props.onChangeInput(this.props.type, name, this.state.places);
                        }
                    }>
                        <Text>{this.props.type} - {name}   </Text>
                    </TouchableOpacity>
                )
            } />
        </View>
        );
    }
}
