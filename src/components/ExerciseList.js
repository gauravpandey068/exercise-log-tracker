import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { BiEdit} from 'react-icons/bi'
import {FiDelete} from 'react-icons/fi'

const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
        <Link to={'/edit/'+props.exercise._id}><BiEdit/></Link> | <button className='btn btn-light' onClick={()=> {props.deleteExercise(props.exercise._id)}}><FiDelete/></button>
    </td>
  </tr>
)


class ExerciseList extends Component {

    constructor(props){
        super(props)
        this.deleteExercise = this.deleteExercise.bind(this)

        this.state = {exercises: []}
    }

    componentDidMount(){
        axios.get('http://localhost:5000/exercise/')
            .then(res =>{
                if (res.data.length > 0){
                    this.setState({
                    exercises: res.data,
                })
                }else{
                    console.log('No data found!')
                }
            })
                .catch((error) => {
                    console.log(error);
                })
            //})
    }


    exerciseList(){
        return this.state.exercises.map(currentExercise =>{
            return <Exercise exercise={currentExercise} deleteExercise={this.deleteExercise} key={currentExercise._id}/>
        })
    }

    deleteExercise(id){
        axios.delete('http://localhost:5000/exercise/'+id)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
        this.setState({
            exercises: this.state.exercises.filter(el => el._id !==id )
        })
    }


    render() {
        return (
            <div className='container'>
                <h3>Logged Exercises</h3>
                <table className='table'>
                        <thead className='thead-light'>
                            <tr>
                                <th>Username</th>
                                <th>Description</th>
                                <th>Duration (in minutes)</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.exerciseList()}
                        </tbody>
                    </table>
            </div>
        )
    }
}

export default ExerciseList
