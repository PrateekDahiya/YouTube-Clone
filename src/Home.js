import { useEffect, useState } from "react";
import Card from "./Card";
import "./Home.css";

const Home = (params) => {
    const [data, setData] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/home`);
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const handleClick = async (video, isShort) => {
        console.log(isShort);
        window.location.href =
            ((await isShort) === true
                ? "shorts?video_id="
                : "watch?video_id=") + video;
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
