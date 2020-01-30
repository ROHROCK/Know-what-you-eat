import React,{Component} from 'react';
import {FaAmazonPay} from 'react-icons/fa'
import './css/navbar.css';

export default class App extends Component {
    state = {
        toggle:false
    }
    Toggle = () => {
        this.setState({toggle:!this.state.toggle})
    }
    render() {
        return (
          <div>
              <div className="navBar">
                    <button onClick={this.Toggle}>
                        {/* <FaAlignRight /> */}
                        <FaAmazonPay />
                    </button>
                    <ul className={this.state.toggle ? "nav-links show-nav" : "nav-links"}>
                        <li href="#">Home</li>
                        <li href="#">About us</li>
                        <li href="#">Contact</li>
                    </ul>
              </div>
          </div>
        );
    }
}