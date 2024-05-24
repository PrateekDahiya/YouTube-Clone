import React, { useContext, useEffect } from "react";
import { ThemeContext, ThemeProvider } from "./ThemeContext.js";
import "./Header.css";
import "./themes.css";

const Header = (params) => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);
    return (
        <div className="head">
            <div className="iconntitle">
                <button className="toggle-menu" onClick={params.onClick}>
                    <img
                        src="https://cdn-icons-png.flaticon.com/128/1828/1828859.png"
                        alt="toggle-menu"
                    />
                </button>
                <img
                    src="https://cdn-icons-png.flaticon.com/128/1384/1384060.png"
                    alt="youtube"
                />
                <p>YouTube</p>
            </div>
            <div className="search">
                <input type="text" placeholder="Search" className="search" />
                <button className="searchbutton">
                    <img
                        src="https://cdn-icons-png.flaticon.com/128/2811/2811806.png"
                        alt="search"
                    />
                </button>
            </div>
            <div className="profile">
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
                    className="toogle-theme"
                    src="https://cdn-icons-png.flaticon.com/128/12377/12377255.png"
                    alt="Toogle Theme"
                    onClick={toggleTheme}
                />
                <img
                    className="profilepic"
                    src="https://wallpapercave.com/wp/wp6892456.jpg"
                    alt="Profile"
                />
            </div>
        </div>
    );
};

export default Header;
