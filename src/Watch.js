import React, { useState, useEffect, useCallback } from "react";
import "./Watch.css";
import Videoplayer from "./Videoplayer";

const Watch = (params) => {
    const [data, setData] = useState("");
    const [subs, setSubs] = useState("Subscribe");
    const [likestate, setlike] = useState("");
    const [watchdata, setwatchdata] = useState([]);

    const fetchstreamURL = useCallback(async () => {
        try {
            const getlink = `/get-stream-url` + window.location.search;
            const response = await fetch(getlink);
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, []);

    const fetchwatchdata = useCallback(async () => {
        try {
            const getlink = `/watch` + window.location.search;
            const response = await fetch(getlink);
            const jsonData = await response.json();
            setwatchdata(jsonData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, []);

    const handlesubclick = async () => {
        if (subs === "Subscribe") {
            setSubs("Subscribed");
        } else {
            setSubs("Subscribe");
        }
    };

    const handlelike = async (type) => {
        if (type === "like") {
            setlike("Liked");
        } else {
            setlike("Disliked");
        }
        console.log(likestate);
    };

    function formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + "M";
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + "K";
        } else {
            return num.toString();
        }
    }
    let i = 0;
    useEffect(() => {
        if (i === 0) {
            fetchstreamURL();
            params.onClick();
            i++;
        }
    }, [fetchstreamURL, i, params]);

    useEffect(() => {
        fetchwatchdata();
        params.onClick();
    }, [fetchwatchdata, params]);

    return (
        <>
            {watchdata.data && data ? (
                <div className="watchpage">
                    <div className="vplayer">
                        <Videoplayer streamUrl={data.streamUrl} type="video" />
                        <div className="video_info">
                            <p className="title">{watchdata.data[0].title}</p>
                            <div className="box">
                                <div className="boxpart1">
                                    <img
                                        className="channelicon"
                                        src={watchdata.data[0].channel_icon}
                                        alt="channel"
                                    />
                                    <div className="namensubs">
                                        <p>
                                            <b>
                                                {watchdata.data[0].channel_name}
                                            </b>
                                            <br></br>
                                            {formatNumber(
                                                watchdata.data[0].subscribers
                                            )}{" "}
                                            subscribers
                                        </p>
                                        <p></p>
                                    </div>
                                    <button
                                        className="subscribe_btn"
                                        onClick={() => {
                                            handlesubclick();
                                        }}
                                    >
                                        {subs}
                                    </button>
                                </div>
                                <div className="boxpart2">
                                    <button
                                        className="like_btn"
                                        onClick={() => {
                                            handlelike("like");
                                        }}
                                    >
                                        <img
                                            src="https://cdn-icons-png.flaticon.com/128/126/126473.png"
                                            alt="like"
                                        />
                                        {formatNumber(watchdata.data[0].likes)}
                                    </button>
                                    <button
                                        className="dislike_btn"
                                        onClick={() => {
                                            handlelike("dislike");
                                        }}
                                    >
                                        <img
                                            src="https://cdn-icons-png.flaticon.com/128/126/126504.png"
                                            alt="dislike"
                                        />
                                    </button>
                                    <button className="share_btn">
                                        <img
                                            src="https://cdn-icons-png.flaticon.com/128/2958/2958783.png"
                                            alt="share"
                                        />
                                        Share
                                    </button>
                                    <button className="download_btn">
                                        <img
                                            src="https://cdn-icons-png.flaticon.com/128/9131/9131795.png"
                                            alt="download"
                                        />
                                        Download
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="description">
                            <p>{watchdata.data[0].video_description}</p>
                        </div>
                    </div>
                    <div className="relatedvideos"></div>
                </div>
            ) : (
                <h1>Loading...</h1>
            )}
        </>
    );
};

export default Watch;
