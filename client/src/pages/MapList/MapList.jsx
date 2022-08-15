import React from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import MapCard from "../../Components/MapCard/MapCard";
import "./MapList.scss";

const mapListDummyData = [
    { id: 1, title: "Tommy" },
    { id: 2, title: "John" },
    { id: 3, title: "Mike" },
    { id: 4, title: "Angel" },
    { id: 5, title: "Nick" },
];

const MapList = () => {
    return (
        <>
            <Header />
            <div className="main">
                {mapListDummyData.map((item, index) => (
                    <MapCard key={item.id} item={item} />
                ))}
            </div>
            <Footer />
        </>
    );
};

export default MapList;
