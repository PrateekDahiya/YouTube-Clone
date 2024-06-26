import { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
import { Link } from "react-router-dom";
import "./History.css";
import Cardloading from "./Cardloading";

const History = (params) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const serverurl = process.env.REACT_APP_SERVER_URL;

    const compareTimestamps = (timestamp) => {
        const currentTime = new Date();
        const givenTime = new Date(timestamp);
        const differenceInMillis = currentTime - givenTime;

        const differenceInHours = differenceInMillis / (1000 * 60 * 60);
        const differenceInDays = differenceInMillis / (1000 * 60 * 60 * 24);
        if (differenceInHours < 24) return "today";
        if (differenceInHours >= 24 && differenceInHours < 48)
            return "yesterday";
        if (differenceInDays >= 2 && differenceInDays < 7) return "week";
        if (differenceInDays >= 7 && differenceInDays < 30) return "thismonth";
        return "moremonth";
    };

    useEffect(() => {
        const storedHistory = JSON.parse(localStorage.getItem("history")) || [];

        const fetchHistoryData = async () => {
            if (storedHistory.length > 0) {
                try {
                    const videosData = await Promise.all(
                        storedHistory.map(async (item) => {
                            if (item.video_id) {
                                let vidData;
                                await axios
                                    .get(
                                        `${serverurl}/getvideobyid?video_id=${item.video_id}`
                                    )
                                    .then((response) => {
                                        vidData = response.data;
                                    })
                                    .catch((error) => {
                                        console.log(
                                            "Error in fetching: ",
                                            error.message
                                        );
                                    });
                                return {
                                    video: vidData.video[0],
                                    timestamp: item.timestamp,
                                };
                            }
                            console.warn("Invalid history item:", item);
                            return null;
                        })
                    );
                    setData(videosData.filter((item) => item !== null));
                } catch (error) {
                    console.error("Error fetching history data:", error);
                }
            }
            setLoading(false);
        };
        fetchHistoryData();
    }, [serverurl]);

    const renderCardsByTime = (timeCategory) => {
        return data
            .filter(
                (item) => compareTimestamps(item.timestamp) === timeCategory
            )
            .map((item) => (
                <Card key={item.video.video_id} data={item.video} />
            ));
    };

    const categories = [
        { title: "Today", category: "today" },
        { title: "Yesterday", category: "yesterday" },
        { title: "This Week", category: "week" },
        { title: "This Month", category: "thismonth" },
        { title: "Older", category: "moremonth" },
    ];

    return (
        <>
            {params.user !== "Guest" ? (
                <>
                    {loading ? (
                        <></>
                    ) : (
                        <div className="history-outerbox">
                            <h1>Watch History</h1>
                            {categories.map(({ title, category }) => {
                                const cards = renderCardsByTime(category);
                                return cards.length > 0 ? (
                                    <div key={category}>
                                        <h2>{title}</h2>
                                        <div className="historycards">
                                            {cards}
                                        </div>
                                    </div>
                                ) : null;
                            })}
                        </div>
                    )}
                </>
            ) : (
                <div className="guestuser">
                    <img
                        className="bigicon"
                        src="https://cdn-icons-png.flaticon.com/128/3503/3503786.png"
                        alt="subscriptions"
                    />
                    <h2>Keep track of what you watch</h2>
                    <h3>Watch history isn't viewable when signed out.</h3>
                    <Link to="/login" style={{ textDecoration: "none" }}>
                        <button className="sign_in">
                            <img
                                className="guesticon"
                                src="https://cdn-icons-png.flaticon.com/128/1077/1077063.png"
                                alt="user"
                            />
                            Sign In
                        </button>
                    </Link>
                </div>
            )}
        </>
    );
};

export default History;
