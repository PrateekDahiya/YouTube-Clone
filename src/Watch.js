import React, { useState, useEffect } from "react";
import "./Watch.css";
import Videoplayer from "./Videoplayer";

const Watch = (params) => {
    const [data, setData] = useState("");

    const fetchData = async () => {
        try {
            const getlink = "/get-stream-url?videoId=" + params.video;
            const response = await fetch(getlink);
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <Videoplayer streamUrl={data.streamUrl} />
        </div>
    );
};

export default Watch;
