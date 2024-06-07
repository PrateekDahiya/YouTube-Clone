import React, { useState, useEffect } from "react";
import Card from "./Card";
import "./Category.css";

const Category = (params) => {
    const handleClick = (video) => {
        window.location.href = "watch/" + video;
    };

    function Heading(string) {
        if (!string) return "";
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const [data, setdata] = useState([]);

    const fetchData = async () => {
        const response = await fetch("/category" + window.location.search);
        const result = await response.json();
        setdata(result);
        console.log(result);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="categorybox">
            <div className="heading">
                <img className="caticon" src={data.caticon} alt="category" />
                <p className="catheading">{Heading(data.category)}</p>
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
                            onClick={() => handleClick(item.video_id)}
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
