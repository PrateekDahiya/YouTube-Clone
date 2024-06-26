import React, { useState, useEffect } from "react";
import Card from "./Card";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import Cardloading from "./Cardloading";
import "./Subscription.css";

const Subscription = (params) => {
    const [videos, setVideos] = useState([]);
    const [typeShort, setType] = useState(0);
    const serverurl = process.env.REACT_APP_SERVER_URL;
    const user_channel_id = Cookies.get("channel_id");

    useEffect(() => {
        const fetchData = async () => {
            await axios
                .get(
                    `${serverurl}/subscriptions?isShort=${typeShort}&user_id=${user_channel_id}`
                )
                .then((response) => {
                    setVideos(response.data);
                })
                .catch((error) => {
                    console.log("Error in fetching: ", error.message);
                });
        };
        fetchData();
    }, [typeShort]);

    return (
        <>
            {params.user !== "Guest" ? (
                <div className="subsbox">
                    <div className="heading">
                        <img
                            className="subsicon"
                            src="https://cdn-icons-png.flaticon.com/128/825/825636.png"
                            alt="Subscriptions"
                        />
                        <p className="subsheading">Subscriptions</p>
                    </div>
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
                    <div className="cards">
                        {videos.data ? (
                            videos.data.map((item) => (
                                <Card key={item.video_id} data={item} />
                            ))
                        ) : (
                            <></>
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
