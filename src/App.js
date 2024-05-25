import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import Header from "./Header";
import Cardlist from "./Cardlist";
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

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch("/name");
            const jsonData = await response.json();
            setData(jsonData);
            console.log(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="App">
            <Header onClick={toggleMenu} />
            <div className="menuncontent">
                <Menu menuStyle={menu} />
                <Cardlist />
            </div>
        </div>
    );
}

export default App;
