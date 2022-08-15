import React from "react";
import mapImg from "./map.jpg";
import "./MapCard.scss";

const MapCard = ({ item }) => {
    const handleClick = () => {
        console.log(item.id);
    };

    return (
        <div className="card">
            <h2 className="title">{item.title}</h2>
            <button className="btn--close">×</button>
            <img src={mapImg} alt="img" className="image" />
            <button className="btn--detail" onClick={handleClick}>
                View Detail
            </button>
        </div>
    );
};

export default MapCard;
