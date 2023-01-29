import '../styles/Text.css'

function Text() {
    return(

        <div className="register">
            
            <form>

                {/* Textfield to enter full name */}
                <div>
                    <input placeholder="Enter your full name"></input>
                </div>

                {/* Textfield to enter email */}
                <div>
                    <input placeholder="Enter your email"></input>
                </div>

                {/* Textfield to enter password */}
                <div>
                    <input placeholder="Enter your password"></input>
                </div>


                {/* Textfield to confirm password */}
                <div>
                    <input placeholder="Confirm your password"></input>
                </div>


                <button>REGISTER</button>
        </form>
        </div>
    );
}

export default Text