import { useEffect, useState, useCallback } from "react";
import Card from "./Card";
import "./Home.css";

const Home = (params) => {
    const [data, setData] = useState("");
    const fetchData = useCallback(async () => {
        try {
            const response = await fetch(`/home`);
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleClick = (video, isShort) => {
        window.location.href =
            (isShort ? "shorts?video_id=" : "shorts?video_id=") + video;
    };

    return (
        <>
            {data.videos ? (
                <div className="cards">
                    {data.videos.map((item) => (
                        <Card
                            key={item.video_id}
                            data={item}
                            onClick={() =>
                                handleClick(item.video_id, item.isShort)
                            }
                        />
                    ))}
                </div>
            ) : (
                <p>Loading..</p>
            )}
        </>
    );
};

export default Home;
