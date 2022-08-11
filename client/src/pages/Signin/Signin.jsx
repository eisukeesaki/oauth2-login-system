import React from "react";
import GoogleLogin from "react-google-login";

const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const Signin = () => {
    return (
        <div>
            <GoogleLogin
                clientId={googleClientId}
                buttonText="Sign in with Google"
                // onSuccess={responseGoogle}
                // onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
            />
        </div>
    );
};

export default Signin;
