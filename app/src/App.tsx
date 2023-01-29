import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Login from './components/pages/login/login';
import './App.css';


//pages:
const Login = React.lazy(() => import('./components/pages/login/login'));

class App extends Component{
	render() {
		return (
			<p>wtf is going on</p>
			// <Router>
			// <Route path='/login' element={< Login/> }/>
			// </Router>
		)
	}}


export default App;
