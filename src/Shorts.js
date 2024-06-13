import { useEffect, useState } from "react";
import Shortbox from "./Shortbox";
import "./Shorts.css";

const Shorts = (params) => {
    const [shortdata, setShortdata] = useState([]);

    useEffect(() => {
        const fetchShorts = async () => {
            if (window.location.search) {
                const response = await fetch(
                    `/shorts` + window.location.search
                );
                const data = await response.json();
                setShortdata(data);
            } else {
                const response = await fetch("/shorts");
                const data = await response.json();
                setShortdata(data);
            }
        };
        fetchShorts();
    }, []);

    return (
        <div className="shorts-container">
            {shortdata.shorts_vIds ? (
                <Shortbox data={shortdata} />
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default Shorts;
