import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const axios = require('axios')


class CreateExercise extends Component {
    constructor(props){
        super(props)
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangeDescription = this.onChangeDescription.bind(this)
        this.onChangeDuration = this.onChangeDuration.bind(this)
        this.onChangeDate = this.onChangeDate.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state ={
            username: '',
            description: '',
            duration : 0,
            date: new Date(),
            users: [],
        }
    }
    
    componentDidMount(){
        axios.get('http://localhost:5000/users/')
            .then(response => {
                if(response.data.length > 0){
                    this.setState({
                        users: response.data.map(user => user.username),
                        username: response.data[0].username
                    })  
                }else{
                    console.log('No data found!')
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        })
    }
    onChangeDescription(e){
        this.setState({
            description: e.target.value
        })
    }
    onChangeDuration(e){
        this.setState({
            duration: e.target.value
        })
    }
    onChangeDate(date){
        this.setState({
            date : date
        })
    }
    onSubmit(e){
        e.preventDefault()
        if(!this.state.username || !this.state.description || !this.state.duration || !this.state.date){
             alert('All Field Required!')
             return
        }else{
            const exercise ={
                username: this.state.username,
                description: this.state.description,
                duration : this.state.duration,
                date: this.state.date,
            }

            console.log(exercise)

            axios.post('http://localhost:5000/exercise/', exercise)
                .then(function (response) {
                    console.log(response);
                    window.location = '/'
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
    


    render() {
        return ( 
            <div className='container'>
                <h3 className='header'>Create new Exercise Log</h3>
               <form onSubmit={this.onSubmit}>
                   <div className='mb-3'>
                        <label className='form-label'>Username</label>
                        <select className="form-select form-select mb-3" aria-label=".form-select-lg" value={this.state.username} onChange={this.onChangeUsername}>
                            {
                                this.state.users.map(function(user) {
                                return <option 
                                    key={user}
                                    value={user}>{user}
                                    </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Description</label>
                        <textarea className='form-control' required rows='3' value={this.state.description} onChange={this.onChangeDescription}></textarea>
                    </div>
                    <div className='mb-3 col-md-2'>
                        <label className='form-label '>Duration (in minutes)</label>
                        <input type='number' required className='form-control' value={this.state.duration} onChange={this.onChangeDuration}/>
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Date</label><br/>
                        <DatePicker selected={this.state.date} onChange={this.onChangeDate}/>
                    </div>
                    <input type="submit" className="btn btn-info" value='Create Exercise Log'/>

               </form>
            </div>
        )
    }
}

export default CreateExercise
