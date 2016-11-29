/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PixelRatio,
  Dimensions,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import player from 'react-native-radio-player'
const { Player, radioPlayerTask } = player
import CircularSeekBarView from 'react-native-circular-seek-bar'
const { height, width } = Dimensions.get('window')

export default class radioDemo extends Component {
  constructor(props) {
    super(props);
    this.state = { played: false, loading: false }
  }

  componentDidMount() {
    Player.addListener("start", () => this.setState({played: true, loading: false}))
    Player.addListener("stop", () =>  this.setState({played: false}))
  }

  stop() {
    Player.stopPlayerService()
  }

  start() {
    Player.startPlayerService()
  }

  toggle() {
    if (this.state.played) {
      this.stop();
    } else {
      this.start();
      this.setState({loading: true})
    }
  }

  render() {
    return (
      <View style={styles.container}>     
        <StatusBar
          backgroundColor="rgba(0,0,0,0.2)"
          barStyle="light-content"
          translucent={true}
        />   
        <CircularSeekBarView
          circleColor="#d50000"
          circleProgressColor="#fff"
          circleXRadius={PixelRatio.getPixelSizeForLayoutSize(130)}
          circleYRadius={PixelRatio.getPixelSizeForLayoutSize(130)}
          pointerColor="#d50000"
          endAngle={180}
          onChangeProgress={(progress) => {
            Player.setVolume((100 - progress) / 100)
          }}
          strokeWidth={PixelRatio.getPixelSizeForLayoutSize(3)}
          max={100}
          progress={30}
          startAngle={0}
          useCustomRadius={true}
          pointerAlphaOnTouch={100}
          pointerHaloColor="rgba(213,0,0, 0.5)"
          pointerHaloColorOnTouch="rgba(213, 0, 0, 0.5)"
          style={{
            flex: 1,
            width: PixelRatio.getPixelSizeForLayoutSize(130),
            height: PixelRatio.getPixelSizeForLayoutSize(130),
            elevation: 7
          }}
        />
        <View style={styles.buttons}>
          {this.state.loading ? <ActivityIndicator animating={true} color="#d50000" size="large"/> :
          <TouchableOpacity onPress={this.toggle.bind(this)}>
            <View>
              <Text style={styles.welcome}>
                {(!this.state.played ? "Start" : "Stop")}
              </Text>
            </View>
          </TouchableOpacity>}
        </View>
      </View>
    );
  }
}

const buttonWidth = PixelRatio.getPixelSizeForLayoutSize(40);
const styles = StyleSheet.create({
  buttons: {
    position: 'absolute',
    height: buttonWidth,
    width: buttonWidth,
    top: height/2 - buttonWidth/2,
    left: width/2 - buttonWidth/2,
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: buttonWidth/2
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('radioDemo', () => radioDemo);
AppRegistry.registerHeadlessTask('radioPlayerTask', () => radioPlayerTask);
