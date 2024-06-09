import React, { useEffect, useState } from "react";
import "./You.css";

const You = (params) => {
    const [data, setData] = useState("");
    const [videos, setVideos] = useState("");
    const [typeShort, setType] = useState(0);

    const fetchData = async () => {
        try {
            let getreq =
                "/yourchannel" + "?channel_id=UC0fcwXT_xgCBUuuczF-imLQ";
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

    function formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + "M";
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + "K";
        } else {
            return num.toString();
        }
    }

    function formatNumberWithCommas(number) {
        return number.toLocaleString();
    }

    const handleClick = (video) => {
        window.location.href = "watch/" + video;
    };

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

    function getshortinfo(str) {
        if (str.length <= 50) {
            return str;
        }
        const lastSpaceIndex = str.substring(0, 65).lastIndexOf(" ");
        return str.substring(0, lastSpaceIndex);
    }

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
