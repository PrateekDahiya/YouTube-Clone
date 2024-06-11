import React, { useState, useEffect, useCallback } from "react";
import Card from "./Card";
import "./Subscription.css";

const Subscription = (params) => {
    const [videos, setVideos] = useState([]);
    const apiUrl = process.env.SERVER_URL;

    const fetchData = useCallback(async () => {
        const response = await fetch(`${apiUrl}/subscriptions`);
        const result = await response.json();
        setVideos(result);
    }, [apiUrl]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleClick = (video, isShort) => {
        window.location.href =
            (isShort ? "shorts?video_id=" : "shorts?video_id=") + video;
    };
    return (
        <div className="subsbox">
            <div className="heading">
                <img
                    className="subsicon"
                    src="https://cdn-icons-png.flaticon.com/128/825/825636.png"
                    alt="Subscriptions"
                />
                <p className="subsheading">Subscriptions</p>
            </div>

            <div>
                <hr></hr>
            </div>
            <div className="subsvideos">
                {videos.data ? (
                    videos.data.map((item) => (
                        <Card
                            key={item.video_id}
                            data={item}
                            onClick={() =>
                                handleClick(item.video_id, item.isShort)
                            }
                        />
                    ))
                ) : (
                    <h1>Loading...</h1>
                )}
            </div>
        </div>
    );
};

export default Subscription;
