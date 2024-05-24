import React from "react";
import "./Menuitem.css";

const Menuitem = (params) => {
    const handleClick = () => {
        window.location.href = params.head;
    };
    return (
        <div
            className={params.menu === "Hidden" ? "hiddenitem" : "item"}
            onClick={handleClick}
        >
            {params.imgpath !== undefined ? (
                params.menu === "Hidden" ? (
                    <div className="hiddenitem">
                        <img
                            src={params.imgpath}
                            alt={params.title}
                            className="hiddenimg"
                        />
                        <p>{params.title}</p>
                    </div>
                ) : (
                    <>
                        <img
                            src={params.imgpath}
                            alt={params.title}
                            className={
                                params.profile ? "profileimg" : "defaultimg"
                            }
                        />
                        <p>{params.title}</p>
                    </>
                )
            ) : (
                <h2 onClick={handleClick}>{params.title}</h2>
            )}
        </div>
    );
};

export default Menuitem;
