import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./Menu";
import Header from "./Header";
import Home from "./Home";
import Shorts from "./Shorts";
import Watch from "./Watch";
import Subscription from "./Subscription";
import Yourchannel from "./Yourchannel";
import Channel from "./Channel";
import Category from "./Category";

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
    return (
        <div className="App">
            <Header onClick={toggleMenu} />
            <div className="menuncontent">
                <Menu menuStyle={menu} />
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/shorts" element={<Shorts />} />
                        <Route
                            path="/watch"
                            element={<Watch onClick={toggleMenu} />}
                        />
                        <Route path="/yourchannel" element={<Yourchannel />} />
                        <Route path="/channel" element={<Channel />} />
                        <Route
                            path="/subscriptions"
                            element={<Subscription />}
                        />
                        <Route path="/category" element={<Category />} />
                        <Route
                            element={
                                <>
                                    <h1>Error 404</h1>
                                    <h2>Page Not Found</h2>
                                </>
                            }
                        />
                    </Routes>
                </Router>
            </div>
        </div>
    );
}

export default App;
