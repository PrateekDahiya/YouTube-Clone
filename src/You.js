import React, { useEffect, useState } from "react";
import "./You.css";

const You = (params) => {
    const [data, setData] = useState("");
    const [videos, setVideos] = useState("");
    const [typeShort, setType] = useState(0);
    const apiUrl = process.env.SERVER_URL;

    const fetchData = async () => {
        try {
            let getreq =
                `${apiUrl}/yourchannel` +
                "?channel_id=UC0fcwXT_xgCBUuuczF-imLQ";
            const response = await fetch(getreq);
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // function formatNumber(num) {
    //     if (num >= 1000000) {
    //         return (num / 1000000).toFixed(1) + "M";
    //     } else if (num >= 1000) {
    //         return (num / 1000).toFixed(1) + "K";
    //     } else {
    //         return num.toString();
    //     }
    // }

    return (
        <>
            {data.channel ? (
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
                            <p
                                className="id"
                                onClick={() => {
                                    window.location.href =
                                        "/yourchannel?channel_id=UC0fcwXT_xgCBUuuczF-imLQ";
                                }}
                            >
                                {data.channel[0].custom_url}
                                {" • "}
                                view Channel
                            </p>

                            <div className="mebuttons">
                                <button className="switchaccount">
                                    Switch Account
                                </button>
                                <button className="gaccount">
                                    Google Account
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>loading...</p>
            )}
        </>
    );
};

export default You;
