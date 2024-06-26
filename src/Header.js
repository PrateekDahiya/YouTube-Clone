import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ThemeContext } from "./ThemeContext.js";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import "./Header.css";
import "./themes.css";

const Header = (params) => {
    const locationHook = useLocation();
    const [query, setQuery] = useState("");
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [page, setPage] = useState(locationHook.pathname);
    const user_channel_icon = Cookies.get("channel_icon");

    useEffect(() => {
        const currentpage = locationHook.pathname;
        setPage(currentpage);
    }, [locationHook]);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (query !== "") window.location.href = "/search?query=" + query;
    };

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    return (
        <div className="head">
            <div className="iconntitle">
                <button
                    className="toggle-menu"
                    onClick={() => {
                        params.onClick(
                            page === "/login" || page === "/watch"
                                ? "toggle2"
                                : "toggle1"
                        );
                    }}
                >
                    <img
                        src="https://cdn-icons-png.flaticon.com/128/1828/1828859.png"
                        alt="toggle-menu"
                    />
                </button>
                <Link to="/" className="youtube-btn">
                    <img
                        src="https://cdn-icons-png.flaticon.com/128/1384/1384060.png"
                        alt="youtube"
                    />
                    <p>YouTube</p>
                </Link>
            </div>
            <div className="search">
                <form
                    onSubmit={(e) => {
                        handleSearch(e);
                    }}
                >
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search"
                        className="search"
                    />
                    <button type="submit" className="searchbutton">
                        <img
                            src="https://cdn-icons-png.flaticon.com/128/2811/2811806.png"
                            alt="search"
                        />
                    </button>
                </form>
            </div>
            <div className="profile">
                <img
                    className="toogle-theme"
                    src="https://cdn-icons-png.flaticon.com/128/12377/12377255.png"
                    alt="Toogle Theme"
                    onClick={toggleTheme}
                />
                <div className="login-profile">
                    {params.user !== "Guest" ? (
                        <>
                            <img
                                className="create"
                                src="https://cdn-icons-png.flaticon.com/128/4189/4189286.png"
                                alt="Create"
                            />
                            <img
                                className="notifications"
                                src="https://cdn-icons-png.flaticon.com/128/2645/2645890.png"
                                alt="Notifications"
                            />
                            <img
                                className="profilepic"
                                src={user_channel_icon}
                                alt="Profile"
                            />
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                style={{ textDecoration: "none" }}
                            >
                                <button className="sign_in">
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/128/1077/1077063.png"
                                        alt="user"
                                    />
                                    Sign In
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
