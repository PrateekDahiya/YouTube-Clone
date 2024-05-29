import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import Header from "./Header";
import Home from "./Home";
import Watch from "./Watch";
import Yourchannel from "./Yourchannel";
import "./App.css";

function App() {
    const [menu, setMenu] = useState("Full");
    const toggleMenu = () => {
        if (menu === "Hidden") {
            setMenu("Full");
            const cardElements = document.querySelectorAll(".wider");
            cardElements.forEach((element) => {
                element.className = "card";
            });
        } else {
            setMenu("Hidden");
            const cardElements = document.querySelectorAll(".card");
            cardElements.forEach((element) => {
                element.className = "wider";
            });
        }
    };

    const [data, setData] = useState("");
    const [crntpage, setcrntpage] = useState("");

    const fetchData = async () => {
        try {
            const path = window.location.pathname;
            const response = await fetch(path);
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        setcrntpage(data.page);
    }, [data]);

    return (
        <div className="App">
            <Header onClick={toggleMenu} />
            <div className="menuncontent">
                <Menu menuStyle={menu} />
                {crntpage === "home" ? (
                    <Home data={data.videos} />
                ) : crntpage === "watch" ? (
                    <Watch video={data.video_id} />
                ) : crntpage === "yourchannel" ? (
                    <Yourchannel />
                ) : (
                    <p>Happy</p>
                )}
            </div>
        </div>
    );
}

export default App;
