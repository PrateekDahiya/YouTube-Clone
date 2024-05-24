import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import Header from "./Header";
import Cardlist from "./Cardlist";
import "./App.css";

function App() {
    const [menu, setMenu] = useState("Full");
    const [cardpos, setcardpos] = useState("default");
    const toggleMenu = () => {
        if (menu === "Hidden") {
            setMenu("Full");
            setcardpos("default");
        } else {
            setMenu("Hidden");
            setcardpos("wider");
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
                <Cardlist cardposition={cardpos} />
            </div>
        </div>
    );
}

export default App;
