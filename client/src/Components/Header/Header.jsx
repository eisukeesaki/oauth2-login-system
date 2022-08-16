import React from "react";
import "./Header.scss";

const Header = () => {
    const navbarItem = ["New Mindmap", "Map list", "Log out"];

    return (
        <header className="header">
            <h1 className="heading">MindNet</h1>
            <ul className="navBar">
                {navbarItem.map((item, index) => (
                    <li className="navItem" key={index}>
                        {item}
                    </li>
                ))}
            </ul>
        </header>
    );
};

export default Header;
