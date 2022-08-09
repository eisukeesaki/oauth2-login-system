import React from "react";
import GoogleLogin from "react-google-login";

const Signin = () => {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    console.log(clientId);
    return (
        <div>
            hello
            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Login"
                // onSuccess={responseGoogle}
                // onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
            />
        </div>
    );
};

export default Signin;
