import React from 'react'
import{BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/Navbar'
import ExerciseList from './components/ExerciseList'
import CreateExercise from './components/CreateExercise'
import EditExercise from './components/EditExercise'
import CreateUser from './components/CreateUser'

function App() {
  return (
    // <Router>
    //   <div>
    //     <Navbar/>
    //       <br/>
    //       {/* <Route exact path ="/"  component={ExerciseList} />
    //       <Route exact path ="/edit/:id" component={EditExercise} />
    //       <Route exact path ="/create" component={CreateExercise} />
    //       <Route exact path ="/user" component={CreateUser} /> */}
    //       <Route exact path="/">
    //           <ExerciseList />
    //       </Route>
    //       <Route exact path="/edit/:id">
    //           <EditExercise />
    //       </Route>
    //       <Route exact path="/create">
    //           <CreateExercise />
    //       </Route>
    //       <Route exact path="/user">
    //           <CreateUser />
    //       </Route>
    //   </div>
    // </Router>
    <Router>
      <div>
        <Navbar />
        <br/>
        <Route path="/" exact component={ExerciseList} />
        <Route path="/edit/:id" component={EditExercise} />
        <Route path="/create" component={CreateExercise} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
