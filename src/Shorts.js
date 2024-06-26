import { useEffect, useState } from "react";
import Shortbox from "./Shortbox";
import axios from "axios";
import "./Shorts.css";

const Shorts = (params) => {
    const [shortdata, setShortdata] = useState([]);
    const serverurl = process.env.REACT_APP_SERVER_URL;

    useEffect(() => {
        const fetchShorts = async () => {
            if (window.location.search) {
                await axios
                    .get(`${serverurl}/shorts` + window.location.search)
                    .then((response) => {
                        setShortdata(response.data);
                    })
                    .catch((error) => {
                        console.log("Error in fetching: ", error.message);
                    });
            } else {
                await axios
                    .get(`${serverurl}/shorts`)
                    .then((response) => {
                        setShortdata(response.data);
                    })
                    .catch((error) => {
                        console.log("Error in fetching: ", error.message);
                    });
            }
        };
        fetchShorts();
    }, []);

    return (
        <div className="shorts-container">
            <Shortbox data={shortdata} />
        </div>
    );
};

export default Shorts;
