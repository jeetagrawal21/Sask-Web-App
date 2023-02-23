import '../../stylings/RegisterPageStyles/Text.css';

function Text() {
  return (
    <div className="register">
      <form>
        {/* Textfield to enter surname */}
        <div>
          <input placeholder="Enter your surname" id="surname"></input>
        </div>

        {/* Textfield to enter Given name 1 */}
        <div>
          <input placeholder="Enter your Given Name 1" id="givenName1"></input>
        </div>

        {/* Textfield to enter Given name 2 */}
        <div>
          <input placeholder="Enter your Given Name 2" id="givenName2"></input>
        </div>

        {/* Textfield to enter email */}
        <div>
          <input placeholder="Enter your email" id="email"></input>
        </div>

        {/* Textfield to enter password */}
        <div>
          <input placeholder="Enter your password" id="password"></input>
        </div>

        {/* Textfield to confirm password */}
        <div>
          <input
            placeholder="Confirm your password"
            id="confirm-password"
          ></input>
        </div>

        {/* Textfield to enter First security question */}
        <div>
          <input
            placeholder="Enter security question 1"
            id="securityQuestion1"
          ></input>
        </div>

        {/* Textfield to enter First security answer */}
        <div>
          <input
            placeholder="Enter security answer 1"
            id="securityAnswer1"
          ></input>
        </div>

        {/* Textfield to enter second security question */}
        <div>
          <input
            placeholder="Enter security question 2"
            id="securityQuestion2"
          ></input>
        </div>

        {/* Textfield to enter second security answer */}
        <div>
          <input
            placeholder="Enter security answer 2"
            id="securityAnswer2"
          ></input>
        </div>

        {/* Textfield to enter third security question */}
        <div>
          <input
            placeholder="Enter security question 3"
            id="securityQuestion3"
          ></input>
        </div>

        {/* Textfield to enter third security answer */}
        <div>
          <input
            placeholder="Enter security answer 3"
            id="securityAnswer3"
          ></input>
        </div>

        <div className="register-page-button-div">
          <button className="signin-button">REGISTER</button>
        </div>
      </form>
    </div>
  );
}

export default Text;
