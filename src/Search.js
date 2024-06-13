import { useEffect, useState } from "react";
import Card from "./Card";
import "./Search.css";

const Search = () => {
    const [data, setData] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const getreq = `/search` + window.location.search;
                const response = await fetch(getreq);
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const handleClick = async (video, isShort) => {
        window.location.href =
            ((await isShort) ? "shorts?video_id=" : "watch?video_id=") + video;
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

export default Search;
