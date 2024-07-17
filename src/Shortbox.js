import React, { useState, useEffect } from "react";
import "./Shortbox.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Shortplayer from "./Shortplayer";

const Shortbox = (params) => {
    const [data, setData] = useState("");
    const [shortdata, setShortdata] = useState(null);
    const [stream_url, setStream_url] = useState("");
    const [active, setActive] = useState(false);

    const serverurl = process.env.REACT_APP_SERVER_URL;
    function formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + "M";
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + "K";
        } else {
            return num.toString();
        }
    }

    useEffect(() => {
        if (params.short) {
            const fetchstreamURL = async () => {
                await axios
                    .get(
                        `https://flaskapp-ugds.onrender.com/get-short-url?video_id=` +
                            params.short.video_id
                    )
                    .then((response) => {
                        setData(response.data);
                    })
                    .catch((error) => {
                        console.log("Error in fetching: ", error.message);
                    });
            };
            fetchstreamURL();
        }
    }, [params.short.video_id]);

    useEffect(() => {
        setActive(params.active);
    }, [params.active, params]);

    useEffect(() => {
        setShortdata(params.short);
        setStream_url(data.stream_url || "");
    }, [data, params.short]);

    return (
        <div className="shortsbox">
            <Shortplayer type="short" streamUrl={stream_url} active={active} />
            <div className="short-btns">
                <div className="shorts-btn">
                    <img
                        alt="short-btn"
                        title="Like"
                        src="https://cdn-icons-png.flaticon.com/128/739/739231.png"
                    />
                </div>
                <p>{shortdata ? formatNumber(shortdata.likes) : "Like"}</p>

                <div className="shorts-btn">
                    <img
                        alt="short-btn"
                        title="Dislike"
                        src="https://cdn-icons-png.flaticon.com/128/880/880613.png"
                    />
                </div>
                <p>Dislike</p>

                <div className="shorts-btn">
                    <img
                        alt="short-btn"
                        title="Comment"
                        src="https://cdn-icons-png.flaticon.com/128/12356/12356184.png"
                    />
                </div>
                <p>Comment</p>

                <div className="shorts-btn">
                    <img
                        alt="short-btn"
                        title="Share"
                        src="https://cdn-icons-png.flaticon.com/128/2958/2958791.png"
                    />
                </div>
                <p>Share</p>

                <div className="shorts-btn">
                    <img
                        alt="short-btn"
                        title="More"
                        src="https://cdn-icons-png.flaticon.com/128/10826/10826552.png"
                    />
                </div>
                <p>More</p>

                <Link
                    to={
                        shortdata
                            ? `/channel?channel_id=${shortdata.channel_id}`
                            : ""
                    }
                    className="profile-btn"
                >
                    {shortdata ? (
                        <img
                            alt="short-btn"
                            title={shortdata.channel_name}
                            src={shortdata.channel_icon}
                        />
                    ) : (
                        ""
                    )}
                </Link>
            </div>
        </div>
    );
};

export default Shortbox;
