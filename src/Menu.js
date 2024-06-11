import React, { useState, useEffect } from "react";
import Menuitem from "./Menuitem";
import "./Menu.css";

function Menu(params) {
    const [subsdata, setsubsData] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);
    const apiUrl = process.env.SERVER_URL;

    const fetchsubs = async () => {
        try {
            const getlink = `${apiUrl}/get-subs/UC0fcwXT_xgCBUuuczF-imLQ`;
            const response = await fetch(getlink);
            const jsonData = await response.json();
            setsubsData(jsonData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchsubs();
    }, []);

    const handleItemClick = (title) => {
        setSelectedItem(title);
    };

    return (
        <div className="Menu">
            {params.menuStyle === "Hidden" ? (
                <div className="HiddenMenu">
                    <Menuitem
                        imgpath="https://cdn-icons-png.flaticon.com/128/1946/1946436.png"
                        title="Home"
                        head="/home"
                        menu="Hidden"
                        isSelected={selectedItem === "Home"}
                        // onClick={() => handleItemClick("Home")}
                    />
                    <Menuitem
                        imgpath="https://cdn-icons-png.flaticon.com/128/2989/2989849.png"
                        title="Subs"
                        head="/subscriptions/UC0fcwXT_xgCBUuuczF-imLQ"
                        menu="Hidden"
                        isSelected={selectedItem === "Subs"}
                        onClick={() => handleItemClick("Subs")}
                    />
                    <Menuitem
                        imgpath="https://cdn-icons-png.flaticon.com/128/456/456212.png"
                        title="You"
                        head="/me"
                        menu="Hidden"
                        isSelected={selectedItem === "You"}
                        onClick={() => handleItemClick("You")}
                    />
                </div>
            ) : (
                <div className="fullMenu">
                    <div className="menudiv">
                        <Menuitem
                            imgpath="https://cdn-icons-png.flaticon.com/128/1946/1946436.png"
                            title="Home"
                            head="/home"
                            isSelected={selectedItem === "Home"}
                            onClick={() => handleItemClick("Home")}
                        />
                        <Menuitem
                            imgpath="https://cdn-icons-png.flaticon.com/128/7264/7264012.png"
                            title="Shorts"
                            head="/shorts"
                            isSelected={selectedItem === "Shorts"}
                            onClick={() => handleItemClick("Home")}
                        />
                        <Menuitem
                            imgpath="https://cdn-icons-png.flaticon.com/128/2989/2989849.png"
                            title="Subscriptions"
                            head="/subscriptions"
                            isSelected={selectedItem === "Subscriptions"}
                            onClick={() => handleItemClick("Subscriptions")}
                        />
                    </div>
                    <div className="menudiv">
                        <Menuitem
                            title="You >"
                            head="/me"
                            isSelected={selectedItem === "You >"}
                            onClick={() => handleItemClick("You >")}
                        />
                        <Menuitem
                            imgpath="https://cdn-icons-png.flaticon.com/128/456/456212.png"
                            title="Your channel"
                            head="/yourchannel?channel_id=UC0fcwXT_xgCBUuuczF-imLQ"
                            isSelected={selectedItem === "Your channel"}
                            onClick={() => handleItemClick("Your channel")}
                        />
                        <Menuitem
                            imgpath="https://cdn-icons-png.flaticon.com/128/3503/3503786.png"
                            title="History"
                            head="/history"
                            isSelected={selectedItem === "History"}
                            onClick={() => handleItemClick("History")}
                        />
                        <Menuitem
                            imgpath="https://cdn-icons-png.flaticon.com/128/4043/4043797.png"
                            title="Playlists"
                            head="/playlists"
                            isSelected={selectedItem === "Playlists"}
                            onClick={() => handleItemClick("Playlists")}
                        />

                        <Menuitem
                            imgpath="https://cdn-icons-png.flaticon.com/128/15469/15469061.png"
                            title="Watch later"
                            head="/watchlater"
                            isSelected={selectedItem === "Watch later"}
                            onClick={() => handleItemClick("Watch later")}
                        />
                        <Menuitem
                            imgpath="https://cdn-icons-png.flaticon.com/128/126/126473.png"
                            title="Liked videos"
                            head="/likedvideos"
                            isSelected={selectedItem === "Liked videos"}
                            onClick={() => handleItemClick("Liked videos")}
                        />
                    </div>
                    <div className="menudiv">
                        <h3>Subscriptions</h3>
                        {subsdata.subscription ? (
                            subsdata.subscription.map((item) => (
                                <Menuitem
                                    key={item.channel_id}
                                    imgpath={item.channel_icon}
                                    title={item.channel_name}
                                    head={
                                        "/channel?channel_id=" + item.channel_id
                                    }
                                    profile={true}
                                    isSelected={
                                        selectedItem === item.channel_name
                                    }
                                    onClick={() =>
                                        handleItemClick(item.channel_name)
                                    }
                                />
                            ))
                        ) : (
                            <p>None</p>
                        )}
                    </div>
                    <div className="menudiv">
                        <h3>Explore</h3>
                        <Menuitem
                            imgpath="https://cdn-icons-png.flaticon.com/128/1946/1946485.png"
                            title="Trending"
                            head="/trending"
                            isSelected={selectedItem === "Trending"}
                            onClick={() => handleItemClick("Trending")}
                        />
                        <Menuitem
                            imgpath="https://cdn-icons-png.flaticon.com/128/2662/2662503.png"
                            title="Shopping"
                            head="/category?category=shopping"
                            isSelected={selectedItem === "Shopping"}
                            onClick={() => handleItemClick("Shopping")}
                        />
                        <Menuitem
                            imgpath="https://cdn-icons-png.flaticon.com/128/2995/2995035.png"
                            title="Music"
                            head="/category?category=music"
                            isSelected={selectedItem === "Music"}
                            onClick={() => handleItemClick("Music")}
                        />
                        <Menuitem
                            imgpath="https://cdn-icons-png.flaticon.com/128/1179/1179120.png"
                            title="Movies"
                            head="/category?category=movies"
                            isSelected={selectedItem === "Movies"}
                            onClick={() => handleItemClick("Movies")}
                        />
                        <Menuitem
                            imgpath="https://cdn-icons-png.flaticon.com/128/686/686589.png"
                            title="Gaming"
                            head="/category?category=gaming"
                            isSelected={selectedItem === "Gaming"}
                            onClick={() => handleItemClick("Gaming")}
                        />
                        <Menuitem
                            imgpath="https://cdn-icons-png.flaticon.com/128/1042/1042782.png"
                            title="News"
                            head="/category?category=news"
                            isSelected={selectedItem === "News"}
                            onClick={() => handleItemClick("News")}
                        />
                        <Menuitem
                            imgpath="https://cdn-icons-png.flaticon.com/128/1198/1198416.png"
                            title="Sports"
                            head="/category?category=sports"
                            isSelected={selectedItem === "Sports"}
                            onClick={() => handleItemClick("Sports")}
                        />
                        <Menuitem
                            imgpath="https://cdn-icons-png.flaticon.com/128/841/841743.png"
                            title="Courses"
                            head="/category?category=courses"
                            isSelected={selectedItem === "Courses"}
                            onClick={() => handleItemClick("Courses")}
                        />
                        <Menuitem
                            imgpath="https://cdn-icons-png.flaticon.com/128/3050/3050198.png"
                            title="Fashion & Beauty"
                            head="/category?category=fashionbeauty"
                            isSelected={selectedItem === "Fashion & Beauty"}
                            onClick={() => handleItemClick("Fashion & Beauty")}
                        />
                    </div>
                    <div className="menudiv">
                        <Menuitem
                            imgpath="https://cdn-icons-png.flaticon.com/128/2040/2040504.png"
                            title="Settings"
                            head="/settings"
                            isSelected={selectedItem === "Settings"}
                            onClick={() => handleItemClick("Settings")}
                        />
                        <Menuitem
                            imgpath="https://cdn-icons-png.flaticon.com/128/2814/2814368.png"
                            title="Report history"
                            head="/reporthistory"
                            isSelected={selectedItem === "Report history"}
                            onClick={() => handleItemClick("Report history")}
                        />
                        <Menuitem
                            imgpath="https://cdn-icons-png.flaticon.com/128/471/471664.png"
                            title="Help"
                            head="/help"
                            isSelected={selectedItem === "Help"}
                            onClick={() => handleItemClick("Help")}
                        />
                        <Menuitem
                            imgpath="https://cdn-icons-png.flaticon.com/128/813/813419.png"
                            title="Send feedback"
                            head="/sendfeedback"
                            isSelected={selectedItem === "Send feedback"}
                            onClick={() => handleItemClick("Send feedback")}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Menu;
