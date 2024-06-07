import React from "react";
import "./Card.css";
const Card = (params) => {
    function getDateDifference(date1, date2) {
        // Calculate the difference in milliseconds
        const differenceMs = Math.abs(date1 - date2);

        // Convert milliseconds to various time units
        const millisecondsInSecond = 1000;
        const millisecondsInMinute = millisecondsInSecond * 60;
        const millisecondsInHour = millisecondsInMinute * 60;
        const millisecondsInDay = millisecondsInHour * 24;
        const millisecondsInWeek = millisecondsInDay * 7;
        const millisecondsInMonth = millisecondsInDay * 30; // Approximate, for simplicity
        const millisecondsInYear = millisecondsInDay * 365; // Approximate, for simplicity

        // Calculate the difference in each unit
        const years = Math.floor(differenceMs / millisecondsInYear);
        const months = Math.floor(differenceMs / millisecondsInMonth);
        const weeks = Math.floor(differenceMs / millisecondsInWeek);
        const days = Math.floor(differenceMs / millisecondsInDay);
        const hours = Math.floor(differenceMs / millisecondsInHour);
        const minutes = Math.floor(differenceMs / millisecondsInMinute);
        const seconds = Math.floor(differenceMs / millisecondsInSecond);

        // Construct the result string
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
    }

    function formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + "M";
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + "K";
        } else {
            return num.toString();
        }
    }

    function formatDuration(seconds) {
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
    }

    return (
        <div className="card" onClick={() => params.onClick(params.data.link)}>
            <img
                className="thumbnail"
                src={params.data.thumbnail_link}
                alt={params.data.title}
            />
            <span className="duration">
                {formatDuration(params.data.duration)}
            </span>
            <div className="info">
                <img
                    src={params.data.channel_icon}
                    alt={params.data.channel_name}
                />
                <div className="text">
                    <p className="videotitle">{params.data.title}</p>
                    <p className="channelname">{params.data.channel_name}</p>
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
        </div>
    );
};

export default Card;
