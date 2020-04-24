import React,{Component} from 'react';
import {withRouter} from 'react-router';
import Axios from 'axios';
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import ReactLoading from "react-loading";
import "bootstrap/dist/css/bootstrap.css";
import * as legoData from "./lego-loader.json";

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: legoData.default,
    rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
    }
}
class AuthenticatedComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            user:undefined
        }
    }
    componentDidMount(){
        const jwt = localStorage.getItem('jwt');
        console.log('JWT TOKEN',jwt);
        if(!jwt){
            this.props.history.push('/login');
        }
        Axios.get('/home',{
                headers:{
                    'Authorization':`Bearer ${jwt}`
                },
                option:{
                    'Access-Control-Allow-Origin':'*'
                }
                }).then(
                res => {
                    this.setState({
                        user:res.data
                    });
                    console.log('User name',this.state.user);
            }).catch(err => {
                    console.log("ERR",err);
                    localStorage.removeItem('jwt');
                    this.props.history.push('/login');
                });
        
    }

    render(){
        return(
            <div>
            {!this.state.user?
                (<FadeIn>
                <div className="d-flex justify-content-center align-items-center">
                    <h1>Loading..</h1>
                    <Lottie options={defaultOptions} height={120} width={120} />                      
                </div></FadeIn>)
        : 
        <div>{this.props.children}</div>
        }
        </div>
        );
    }
}
export default withRouter(AuthenticatedComponent);