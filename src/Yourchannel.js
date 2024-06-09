import React, { useEffect, useState } from "react";
import "./Yourchannel.css";
import Card from "./Card";

const Yourchannel = (params) => {
    const [data, setData] = useState("");
    const [videos, setVideos] = useState("");
    const [typeShort, setType] = useState(0);

    const fetchData = async () => {
        try {
            let getreq = "/yourchannel" + window.location.search;
            const response = await fetch(getreq);
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchVideos = async () => {
        try {
            let getreq =
                "/getvideosofchannel" +
                window.location.search +
                "&type=" +
                typeShort;
            const response = await fetch(getreq);
            const jsonData = await response.json();
            setVideos(jsonData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        fetchVideos();
    }, [typeShort]);

    function formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + "M";
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + "K";
        } else {
            return num.toString();
        }
    }

    function formatNumberWithCommas(number) {
        return number.toLocaleString();
    }

    const handleClick = (video, isShort) => {
        window.location.href =
            (isShort ? "shorts?video_id=" : "shorts?video_id=") + video;
    };

    function formatISODate(isoDate) {
        const date = new Date(isoDate);
        const options = { year: "numeric", month: "short", day: "numeric" };
        return date.toLocaleDateString("en-US", options);
    }
    function show_moredesc() {
        let x = document.querySelector(".moredesc");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }

    function close_moredesc() {
        let x = document.querySelector(".moredesc");
        if (x.style.display === "block") {
            x.style.display = "none";
        } else {
            x.style.display = "block";
        }
    }

    function getshortinfo(str) {
        if (str.length <= 50) {
            return str;
        }
        const lastSpaceIndex = str.substring(0, 65).lastIndexOf(" ");
        return str.substring(0, lastSpaceIndex);
    }

    return (
        <>
            {data.channel && videos.videos ? (
                <div className="outer">
                    {data.channel[0].channel_banner !== "N/A" ? (
                        <div className="banner">
                            <img
                                alt="channel_banner"
                                src={data.channel[0].channel_banner}
                            />
                        </div>
                    ) : (
                        ""
                    )}
                    <div className="channelinfo">
                        <img
                            className="mypic"
                            alt="Profile"
                            src={data.channel[0].channel_icon}
                        />
                        <div className="details">
                            <p className="name">
                                {data.channel[0].channel_name}
                            </p>
                            <p className="id">
                                {data.channel[0].custom_url}
                                {" • "}
                                {formatNumber(data.channel[0].subscribers)}
                                {" subscribers • "}
                                {formatNumber(data.channel[0].video_count)}
                                {" videos"}
                            </p>
                            <p
                                className="desc"
                                onClick={() => {
                                    show_moredesc();
                                }}
                            >
                                {getshortinfo(data.channel[0].short_desc)}...
                                <b>more</b>
                            </p>
                            <div className="moredesc">
                                <p className="deschead">
                                    About
                                    <span
                                        className="close-btn"
                                        onClick={() => {
                                            close_moredesc();
                                        }}
                                    >
                                        X
                                    </span>
                                </p>
                                <p className="descdata">
                                    {data.channel[0].short_desc}
                                </p>
                                <p className="deschead">Channel details</p>
                                <p className="descdata">
                                    <img
                                        alt="datashow"
                                        src="https://cdn-icons-png.flaticon.com/128/900/900782.png"
                                    />
                                    /channel?channel_id=
                                    {data.channel[0].channel_id}
                                </p>
                                <p className="descdata">
                                    <img
                                        alt="datashow"
                                        src="https://cdn-icons-png.flaticon.com/128/825/825636.png"
                                    />
                                    {formatNumber(data.channel[0].subscribers)}{" "}
                                    subscribers
                                </p>
                                <p className="descdata">
                                    <img
                                        alt="datashow"
                                        src="https://cdn-icons-png.flaticon.com/128/1179/1179120.png"
                                    />
                                    {formatNumber(data.channel[0].video_count)}
                                    {""}
                                    videos
                                </p>
                                <p className="descdata">
                                    <img
                                        alt="datashow"
                                        src="https://cdn-icons-png.flaticon.com/128/3742/3742162.png"
                                    />
                                    {formatNumberWithCommas(
                                        data.channel[0].total_views
                                    )}{" "}
                                    views
                                </p>
                                <p className="descdata">
                                    <img
                                        alt="datashow"
                                        src="https://cdn-icons-png.flaticon.com/128/2342/2342329.png"
                                    />
                                    Joined{" "}
                                    {formatISODate(
                                        data.channel[0].date_created
                                    )}
                                </p>
                                <p className="descdata">
                                    <img
                                        alt="datashow"
                                        src="https://cdn-icons-png.flaticon.com/128/2838/2838912.png"
                                    />
                                    {data.channel[0].location}
                                </p>
                            </div>
                            <div className="subbuttons">
                                <button className="subscribe">Subscribe</button>
                                <button className="join">Join</button>
                            </div>
                        </div>
                    </div>
                    <div className="menus">
                        <p
                            className={
                                "menubutton " +
                                (typeShort === 0 ? "active" : "")
                            }
                            onClick={() => {
                                setType(0);
                            }}
                        >
                            Videos
                        </p>
                        <p
                            className={
                                "menubutton " +
                                (typeShort === 1 ? "active" : "")
                            }
                            onClick={() => {
                                setType(1);
                            }}
                        >
                            Shorts
                        </p>
                        <p className="menubutton">Search Channel</p>
                        <input type="text" placeholder="Search" />
                        <img
                            alt="searchchannel"
                            src="https://cdn-icons-png.flaticon.com/128/2811/2811806.png"
                        />
                    </div>
                    <div className="videos">
                        {videos.videos.map((item) => (
                            <Card
                                key={item.video_id}
                                data={item}
                                onClick={() =>
                                    handleClick(item.video_id, item.isShort)
                                }
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <p>loading...</p>
            )}
        </>
    );
};

export default Yourchannel;
