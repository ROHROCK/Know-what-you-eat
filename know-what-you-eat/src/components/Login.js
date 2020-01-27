import React,{ Component } from 'react';
import axios from 'axios';

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
            console.log(result.data);
        });
    }
    render(){
        return(<div>
            <form onSubmit={e => this.submit(e)}>
                <label>Email</label><input type="text" name="username" onChange={e => this.change(e)} value={this.state.username}/>
                <label>Password</label><input type="password" name="password" onChange={e => this.change(e)} 
                value={this.state.password}/>
                <button type="submit" >Submit</button>
            </form>
        </div>
        );
        
    }
}

export default Login;