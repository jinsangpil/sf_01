var _Environments = {
    production:  {SBB_DATA_JSON: 'https://raw.githubusercontent.com/jinsangpil/sf_01/master/test2.json', API_KEY: ''},
    staging:     {SBB_DATA_JSON: 'https://raw.githubusercontent.com/jinsangpil/sf_01/master/test2.json', API_KEY: ''},
    development: {SBB_DATA_JSON: 'https://raw.githubusercontent.com/jinsangpil/sf_01/master/test2.json', API_KEY: ''},
}

function getEnvironment() {
    // Insert logic here to get the current platform (e.g. staging, production, etc)
    var platform = 'development';   //getPlatform()

    // ...now return the correct environment
    return _Environments[platform]
}

var Environment = getEnvironment()
module.exports = Environment
