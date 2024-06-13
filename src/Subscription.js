import React, { useState, useEffect } from "react";
import Card from "./Card";
import "./Subscription.css";

const Subscription = (params) => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/subscriptions`);
            const result = await response.json();
            setVideos(result);
        };
        fetchData();
    }, []);

    const handleClick = async (video, isShort) => {
        window.location.href =
            ((await isShort) ? "shorts?video_id=" : "watch?video_id=") + video;
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
