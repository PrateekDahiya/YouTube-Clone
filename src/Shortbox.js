import React, { useState, useEffect } from "react";
import "./Shortbox.css";
import axios from "axios";
import Videoplayer from "./Videoplayer";

const Shortbox = (params) => {
    function formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + "M";
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + "K";
        } else {
            return num.toString();
        }
    }

    const [data, setData] = useState("");
    const [shorts, setShorts] = useState([]);
    const serverurl = process.env.REACT_APP_SERVER_URL;

    let crntshort = 4;

    useEffect(() => {
        const fetchShorts = async () => {
            if (params.data.shorts_vIds) {
                await axios
                    .get(
                        `${serverurl}/getvideobyid?video_id=` +
                            params.data.shorts_vIds[crntshort].video_id
                    )
                    .then((response) => {
                        setShorts(response.data);
                    })
                    .catch((error) => {
                        console.log("Error in fetching: ", error.message);
                    });
            }
        };
        fetchShorts();
    }, [crntshort, params.data.shorts_vIds]);

    const [i, seti] = useState(true);
    useEffect(() => {
        if (i === true && shorts.video) {
            const fetchstreamURL = async () => {
                await axios
                    .get(
                        `${serverurl}/get-stream-url?video_id=` +
                            (await shorts.video[0].video_id)
                    )
                    .then((response) => {
                        setData(response.data);
                    })
                    .catch((error) => {
                        console.log("Error in fetching: ", error.message);
                    });
            };
            fetchstreamURL();
            seti(false);
        }
    }, [i, shorts.video]);

    return (
        <div className="shortsbox">
            <Videoplayer type="short" streamUrl={data.streamUrl} />
            <div className="short-btns">
                <div className="shorts-btn">
                    <img
                        alt="short-btn"
                        src="https://cdn-icons-png.flaticon.com/128/739/739231.png"
                    />
                </div>
                <p>
                    {shorts.video
                        ? formatNumber(shorts.video[0].likes)
                        : "Like"}
                </p>

                <div className="shorts-btn">
                    <img
                        alt="short-btn"
                        src="https://cdn-icons-png.flaticon.com/128/880/880613.png"
                    />
                </div>
                <p>Dislike</p>

                <div className="shorts-btn">
                    <img
                        alt="short-btn"
                        src="https://cdn-icons-png.flaticon.com/128/12356/12356184.png"
                    />
                </div>
                <p>Comment</p>

                <div className="shorts-btn">
                    <img
                        alt="short-btn"
                        src="https://cdn-icons-png.flaticon.com/128/2958/2958791.png"
                    />
                </div>
                <p>Share</p>

                <div className="shorts-btn">
                    <img
                        alt="short-btn"
                        src="https://cdn-icons-png.flaticon.com/128/10826/10826552.png"
                    />
                </div>
                <p>More</p>

                <div className="profile-btn">
                    {shorts.video ? (
                        <img
                            alt="short-btn"
                            src={shorts.video[0].channel_icon}
                        />
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </div>
    );
};

export default Shortbox;
