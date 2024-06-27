import React, { useState, useEffect } from "react";
import Card from "./Card";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Subscription.css";

const Subscription = (params) => {
    const [videos, setVideos] = useState([]);
    const [typeShort, setType] = useState(0);
    const [categorizedVideos, setCategorizedVideos] = useState({
        today: [],
        yesterday: [],
        lastWeek: [],
        lastMonth: [],
    });
    const [previousVideos, setPreviousVideos] = useState([]);
    const serverurl = process.env.REACT_APP_SERVER_URL;
    const user = params.user;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${serverurl}/subscriptions?isShort=${typeShort}&user_id=${user.channel_id}`
                );
                setVideos(response.data);
            } catch (error) {
                console.log("Error in fetching: ", error.message);
            }
        };
        fetchData();
    }, [typeShort, user.channel_id, serverurl, user]);

    useEffect(() => {
        const updateCategorizedVideos = async () => {
            if (videos.data) {
                const categorized = await categorizeVideos();
                setCategorizedVideos(categorized);
                setPreviousVideos(videos.data); // Set all previous videos
            }
        };

        updateCategorizedVideos();
    }, [videos]);

    // Function to categorize videos by upload_date
    const categorizeVideos = async () => {
        const today = [];
        const yesterday = [];
        const lastWeek = [];
        const lastMonth = [];

        // Get current date
        const currentDate = new Date();

        // Iterate through videos and categorize based on upload_date
        videos.data.forEach((item) => {
            const uploadDate = new Date(item.upload_time);
            const timeDiff = Math.abs(currentDate - uploadDate);
            const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

            if (daysDiff === 0) {
                today.push(item);
            } else if (daysDiff === 1) {
                yesterday.push(item);
            } else if (daysDiff > 1 && daysDiff <= 7) {
                lastWeek.push(item);
            } else if (daysDiff > 7 && daysDiff <= 30) {
                lastMonth.push(item);
            }
        });

        // Return categorized videos
        return { today, yesterday, lastWeek, lastMonth };
    };

    return (
        <>
            {params.user !== "Guest" ? (
                <div className="subsbox">
                    <div className="menus">
                        <p
                            className={
                                "menubutton " +
                                (typeShort === 0 ? "active" : "")
                            }
                            onClick={() => {
                                setType(0);
                            }}
                        >
                            Videos
                        </p>
                        <p
                            className={
                                "menubutton " +
                                (typeShort === 1 ? "active" : "")
                            }
                            onClick={() => {
                                setType(1);
                            }}
                        >
                            Shorts
                        </p>
                    </div>
                    <div className="subs">
                        {/* Display categorized videos */}
                        {categorizedVideos.today.length > 0 && (
                            <div className="time-box">
                                <h3>Today</h3>
                                <div className="cards subs">
                                    {categorizedVideos.today.map((item) => (
                                        <Card key={item.video_id} data={item} />
                                    ))}
                                </div>
                            </div>
                        )}
                        {categorizedVideos.yesterday.length > 0 && (
                            <div className="time-box">
                                <h3>Yesterday</h3>
                                <div className="cards subs">
                                    {categorizedVideos.yesterday.map((item) => (
                                        <Card key={item.video_id} data={item} />
                                    ))}
                                </div>
                            </div>
                        )}
                        {categorizedVideos.lastWeek.length > 0 && (
                            <div className="time-box">
                                <h3>Last Week</h3>
                                <div className="cards subs">
                                    {categorizedVideos.lastWeek.map((item) => (
                                        <Card key={item.video_id} data={item} />
                                    ))}
                                </div>
                            </div>
                        )}
                        {categorizedVideos.lastMonth.length > 0 && (
                            <div className="time-box">
                                <h3>Last Month</h3>
                                <div className="cards subs">
                                    {categorizedVideos.lastMonth.map((item) => (
                                        <Card key={item.video_id} data={item} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Display all previous videos */}
                        {previousVideos.length > 0 && (
                            <div className="time-box">
                                <h3>Old Videos</h3>
                                <div className="cards subs">
                                    {previousVideos.map((item) => (
                                        <Card key={item.video_id} data={item} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="guestuser">
                    <img
                        className="bigicon"
                        src="https://cdn-icons-png.flaticon.com/128/2989/2989849.png"
                        alt="subscriptions"
                    />
                    <h2>Don't miss new videos</h2>
                    <h3>
                        Sign in to see updates from your favorite YouTube
                        channels
                    </h3>
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

export default Subscription;
