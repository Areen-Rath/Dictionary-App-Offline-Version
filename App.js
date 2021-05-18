import * as React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      word: '',
      definition: '',
      lexicalCategory: ''
    }
  }

  getWord = async (word) => {
    var searchKeyword = word.toLowerCase();
    var url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + searchKeyword;
    return fetch(url)
      .then((data) => {
        return data.json();
      })
      .then((responseJson) => {
        if(!responseJson.title){
          var wordData = responseJson[0].meanings[0];
          var definition = wordData.definitions[0].definition;
          var lexicalCategory = wordData.partOfSpeech;
          this.setState({
            definition: definition,
            lexicalCategory: lexicalCategory
          });
        } else {
          this.setState({
            definition: "Not Found",
            lexicalCategory: "Not Found"
          });
        }
      })
  }

  render() {
    return (
      <SafeAreaProvider>
        <View style={styles.container}>
          <Header
          backgroundColor={'orange'}
          centerComponent={{text: "English Dictionary", style: {color: "black", fontWeight: "bold", fontSize: 20}}} />
          <TextInput
          style={styles.inputBox}
          onChangeText={(text) => {
            this.setState({
              text: text
            });
          }}
          value={this.state.text} />
          <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            if(!this.state.text){
              this.setState({
                definition: "Invalid entry",
                lexicalCategory: "Invalid entry"
              });
            } else {
              this.getWord(this.state.text);
            }
          }}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
          <View style={{marginLeft: 30, marginTop: 30, flex: 1, flexDirection: "row"}}>
            <View>
              <Text style={{color: "green", fontWeight: "bold", fontSize: 15}}>Word: </Text>
            </View>
            <View>
              <Text style={{fontSize: 15}}>{this.state.text}</Text>
            </View>
          </View>
          <View style={{marginLeft: 30, marginBottom: 0, flex: 1, flexDirection: "row"}}>
            <View>
              <Text style={{color: "green", fontWeight: "bold", fontSize: 15}}>Type: </Text>
            </View>
            <View>
              <Text style={{fontSize: 15}}>{this.state.lexicalCategory}</Text>
            </View>
          </View>
          <View style={{marginLeft: 30, marginBottom: 150}}>
            <View>
              <Text style={{color: "green", fontWeight: "bold", fontSize: 15}}>Meaning: </Text>
            </View>
            <View>
              <Text style={{fontSize: 15}}>{this.state.definition}</Text>
            </View>
          </View>
          <Text style={{marginBottom: 50, textAlign: 'center'}}>Type your word and click on Search. You will get the meaning of the word.</Text>
          <Text style={{marginBottom: 20, alignSelf: 'center', fontSize: 15, fontWeight: "bold"}}>Created by Areen Rath</Text>
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles={
  container: {
    flex: 1
  },
  inputBox: {
    marginTop: 20,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 2,
    outline: 'none'
  },
  searchButton: {
    marginTop: 10,
    width: 80,
    height: 30,
    backgroundColor: "red",
    alignSelf: 'center',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: "bold",
    color: "white"
  }
}