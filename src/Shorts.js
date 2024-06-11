import { useEffect, useState, useCallback } from "react";
import Shortbox from "./Shortbox";
import "./Shorts.css";

const Shorts = (params) => {
    const [shortdata, setShortdata] = useState([]);

    const fetchShorts = useCallback(async () => {
        if (window.location.search) {
            const response = await fetch(`/shorts` + window.location.search);
            const data = await response.json();
            setShortdata(data);
        } else {
            const response = await fetch("/shorts");
            const data = await response.json();
            setShortdata(data);
        }
    }, []);

    useEffect(() => {
        fetchShorts();
    }, [fetchShorts]);

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
