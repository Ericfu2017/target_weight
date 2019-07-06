import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Animated } from "react-animated-css" ;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      targetWeight: 0,
      nowWeight: -1,
      data: [],
      text: '',
      visible: true,
      trigger: true
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleConfirmDone = this.handleConfirmDone.bind(this);
  }

  handleChange(e) {
    this.setState({
      text: e.target.value 
    })
  }

  handleConfirm() {
    if (!this.state.text.length) {
      return;
    }
    this.setState({
      targetWeight: this.state.text,
      nowWeight: parseInt(this.state.text).toFixed(1),
      text: ''
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if(!this.state.text.length) {
      return;
    }
    const newData = {
      data: Number(this.state.text).toFixed(1),
      id: Date.now()
    }
    this.setState({
      data: this.state.data.concat(newData),
      nowWeight: (this.state.nowWeight - Number(this.state.text).toFixed(1)).toFixed(1),
      text: '',
      trigger: !this.state.trigger
    })
  } 

  handleConfirmDone() {

    setTimeout(() =>  this.setState({
      targetWeight: 0,
      nowWeight: -1,
      data: [],
    }), 2000 )
   

   ;
    
  }

  render() {

     if (this.state.targetWeight === 0 && this.state.nowWeight === -1) {
      return (
        <div className="App">
          <div id="start">
            <label htmlFor="target-weight">
                <h3>Enter your Target Weight please :-) </h3>
              </label>
              <input 
                type="number"
                className="input" 
                onChange={this.handleChange}
                value={this.state.text}
              /> KG
              <br />
              {/*<button id="start-button" onClick={this.handleConfirm}>confirm</button>*/}
              <input className="button" type="button" value="Confirm" onClick={this.handleConfirm}/>
          </div>
        </div>
      )
    } else if (this.state.nowWeight < 1) {
        return (
          <Animated animationIn="zoomIn"  animationInDuration={2000} isVisible={this.state.visible}>
            <div className="App">
              <div className="done">
                <h3>Mission Accomplished!</h3>
                <h3>Congradulations! ^_^</h3>
                <button className="button" onClick={this.handleConfirmDone}>Confirm</button>
              </div>
            </div>
          </Animated>
        )
    } else {
        return (
          <div className="App">
            <DisplayScreen weight={this.state.targetWeight} left={this.state.nowWeight} trigger={this.state.trigger} />
            <div className="display-data">
              <DisplayData items={this.state.data} />
              <input type="number" className="input" onChange={this.handleChange} value={this.state.text}/> KG
              <br/>
              <button className="button" onClick={this.handleSubmit}>Add #{this.state.data.length + 1}</button>
            </div>
          </div>
        )
    } 

  }
}



const DisplayData = (props) => (
  <div>
    <ul className="my-list">
      {props.items.map(item => (
        <Animated animationIn="rollIn" isVisible={true}>
          <li key={item.id}> {item.data} </li>
        </Animated>
      ))}
    </ul>
  </div>
)

const DisplayScreen = (props) => (
  <div>
    <h2 className="display-screen">Target Weight: {props.weight} kg</h2>
    <div>
     <Animated animationIn="jello" animationOut="swing" isVisible={props.trigger}> 
        <h2 className="display-left">{props.left} kg left </h2>
      </Animated>  
    </div>
  </div>
)






export default App;
