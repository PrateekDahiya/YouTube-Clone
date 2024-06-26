import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Channel.css";
import axios from "axios";
import Card from "./Card";
import Cardloading from "./Cardloading";

const Channel = (params) => {
    const locationHook = useLocation();
    const [data, setData] = useState("");
    const [videos, setVideos] = useState("");
    const [query, setQuery] = useState("");
    const [typeShort, setType] = useState(0);
    const [refresh, setrefresh] = useState(0);
    const serverurl = process.env.REACT_APP_SERVER_URL;
    const [channel, setChannel] = useState(
        new URLSearchParams(locationHook.search).get("channel_id")
    );
    useEffect(() => {
        const currentChannel = new URLSearchParams(locationHook.search).get(
            "channel_id"
        );
        setChannel(currentChannel);
    }, [locationHook]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let getreq = `${serverurl}/channel?channel_id=` + channel;
                const response = await fetch(getreq);
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [typeShort, channel]);

    function refreshdata() {
        setrefresh(refresh + 1);
    }

    useEffect(() => {
        const fetchVideos = async () => {
            await axios
                .get(
                    `${serverurl}/getvideosofchannel` +
                        window.location.search +
                        "&type=" +
                        typeShort +
                        "&query=" +
                        query
                )
                .then((response) => {
                    setVideos(response.data);
                })
                .catch((error) => {
                    console.log("Error in fetching: ", error.message);
                });
        };
        fetchVideos();
    }, [typeShort, refresh, channel]);

    function formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + "M";
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + "K";
        } else {
            return num.toString();
        }
    }

    function getshortinfo(str) {
        if (str.length <= 50) {
            return str;
        }
        const lastSpaceIndex = str.substring(0, 65).lastIndexOf(" ");
        return str.substring(0, lastSpaceIndex);
    }

    function formatNumberWithCommas(number) {
        return number.toLocaleString();
    }

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
                                    {formatNumber(data.channel[0].video_count)}{" "}
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

                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search"
                            className="channelsearch"
                        />
                        <button
                            onClick={() => {
                                refreshdata();
                            }}
                            className="chlsearchbtn"
                        >
                            <img
                                alt="searchchannel"
                                src="https://cdn-icons-png.flaticon.com/128/2811/2811806.png"
                            />
                        </button>
                    </div>
                    <div className="videos">
                        {videos.videos.map((item) => (
                            <Card key={item.video_id} data={item} />
                        ))}
                    </div>
                </div>
            ) : (
                <Cardloading page="channel" />
            )}
        </>
    );
};

export default Channel;
