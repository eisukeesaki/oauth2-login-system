import React from "react";
import GoogleLogin from "react-google-login";

const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const Signin = () => {
    const responseGoogle = (res) => {
        console.log(res);
    };
    return (
        <div>
            <GoogleLogin
                clientId={googleClientId}
                buttonText="Sign in with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
                redirectUri={"http://localhost:3000"}
            />
        </div>
    );
};

export default Signin;
