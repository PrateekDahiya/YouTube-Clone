import React from "react";
import "./Videoplayer.css";

const VideoPlayer = (params) => {
    document.addEventListener("DOMContentLoaded", function () {
        var video = document.getElementById("myVideo");

        video.muted = false;
        var playPromise = video.play();

        if (playPromise !== undefined) {
            playPromise
                .then(function () {})
                .catch(function (error) {
                    console.log(
                        "Autoplay with sound was prevented. Trying to mute the video and play again."
                    );

                    video.muted = true;
                    video.play();
                });
        }
    });

    return (
        <div>
            <video
                className={params.type === "video" ? "video" : "short"}
                src={params.streamUrl}
                autoPlay
                controls
                muted={false}
                loop={params.type === "short" ? true : false}
                preload="auto"
            />
        </div>
    );
};

export default VideoPlayer;
