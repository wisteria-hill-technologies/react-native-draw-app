import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native'
import RNDraw from './rn-draw-additional'
import uuidv1 from 'uuid/v1'
import {Svg} from './rn-draw-additional/src/config'
const {
  G, 
  Surface, 
  Path
} = Svg

import DrawingListView from './DrawingListView'

export default class App extends React.Component {

  state={
    svgId: null,
    currentSVGInfo: null,
    svgObjects:[],
    savedDrawingView: false
  }

  componentDidMount(){
    this.setState({
      svgId: uuidv1()
    })
  }

  rewind=()=>{
    this._undo()
  }

  clear=()=>{
    this._clear()
  }

  updateSVGInfo=(svgObj)=>{
    this.setState({
      currentSVGInfo: svgObj
    })
  }

  save=()=>{
    const newSVGObjToSave = {
      id: this.state.svgId,
      ...this.state.currentSVGInfo
    }
    this.setState({
      svgObjects: [...this.state.svgObjects, newSVGObjToSave]
    },()=>{
      this.clear()
      this.setState({
        svgId: uuidv1()
      })
      console.log("svgObjects>>>", this.state.svgObjects)
    })
  }

  swapView=()=>{
    this.setState({
      savedDrawingView: !this.state.savedDrawingView
    })
  }

  render() {
    const { svgObjects, savedDrawingView } = this.state
    return savedDrawingView?(
      <DrawingListView
        svgObjects={svgObjects}
        swapView={this.swapView}
      />
    ):(
        <View style={styles.container}>
          <View style={styles.container}>
            <Text>React Native Draw</Text>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                onPress={this.clear}
                style={[styles.btn, styles.btnRed]}
              >
                <Text style={styles.btnText}>Clear</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.rewind}
                style={[styles.btn, styles.btnOrange]}
              >
                <Text style={styles.btnText}>Rewind</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.save}
                style={[styles.btn, styles.btnGreen]}
              >
                <Text style={styles.btnText}>Save</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.imageFrame}>
              <Image
                style={styles.backgroundImg}
                source={(require('./whiteboard.jpg'))}
              />
              <RNDraw
                containerStyle={{backgroundColor: 'rgba(0,0,0,0.01)'}}
                rewind={(undo) => {this._undo = undo}}
                clear={(clear) => {this._clear = clear}}
                updateSVGInfo={(svgObj)=>{this.updateSVGInfo(svgObj)}}
                color={'#000000'}
                strokeWidth={4}
                svgId={this.state.svgId}
              />
            </View>
  
            <View>
              <TouchableOpacity
                onPress={this.swapView}
              >
                <Text>Saved Drawings</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
