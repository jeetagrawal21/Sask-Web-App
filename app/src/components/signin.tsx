import '../stylings/signin.css';
import React , {Component} from 'react'
import { Link } from 'react-router-dom';


class SignIn extends Component{
    render(){
        return (
            <div className="signin">
            <form className="Auth-form">
                <h3>Sign In!</h3>
                <div className="participantId">
                    <input
                        type="id"
                        className="input-fields"
                        placeholder="Participant Id">  
                    </input>
                </div>
                <div className="password">
                    <input
                        type="password"
                        className="input-fields"
                        placeholder="Password">
                    </input>
                </div>
                    <Link to="dashboard">
                        <button className="signin-button">SIGN IN</button>
                    </Link>
                
                <p>Do not have an account?</p>
                <Link to="Register">
                <button className="register-button">REGISTER NOW</button>
                </Link>


        </form>
        </div>
        );
    }
}

export default SignIn;