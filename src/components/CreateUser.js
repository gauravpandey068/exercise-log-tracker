import React, { Component } from 'react'
const axios = require('axios')

class CreateUser extends Component {

    constructor(props){
        super(props)

        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state={
            username : '',
        }
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        })
    }
    onSubmit(e){
        e.preventDefault()
        if(!this.state.username){
            alert('Username required!')
            return
        }else{
            const user = {
               username: this.state.username
            }
            console.log(user)

            axios.post('http://localhost:5000/users/', user)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            this.setState({
                username : ''
            })
        }
    }

    render() {
        return (
            <div className='container'>
               <h3>Create new User</h3>
               <form onSubmit={this.onSubmit}>
                   <div className='mb-3'>
                        <label className='form-label'>Username</label>
                        <input type='text'  value={this.state.username}  onChange={this.onChangeUsername} className="form-control" placeholder="username"/>
                    </div>
                    <input type="submit" className="btn btn-primary" value='Create User'/>
               </form>
                
            </div>
        )
    }
}

export default CreateUser
