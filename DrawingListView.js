import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native'
import {Svg} from './rn-draw-additional/src/config'
const {
  G, 
  Surface, 
  Path
} = Svg

export default class DrawingListView extends Component {
  render () {
    const { svgObjects} = this.props
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text>Saved Drawings</Text>
          {(svgObjects.length > 0)&&svgObjects.map((svgObj, index)=>{
            return (
              <View
                key={index}
                style={styles.imageFrame}
              >
                <Image
                  style={styles.backgroundImg}
                  source={(require('./whiteboard.jpg'))}
                />
                <Svg style={styles.drawSurface}>
                  <G>
                    {svgObj.previousStrokes}
                    <Path
                      // key={this.state.tracker}
                      d={svgObj.d}
                      stroke={ svgObj.stroke || "#000000"}
                      strokeWidth={svgObj.storkeWidth || 4}
                      fill={svgObj.fill}
                    />
                  </G>
                </Svg>
              </View>
            )
          })}
          <View>
            <TouchableOpacity
              onPress={this.props.swapView}
            >
              <Text>Draw</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 10
  },
  imageFrame:{
    height: 350,
    width:350,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  btnContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn: {
    margin: 20,
    padding: 10
  },
  btnGreen:{
    backgroundColor: 'green',
  },
  btnOrange:{
    backgroundColor: 'orange',
  },
  btnRed: {
    backgroundColor: 'red',
  },
  btnText: {
    textAlign: 'center'
  },
  drawContainer: {
    flex: 1,
    display: 'flex',
  },
  svgContainer: {
    flex: 1,
  },
  drawSurface: {
    flex: 1,
  },
  backgroundImg: {
    width: '100%', height: '90%', position: 'absolute'
  }
});