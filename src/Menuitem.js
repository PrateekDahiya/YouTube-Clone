import React from "react";
import "./Menuitem.css";

const Menuitem = (params) => {
    const handleClick = () => {
        window.location.href = params.head;
        params.onClick();
    };

    const itemClass = params.menu === "Hidden" ? "hiddenitem" : "item";
    const imgClass = params.profile ? "profileimg" : "defaultimg";

    return (
        <div
            className={params.isSelected ? `${itemClass} selected` : itemClass}
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
                            className={imgClass}
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
