import React,{Component} from 'react';
import {withRouter} from 'react-router';
import Axios from 'axios';
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import ReactLoading from "react-loading";
import "bootstrap/dist/css/bootstrap.css";

class AuthenticatedComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            user:undefined
        }
    }
    componentDidMount(){
        const jwt = localStorage.getItem('jwt');
        if(!jwt){
            this.props.history.push('/login');
        }
        // Asynch call
        setTimeout(10000);
        // Axios.get('/home',{
        //     headers:{
        //         'Authorization':`Bearer ${jwt}`
        //     },
        //     option:{
        //         'Access-Control-Allow-Origin':'*'
        //     }
        //     }).then(
        //     res => {
        //         this.setState({
        //             user:res.data
        //         });
        //         console.log('User name',this.state.user);
        // }).catch(err => {
        //         console.log("ERR",err);
        //         localStorage.removeItem('jwt');
        //         this.props.history.push('/login');
        //     });
    }

    render(){
        return(
        <div>
        {!this.state.user?<ReactLoading type={"bars"} color={"white"} />: 
        <div>{this.props.children}</div>
        }
        </div>
        );
        
    }
}
export default withRouter(AuthenticatedComponent);