import React from "react";
import "./Videoplayer.css";

const Videoplayer = (params) => {
    return (
        <div>
            <video
                className="video"
                src="https://videos.pexels.com/video-files/4549682/4549682-hd_1920_1080_30fps.mp4"
                controls
            />
        </div>
    );
};

export default Videoplayer;
