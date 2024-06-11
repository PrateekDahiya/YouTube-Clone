import React, { useState, useEffect } from "react";
import Card from "./Card";
import "./Category.css";

const Category = (params) => {
    const apiUrl = process.env.SERVER_URL;

    function Heading(string) {
        if (!string) return "";
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const [typeShort, setType] = useState(0);
    const [data, setdata] = useState([]);

    const fetchData = async () => {
        const response = await fetch(
            `${apiUrl}/category` + window.location.search + "&type=" + typeShort
        );
        const result = await response.json();
        setdata(result);
        console.log(result);
    };

    useEffect(() => {
        fetchData();
    }, [typeShort]);

    const handleClick = (video, isShort) => {
        window.location.href =
            (isShort ? "shorts?video_id=" : "shorts?video_id=") + video;
    };

    return (
        <div className="categorybox">
            <div className="heading">
                <img className="caticon" src={data.caticon} alt="category" />
                <p className="catheading">{Heading(data.category)}</p>
            </div>
            <div className="menus">
                <p
                    className={
                        "menubutton " + (typeShort === 0 ? "active" : "")
                    }
                    onClick={() => {
                        setType(0);
                    }}
                >
                    Videos
                </p>
                <p
                    className={
                        "menubutton " + (typeShort === 1 ? "active" : "")
                    }
                    onClick={() => {
                        setType(1);
                    }}
                >
                    Shorts
                </p>
            </div>
            <div>
                <hr></hr>
            </div>
            {data.videos ? (
                <div className="catvideos">
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
        </div>
    );
};

export default Category;
