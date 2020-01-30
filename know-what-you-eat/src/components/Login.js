import React,{ Component } from 'react';
import axios from 'axios';
import './css/Login.css'
// import withRouter from 'react-router-dom';

class Login extends Component{
    constructor(props){
        super(props);
        this.headers = {
            'Content-Type':'application/json;charset=UTF-8'
        }
        this.state = {
            username: '',
            password: ''
        }
        this.change = this.change.bind(this);
        this.submit = this.submit.bind(this);
    }
    change(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    
    submit(e){
        e.preventDefault();
        axios.post('/login',{
            username:this.state.username,
            password:this.state.password
        },this.headers).then((result) => {
            localStorage.setItem('jwt',result.data);
            this.props.history.push("/Dashboard");
        });
    }
    render(){
        return(<div>
            <form className="text-center Login.loginClass form-signin" onSubmit={e => this.submit(e)}>
            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <input className="form-control" placeholder="Email address"type="email" name="username" onChange={e => this.change(e)} value={this.state.username} required autoFocus/>
                <input className="form-control" type="password" name="password" onChange={e => this.change(e)} 
                value={this.state.password} required placeholder="password"/>
                <button type="submit" className="btn btn-lg btn-primary btn-block" >Submit</button>
            </form>
        </div>
        );
        
    }
}

export default Login;