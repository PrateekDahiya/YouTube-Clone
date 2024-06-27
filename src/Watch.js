import React, { useState, useEffect } from "react";
import "./Watch.css";
import axios from "axios";
import Videoplayer from "./Videoplayer";
import Cardloading from "./Cardloading";

const Watch = (params) => {
    const [data, setData] = useState("");
    const [isliked, setisliked] = useState(false);
    const [isdisliked, setIsdisliked] = useState(false);
    const [watchdata, setwatchdata] = useState([]);
    const serverurl = process.env.REACT_APP_SERVER_URL;
    const user = params.user;
    const [issubed, setissubed] = useState(false);
    const [channel_id, setChannel_id] = useState(null);
    const [video_id, setVideo_id] = useState(null);
    const [user_chl_id, setUser_chl_id] = useState(null);

    function formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + "M";
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + "K";
        } else {
            return num.toString();
        }
    }

    const addSubscriber = async () => {
        const requestData = {
            user_chl_id,
            channel_id,
        };

        const response = await axios.post(
            `${serverurl}/addtosubs`,
            requestData
        );
        console.log("Response Data:", response.data);
        setissubed(true);
    };

    const unsub = async () => {
        const requestData = {
            user_chl_id,
            channel_id,
        };

        const response = await axios.post(
            `${serverurl}/removefromsubs`,
            requestData
        );
        console.log("Response Data:", response.data);

        setissubed(false);
    };

    const addlike = async () => {
        const requestData = {
            user_id: user_chl_id,
            video_id,
        };

        const response = await axios.post(
            `${serverurl}/addtoliked`,
            requestData
        );
        console.log("Response Data:", response.data);
        setisliked(true);
    };

    const removelike = async () => {
        const requestData = {
            user_id: user_chl_id,
            video_id,
        };

        const response = await axios.post(
            `${serverurl}/removefromliked`,
            requestData
        );
        console.log("Response Data:", response.data);

        setisliked(false);
    };

    useEffect(() => {
        const issubscribed = async () => {
            const response = await axios.get(
                `${serverurl}/issub?user_id=${user_chl_id}&channel_id=${channel_id}`
            );
            setissubed(response.data.sub);
        };

        const isliked = async () => {
            const response = await axios.get(
                `${serverurl}/isliked?user_id=${user_chl_id}&video_id=${video_id}`
            );
            setisliked(response.data.liked);
        };

        isliked();
        issubscribed();
    }, [user_chl_id, channel_id, video_id]);

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
                    setwatchdata(response.data.data[0]);
                    console.log(watchdata);
                })
                .catch((error) => {
                    console.log("Error in fetching: ", error.message);
                });
        };
        fetchwatchdata();
    }, [user]);

    useEffect(() => {
        setUser_chl_id(user.channel_id);
        setChannel_id(watchdata.channel_id);
        setVideo_id(watchdata.video_id);
    }, [user, watchdata]);

    return (
        <>
            {watchdata && data ? (
                <div className="watchpage">
                    <div className="vplayer">
                        <div className="video-player">
                            <Videoplayer
                                streamUrl={data ? data.streamUrl : ""}
                                type="video"
                            />
                        </div>

                        <div className="video_info">
                            <p className="title">{watchdata.title}</p>
                            <div className="box">
                                <div className="boxpart1">
                                    <img
                                        className="channelicon"
                                        src={watchdata.channel_icon}
                                        alt="channel"
                                    />
                                    <div className="namensubs">
                                        <p>
                                            <b>{watchdata.channel_name}</b>
                                            <br></br>
                                            {formatNumber(
                                                watchdata.subscribers
                                            )}{" "}
                                            subscribers
                                        </p>
                                        <p></p>
                                    </div>
                                    <button
                                        className={
                                            issubed
                                                ? "subscribe ed"
                                                : "subscribe"
                                        }
                                        onClick={() => {
                                            issubed ? unsub() : addSubscriber();
                                        }}
                                    >
                                        {issubed ? "Subscribed" : "Subscribe"}
                                    </button>
                                </div>
                                <div className="boxpart2">
                                    <button
                                        className="like_btn"
                                        onClick={() => {
                                            if (isliked) {
                                                removelike();
                                            } else {
                                                addlike();
                                                if (isdisliked) {
                                                    setIsdisliked(false);
                                                }
                                            }
                                        }}
                                    >
                                        {isliked ? (
                                            <img
                                                src="https://cdn-icons-png.flaticon.com/128/739/739231.png"
                                                alt="liked"
                                            />
                                        ) : (
                                            <img
                                                src="https://cdn-icons-png.flaticon.com/128/126/126473.png"
                                                alt="like"
                                            />
                                        )}
                                        {formatNumber(watchdata.likes)}
                                    </button>
                                    <button
                                        className="dislike_btn"
                                        onClick={() => {
                                            if (isdisliked) {
                                                setIsdisliked(false);
                                            } else {
                                                setIsdisliked(true);
                                                if (isliked) {
                                                    removelike();
                                                }
                                            }
                                        }}
                                    >
                                        {isdisliked ? (
                                            <img
                                                src="https://cdn-icons-png.flaticon.com/128/880/880613.png"
                                                alt="disliked"
                                            />
                                        ) : (
                                            <img
                                                src="https://cdn-icons-png.flaticon.com/128/126/126504.png"
                                                alt="dislike"
                                            />
                                        )}
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
                            <p>{watchdata.video_description}</p>
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
