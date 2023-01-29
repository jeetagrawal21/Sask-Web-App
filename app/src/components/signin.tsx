import '../stylings/signin.css';
function SignIn(){
    return(
        <div className="signin">
            <form className="Auth-form">
                <h3>Sign In!</h3>
                <div className="participantId">
                    <input
                    type="id"
                    className="input-fields"
                    placeholder="Participant Id"></input>
                </div>
                <div className="password">
                    <input
                    type="password"
                    className="input-fields"
                    placeholder="Password"></input>
                </div>
                <button className="signin-button">SIGN IN</button>
                <p>Do not have an account?</p>
                <button className="register-button">REGISTER NOW</button>

        </form>
        </div>
    );
}

export default SignIn