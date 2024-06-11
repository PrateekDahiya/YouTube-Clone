import React, { useState, useEffect } from "react";
import "./Shortbox.css";
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
    const apiUrl = process.env.SERVER_URL;

    const fetchstreamURL = async () => {
        try {
            const getlink =
                `${apiUrl}/get-stream-url?video_id=` +
                (await shorts.video[0].video_id);
            const response = await fetch(getlink);
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    let crntshort = 1;

    const fetchShorts = async () => {
        try {
            const response = await fetch(
                `${apiUrl}/getvideobyid?video_id=` +
                    params.data.shorts_vIds[crntshort].video_id
            );
            const jsonData = await response.json();
            setShorts(jsonData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchShorts();
    }, []);

    useEffect(() => {
        fetchstreamURL();
    }, []);

    return (
        <>
            {shorts.video ? (
                <div className="shortsbox">
                    <Videoplayer type="short" streamUrl={data.streamUrl} />
                    <div className="short-btns">
                        <div className="shorts-btn">
                            <img
                                alt="short-btn"
                                src="https://cdn-icons-png.flaticon.com/128/739/739231.png"
                            />
                        </div>
                        <p>{formatNumber(shorts.video[0].likes)}</p>

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
                            <img
                                alt="short-btn"
                                src={shorts.video[0].channel_icon}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <h1>Loading...</h1>
            )}
        </>
    );
};

export default Shortbox;
