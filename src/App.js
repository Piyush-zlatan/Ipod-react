import './App.css';
import React, { Component } from "react";
// import ReactDOM from "react-dom";
import ZingTouch from "zingtouch"; // npm install --save zingtouch
import MenuIcon from '@material-ui/icons/Menu';
import FastForwardIcon from '@material-ui/icons/FastForward';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Display from './components/View';
import Games from './components/Game';
import Settings from './components/Setting';
import Music from './components/Music';
import CoverFlow from './components/Cover';


let currentAngle = 0;
let lastRoundAngle = 0;


class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      events: [
        { index: 0, name: "Coverflow", isActive: true },
        { index: 1, name: "Games", isActive: false },
        { index: 2, name: "Music", isActive: false },
        { index: 3, name: "Setting", isActive: false }
      ],
      active: 0,
      showMenu: true,
      showGames: false,
      showMusic: false,
      showSettings: false,
      showCoverflow: false
    }
  }

  increaseActive = () => {
    if (this.state.active >= 3) {
      this.setState({
        active: -1
      })
    }
    this.setState({
      active: this.state.active + 1
    })
    console.log("active is:", this.state.active);

   
  };

  decreaseActive = () => {
    
    if (this.state.active <= 0) {
      this.setState({
        active: 4
      })
    }
    this.setState({
      active: this.state.active - 1
    })
  };

  handleClick = () => {

    this.setState({
      showMenu: false,
      showGames: false,
      showMusic: false,
      showSettings: false,
      showCoverflow: false
    })
    if (this.state.events[this.state.active].name === "Games") {
      this.setState({
        showGames: true
      })
    }
    if (this.state.events[this.state.active].name === "Music") {
      this.setState({
        showMusic: true
      })
    }
    if (this.state.events[this.state.active].name === "Setting") {
      this.setState({
        showSettings: true
      })
    }
    if (this.state.events[this.state.active].name === "Coverflow") {
      this.setState({
        showCoverflow: true
      })
    }
  }

  menuHandler = () => {
    this.setState({
      showMenu: false,
      showGames: false,
      showMusic: false,
      showSettings: false,
      showCoverflow: false,
      showMenu: true
    })
  }





  componentDidMount() {
    this.activeRegion = ZingTouch.Region(this.region);

    this.activeRegion.bind(this.element1, "rotate", event => {
      this.setState({ events: [...this.state.events, "rotate"] });
      console.log(event.detail.distanceFromLast); // inspect the "event" object whatevert.
      currentAngle += event.detail.distanceFromLast;
      const cal = Math.round(currentAngle % 360);
      console.log("adv", cal)


      if (Math.abs(lastRoundAngle - cal) >= 15) {
        if (event.detail.distanceFromLast > 0) {
          console.log("whatever")
          this.increaseActive();
        } else {
          this.decreaseActive();
        }
        lastRoundAngle = cal
      }
    });

  }

  componentWillUnmount() {
    this.activeRegion.unbind(this.element1, "rotate");
  }


  render() {
    return (
      <div className="App">
        {this.state.showMenu && <Display list={this.state.events} isAct={this.state.active} />}
        {this.state.showCoverflow && <CoverFlow />}
        {this.state.showGames && <Games />}
        {this.state.showMusic && <Music />}
        {this.state.showSettings && <Settings />}
        <div className="wheel-box" ref={element => (this.region = element)}>
          <div className="inner-circle" ref={element => (this.element1 = element)}>
            <button className="menu" onClick={this.menuHandler}><MenuIcon /></button>
            <div className="forward"><FastForwardIcon /></div>
            <div className="rewind"><FastRewindIcon /></div>
            <button className="centre-button" onClick={this.handleClick} />
            <div className="play"><PlayArrowIcon /></div>
          </div>
        </div>
      </div>
    )
  }
}

export default App