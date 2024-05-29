import React from "react";
import "./Yourchannel.css";

const Yourchannel = (params) => {
    return (
        <div className="outer">
            <div className="info">
                <img
                    className="mypic"
                    alt="Profile"
                    src="https://wallpapercave.com/wp/wp6892456.jpg"
                />
                <div className="details">
                    <p className="name">Beast Boy Shub</p>
                    <p className="id">@beastboyshub</p>
                    <p>
                        more about this channel...<b>more</b>
                    </p>
                    <div className="buttons">
                        <button className="customizechannel">
                            Customize channel
                        </button>
                        <button className="managevideos">Manage videos</button>
                    </div>
                </div>
            </div>
            <div className="menus">
                <p>Home</p>
                <p>Playlists</p>
                <img
                    alt="searchchannel"
                    src="https://cdn-icons-png.flaticon.com/128/2811/2811806.png"
                />
            </div>
            <div className="videos"></div>
        </div>
    );
};

export default Yourchannel;
