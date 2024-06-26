import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import Menu from "./Menu";
import Header from "./Header";
import Home from "./Home";
import Shorts from "./Shorts";
import You from "./You";
import Watch from "./Watch";
import Subscription from "./Subscription";
import Yourchannel from "./Yourchannel";
import Channel from "./Channel";
import Category from "./Category";
import Search from "./Search";
import Login from "./Login";
import History from "./History";

import "./App.css";

function App() {
    const [crntuser, setCrntuser] = useState(
        Cookies.get("username") || "Guest"
    );
    const [menutype, setMenutype] = useState("Full");
    const [toggle, clickedtoggle] = useState(0);
    const [login, setlogin] = useState(false);
    const toggleMenu = (action) => {
        setMenutype(action);
        clickedtoggle((prev) => prev + 1);
    };

    useEffect(() => {
        setCrntuser(Cookies.get("username") || "Guest");
    }, [Cookies.get("username")]);

    return (
        <Router>
            <div className="App">
                <Header onClick={toggleMenu} user={crntuser} />

                <div className="menuncontent">
                    <div className="menu">
                        <Menu
                            menu={menutype}
                            togglecount={toggle}
                            user={crntuser}
                        />
                    </div>

                    <div className="content">
                        <Routes>
                            <Route
                                path="/"
                                element={<Home user={crntuser} />}
                            />
                            <Route
                                path="/home"
                                element={<Home user={crntuser} />}
                            />
                            <Route path="/search" element={<Search />} />
                            <Route
                                path="/shorts"
                                element={<Shorts user={crntuser} />}
                            />
                            <Route
                                path="/me"
                                element={<You user={crntuser} />}
                            />
                            <Route
                                path="/watch"
                                element={
                                    <Watch
                                        onClick={toggleMenu}
                                        user={crntuser}
                                    />
                                }
                            />
                            <Route
                                path="/yourchannel"
                                element={<Yourchannel user={crntuser} />}
                            />
                            <Route
                                path="/channel"
                                element={<Channel user={crntuser} />}
                            />
                            <Route
                                path="/subscriptions"
                                element={<Subscription user={crntuser} />}
                            />
                            <Route
                                path="/category"
                                element={<Category user={crntuser} />}
                            />
                            <Route
                                path="/history"
                                element={<History user={crntuser} />}
                            />
                            <Route
                                path="/login"
                                element={<Login onClick={toggleMenu} />}
                            />

                            <Route
                                path="*"
                                element={
                                    <>
                                        <h1>Error 404</h1>
                                        <h2>Page Not Found</h2>
                                    </>
                                }
                            />
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
