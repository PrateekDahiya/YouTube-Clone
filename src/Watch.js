import React, { useState, useEffect } from "react";
import "./Watch.css";
import axios from "axios";
import Videoplayer from "./Videoplayer";
import Cardloading from "./Cardloading";

const Watch = (params) => {
    const [data, setData] = useState("");
    const [subs, setSubs] = useState("Subscribe");
    const [likestate, setlike] = useState("");
    const [watchdata, setwatchdata] = useState([]);
    const serverurl = process.env.REACT_APP_SERVER_URL;

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
    const [i, seti] = useState(true);
    useEffect(() => {
        if (i === true) {
            const fetchstreamURL = async () => {
                await axios
                    .get(`${serverurl}/get-stream-url` + window.location.search)
                    .then((response) => {
                        setData(response.data);
                    })
                    .catch((error) => {
                        console.log("Error in fetching: ", error.message);
                    });
            };
            params.onClick("hidden");
            fetchstreamURL();
            seti(false);
        }
    }, [i]);

    useEffect(() => {
        const fetchwatchdata = async () => {
            await axios
                .get(`${serverurl}/watch` + window.location.search)
                .then((response) => {
                    setwatchdata(response.data);
                })
                .catch((error) => {
                    console.log("Error in fetching: ", error.message);
                });
        };
        fetchwatchdata();
    }, []);

    return (
        <>
            {watchdata.data ? (
                <div className="watchpage">
                    <div className="vplayer">
                        <div className="video-player">
                            <Videoplayer
                                streamUrl={data ? data.streamUrl : ""}
                                type="video"
                            />
                        </div>

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
                <Cardloading page="watch" />
            )}
        </>
    );
};

export default Watch;
