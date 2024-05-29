import React from "react";
import "./Videoplayer.css";

const VideoPlayer = (params) => {
    return (
        <div>
            <video
                className="video"
                src={params.streamUrl}
                controls
                autoFocus
                autoPlay
                muted
            />
        </div>
    );
};

export default VideoPlayer;
