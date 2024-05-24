import React from "react";
import "./Card.css";
const Card = (params) => {
    function getDateDifference(date1, date2) {
        // Calculate the difference in milliseconds
        const differenceMs = Math.abs(date1 - date2);

        // Convert milliseconds to various time units
        const millisecondsInDay = 1000 * 60 * 60 * 24;
        const millisecondsInWeek = millisecondsInDay * 7;
        const millisecondsInMonth = millisecondsInDay * 30; // Approximate, for simplicity
        const millisecondsInYear = millisecondsInDay * 365; // Approximate, for simplicity

        // Calculate the difference in days, weeks, months, and years
        const days = Math.floor(differenceMs / millisecondsInDay);
        const weeks = Math.floor(differenceMs / millisecondsInWeek);
        const months = Math.floor(differenceMs / millisecondsInMonth);
        const years = Math.floor(differenceMs / millisecondsInYear);

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

    return (
        <div>
            <div className="card">
                <img
                    className="thumbnail"
                    src={params.data.thumbnail}
                    alt={params.data.title}
                />
                <div className="info">
                    <img src={params.data.cicon} alt={params.data.cname} />
                    <div className="text">
                        <p className="videotitle">{params.data.title}</p>
                        <p className="channelname">{params.data.cname}</p>
                        <div className="viewsntime">
                            <p className="views">
                                {formatNumber(params.data.views)} views &bull;
                            </p>
                            <p className="time">
                                {getDateDifference(
                                    new Date(),
                                    new Date(params.data.time)
                                ) + " ago"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
