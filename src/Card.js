import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Card.css";

const Card = (params) => {
    const [linkto, setLinkto] = useState();

    const serverurl = process.env.REACT_APP_SERVER_URL;

    const addHistory = async () => {
        try {
            const video_id = params.data.video_id;
            let history = JSON.parse(localStorage.getItem("history")) || [];
            const existingIndex = history.findIndex(
                (item) => item.video_id === video_id
            );

            if (existingIndex !== -1) {
                history.splice(existingIndex, 1);
            }

            history.unshift({
                video_id: video_id,
                timestamp: new Date().toISOString(),
            });

            localStorage.setItem("history", JSON.stringify(history));
        } catch (error) {
            console.log(error);
        }
    };

    const handleClick = () => {
        addHistory();
    };

    const getDateDifference = (date1, date2) => {
        if (!date1 || !date2) return "";

        const differenceMs = Math.abs(date1 - date2);

        const millisecondsInSecond = 1000;
        const millisecondsInMinute = millisecondsInSecond * 60;
        const millisecondsInHour = millisecondsInMinute * 60;
        const millisecondsInDay = millisecondsInHour * 24;
        const millisecondsInWeek = millisecondsInDay * 7;
        const millisecondsInMonth = millisecondsInDay * 30;
        const millisecondsInYear = millisecondsInDay * 365;

        const years = Math.floor(differenceMs / millisecondsInYear);
        const months = Math.floor(differenceMs / millisecondsInMonth);
        const weeks = Math.floor(differenceMs / millisecondsInWeek);
        const days = Math.floor(differenceMs / millisecondsInDay);
        const hours = Math.floor(differenceMs / millisecondsInHour);
        const minutes = Math.floor(differenceMs / millisecondsInMinute);
        const seconds = Math.floor(differenceMs / millisecondsInSecond);

        let result = "";
        if (years > 0) {
            result += years + (years === 1 ? " year" : " years");
        } else if (months > 0) {
            result += months + (months === 1 ? " month" : " months");
        } else if (weeks > 0) {
            result += weeks + (weeks === 1 ? " week" : " weeks");
        } else if (days > 0) {
            result += days + (days === 1 ? " day" : " days");
        } else if (hours > 0) {
            result += hours + (hours === 1 ? " hour" : " hours");
        } else if (minutes > 0) {
            result += minutes + (minutes === 1 ? " minute" : " minutes");
        } else if (seconds > 0) {
            result += seconds + (seconds === 1 ? " second" : " seconds");
        }

        return result;
    };

    const formatNumber = (num) => {
        if (!num) return "";

        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + "M";
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + "K";
        } else {
            return num.toString();
        }
    };

    const formatDuration = (seconds) => {
        if (!seconds) return "";

        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        if (hours > 0) {
            return `${hours}:${minutes
                .toString()
                .padStart(2, "0")}:${remainingSeconds
                .toString()
                .padStart(2, "0")}`;
        } else {
            return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
        }
    };

    useEffect(() => {
        const setlink = async () => {
            setLinkto(
                ((await params.data.isShort) === 1
                    ? "/shorts?video_id="
                    : "/watch?video_id=") + params.data.video_id
            );
        };
        setlink();
    }, []);

    return (
        <Link to={linkto} onClick={handleClick} className="card">
            <img
                className="thumbnail"
                src={params.data.thumbnail_link || ""}
                alt={params.data.title || ""}
            />
            <span className="duration">
                {formatDuration(params.data.duration)}
            </span>
            <div className="info">
                <Link to={`channel?channel_id=${params.data.channel_id}`}>
                    <img
                        src={params.data.channel_icon || ""}
                        alt={params.data.channel_name || ""}
                    />
                </Link>
                <div className="text">
                    <p className="videotitle">
                        {params.data.title.length >= 100
                            ? params.data.title.substring(0, 50) + "..."
                            : params.data.title || ""}
                    </p>
                    <Link
                        className="channelname"
                        to={`/channel?channel_id=${params.data.channel_id}`}
                    >
                        {params.data.channel_name || ""}
                    </Link>
                    <div className="viewsntime">
                        <p className="views">
                            {formatNumber(params.data.views)} views &bull;
                        </p>
                        <p className="time">
                            {getDateDifference(
                                new Date(),
                                new Date(params.data.upload_time)
                            ) + " ago"}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Card;
