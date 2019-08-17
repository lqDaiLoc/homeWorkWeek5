import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ImageBackground, Image, TextInput, TouchableOpacity} from 'react-native';
import CountryChoose from '../components/CountryChoose';
import WeatherIcon from '../components/WeatherIcon';
import CITYS from "../index";
import {getWeatherBackgroundImage, getWeatherIcon} from '../utility';


export default class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      sourceBackground: 'https://img.buzzfeed.com/buzzfeed-static/static/2016-02/8/14/enhanced/webdr05/original-25907-1454958031-8.jpg?downsize=800:*&output-format=auto&output-quality=auto',
      sourceIconWeather: 'weather-cloudy',
      nameCountry: '',
      loading : true,
      error: false,
      APIPaper: 'https://newsapi.org/v2/top-headlines?country=us&apiKey=',
      location : {latitude: "", longitude: "", name: "",},
      weather : {main: '', description: '',},
      wind: {speed: '',},
      temp: {tempMax: '', tempMin: '',
      }
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loading: false,
      })
    }, 2000);
  }

  getWeather = async  (latitude, longitude, city) => {
    const API_KEY = "8fe5bfa165f3713a5195949415c117d5";
    const api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
    try {
      const response = await fetch(api);
      const jsonData = await response.json();
      await this.setState({
        APIPaper: city.API,
        location : {
          latitude: city.latitude,
          longitude: city.longitude,
          name: jsonData.name,
        },
        weather: {
          main: jsonData.weather[0].main,
          description: jsonData.weather[0].description,
        },
        temp: {
          tempMin: jsonData.main.temp_min,
          tempMax: jsonData.main.temp_min,
        },
        wind: {
          speed: jsonData.wind.speed,
        }
      })
    } catch (error) {
      this.setState({
        error: true,
      })
    }
    
  }

  onPressButtonn = async (nameCountry) => {
    await this.setState({
      loading: true,
    })
    setTimeout( async () => {
      const newcity = await CITYS.find(city => city.city === nameCountry);
      await this.getWeather(newcity.latitude, newcity.longitude, newcity);
      const sourceIMG = await getWeatherBackgroundImage(this.state.weather.main);
      const sourceIcon = await getWeatherIcon(this.state.weather.main);
      await this.setState({
      sourceBackground : sourceIMG,
      sourceIconWeather : sourceIcon,
      loading : false
    })
    }, 500);
    
  }
  render(){
    const source = this.state.sourceBackground;
  return (
    <ImageBackground source = {{uri: source}} style={{width: '100%', height: '100%'}}>
    <View style={styles.container}>
      <View style={styles.header}>
        <ActivityIndicator animating={this.state.loading}/>
      </View>
      <View style={styles.displayOptions}>
        <View style = {{flexDirection: 'row'}}>
          <WeatherIcon name = 'city-variant'/>
          <Text style={styles.textColor}>{this.state.location.name}</Text>
        </View>
        <View style = {{flexDirection: 'row'}}>
          <WeatherIcon name = 'weather-windy'/>
          <Text style={styles.textColor}>{this.state.wind.speed}</Text>
        </View>
        <View style = {{flexDirection: 'row'}}>
          <WeatherIcon name = {this.state.sourceIconWeather}/>
          <Text  style={styles.textColor}>{this.state.weather.description}</Text>
        </View>
        <View style = {{flexDirection: 'row'}}>
          <WeatherIcon name = 'temperature-kelvin'/>
          <Text style={styles.textColor}>{this.state.temp.tempMin}-{this.state.temp.tempMax}</Text>
        </View>
      </View>
      <View style={styles.viewInput}>
        <TextInput ></TextInput>
      </View>
      <View style={styles.viewButton}>
        <View style={styles.groupButton}>
          <CountryChoose nameCountry = "Hoa Kỳ" onPressButton = {this.onPressButtonn}/>
          <CountryChoose nameCountry = "Japan" onPressButton = {this.onPressButtonn}/>
          <CountryChoose nameCountry = "Italy" onPressButton = {this.onPressButtonn}/>
        </View>
        <View style={styles.groupButton}>
          <CountryChoose nameCountry = "China" onPressButton = {this.onPressButtonn}/>
          <CountryChoose nameCountry = "Malaysia" onPressButton = {this.onPressButtonn}/>
          <CountryChoose nameCountry = "Philippines" onPressButton = {this.onPressButtonn}/>
        </View>
        <View style={styles.groupButton}>
          <CountryChoose nameCountry = "Pháp" onPressButton = {this.onPressButtonn}/>
          <CountryChoose nameCountry = "Taiwan" onPressButton = {this.onPressButtonn}/>
          <CountryChoose nameCountry = "Turkey" onPressButton = {this.onPressButtonn}/>
        </View>
      </View>
      <View style={styles.viewFooter}>
        <TouchableOpacity 
          style={styles.readPaperStyle}
          onPress = {() => this.props.navigation.navigate('Details1', {API: this.state.APIPaper})}>
          <Text style={{color: 'white'}}>READ PAPER</Text>
        </TouchableOpacity>
      </View>
    </View>
  </ImageBackground>
  );}
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textColor: {
    color: 'black',
  },
  header: {
    flex: 0.3,
  },
  displayOptions: {
    flex: 0.2,
    width: '80%',
    height: '90%',
    borderColor: "#5F9EA0",
    borderRadius: 10,
    borderWidth: 2,
    marginLeft: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewInput: {
    flex: 0.05,
    borderColor: "#5F9EA0",
    borderRadius: 10,
    borderWidth: 2,
    width: '60%',
    height: '80%',
    marginLeft: '20%',
    marginTop: 5,
  },
  viewButton: {
    flex: 0.2,
  },
  groupButton:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: 5,
  },
  viewFooter: {
    flex: 0.25,
  },
  readPaperStyle: {
    width: '50%',
    height: 30,
    marginLeft: '25%',
    marginTop: 50,
    backgroundColor: '#B8860B',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  }
  
});