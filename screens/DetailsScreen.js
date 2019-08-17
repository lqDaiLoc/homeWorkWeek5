import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator, FlatList, TouchableOpacity, Alert } from 'react-native';
import Card from '../components/Card';

const KEY = '6eec2f7fe6cd4c40a3fef8f33f5778fe';
class DetailsScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      setloading : true,
      listData: [],
      pageNumber: 1,
      setPage: '&page=',
      setLoadingFooter: true,
      APIState: '',
    }
  }  
  componentDidMount = async () => {
    const {pageNumber, setPage} = this.state;
    const APIgetFromPage = await this.props.navigation.getParam('API');
    await setTimeout(() => {
      this.setState({
        setloading: false,
      })
    }, 2000 );
    //this.setAIPState(APIgetFromPage);
    this.setState({
      APIState: APIgetFromPage,
    })
    //const newPage = await 
    const newPage = await KEY + setPage + pageNumber;
    console.log('componenDidMout', newPage);
    this.loadPage(newPage);
  }
  setAIPState = async (APIgetFromPage) => {
    await this.setState({
      APIState: APIgetFromPage,
    }, () => {
      console.log('API state: ', this.state.APIState);
    })
  }
  refresh = async () => {
    console.log('asd');
    await this.setState({
      pageNumber: 1,
      listData: [],
    })
    await setTimeout(() => {}, 2000);
    const newPage = await KEY + this.state.setPage + this.state.pageNumber;
    await this.loadPage(newPage); 
  }
  nextPage = async () => {
    const newPageNumber = await this.state.pageNumber + 1;
    console.log(newPageNumber);
    await this.setState({
      pageNumber: newPageNumber,
    })
    const newPage = await KEY + this.state.setPage + this.state.pageNumber;
    this.loadPage(newPage);
  }
  loadPage = async (newPage) => {
    await this.setState({
      setLoadingFooter: true
    })
    const {listData, APIState} = this.state;
    const newAPI = await APIState + newPage;
    const response = await fetch(newAPI);
    const newResponse = await response.json();
    console.log(newResponse);
    console.log(newResponse.articles[0]);
    if( await newResponse.articles[0] === undefined){
      console.log("vao IF");  
      await this.setState({
        setLoadingFooter: false,
      })
    }
    else{
      console.log("vao Else");
      await setTimeout(async() => {
        await this.setState({
          setLoadingFooter: true
        })
      }, 2000);
        await this.setState({
          listData: listData.concat(newResponse.articles),
      })
    }
  }
  
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 2,
          width: "100%",
          backgroundColor: "#CED0CE",
          marginBottom: 5,
        }}
      />
    );
  };
  render() {
    const {setloading, listData} = this.state;
    if(setloading){
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator
          size = 'large'
          animating = {setloading}
          />
        </View>
      );
    }
    return(
      <View style = {styles.container}>
          <FlatList 
          data = {listData}
          ItemSeparatorComponent={this.renderSeparator}
          onEndReached = {this.nextPage}
          onEndReachedThreshold = {0.9}
          onRefresh = {this.refresh}
          refreshing = {false}
          renderItem={({item}) => {
            return(
              <Card urlImage = {item.urlToImage} title = {item.title}/>
            )}}/>
      </View>
    )  
    
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFE0",
  }
})
export default DetailsScreen;

