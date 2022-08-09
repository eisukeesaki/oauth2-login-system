import React from "react";
import "./Header.scss";

const Header = () => {
    const navbarItem = ["New Mindmap", "Mind list", "Log out"];

    return (
        <header className="header">
            <h1 className="heading">MindNet</h1>
            <ul className="navBar">
                {navbarItem.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </header>
    );
};

export default Header;
