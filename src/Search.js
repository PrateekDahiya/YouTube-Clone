import { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
import Cardloading from "./Cardloading";
import "./Search.css";

const Search = () => {
    const [data, setData] = useState("");
    const serverurl = process.env.REACT_APP_SERVER_URL;

    useEffect(() => {
        const fetchData = async () => {
            await axios
                .get(`${serverurl}/search` + window.location.search)
                .then((response) => {
                    setData(response.data);
                })
                .catch((error) => {
                    console.log("Error in fetching: ", error.message);
                });
        };
        fetchData();
    }, []);

    return (
        <>
            {data.videos ? (
                <div className="cards">
                    {data.videos.map((item) => (
                        <Card key={item.video_id} data={item} />
                    ))}
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

export default Search;
