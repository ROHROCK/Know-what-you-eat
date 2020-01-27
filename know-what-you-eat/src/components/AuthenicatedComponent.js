import React,{Component} from 'react';
import {getJwt} from '../helpers/jwt';
import Axios from 'axios';

class AuthenticatedComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            user:undefined
        }
    }
    
    componentDidMount(){
        const jwt = getJwt();
        if(!jwt){
            this.props.history.push('/login');
        }
        Axios.get('/getUser/',{headers:{Authorization: `Bearer ${jwt}` } }).then(
            res => res.getState({
                user:res.data
            })).catch(err => this.props.history.push('/login'));
    }
    
    render(){
        return(
            <div>Hello AuthenticatedComponent</div>
        );
    }
}
export default AuthenticatedComponent;