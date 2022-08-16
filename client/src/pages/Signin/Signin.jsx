import React from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import googleLogo from "../../assets/images/google.png";
import "./Signin.scss";
// import GoogleLogin from "react-google-login";

// const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const Signin = () => {
    return (
        <>
            <Header />
            <form className="signin__form">
                <div className="signin__container">
                    <h2 className="signin__heading">Sign in</h2>
                    <a
                        href="http://mindnet.me:4242/authentication/federated/google"
                        className="signin__login"
                    >
                        <img
                            src={googleLogo}
                            alt="img"
                            className="signin__logo"
                        />
                        <p className="signin__text"> Sign in with Google</p>
                    </a>
                </div>
            </form>
            <Footer />
        </>
    );
};

export default Signin;
