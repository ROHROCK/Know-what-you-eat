import React,{Component} from 'react';
import {withRouter} from 'react-router';
import Axios from 'axios';

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
        if(this.state.user === undefined){
            return(
                <div><h1>Loading ....</h1></div>
            );
        }
        return(
        <div>{this.props.children}</div>
        );
    }
}
export default withRouter(AuthenticatedComponent);