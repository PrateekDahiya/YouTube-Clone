import Card from "./Card";
import "./Home.css";

const Home = (params) => {
    const handleClick = (video) => {
        window.location.href = "watch/" + video;
    };

    return (
        <div className="cards">
            {params.data.map((item) => (
                <Card
                    key={item.video_id}
                    data={item}
                    onClick={() => handleClick(item.video_id)}
                />
            ))}
        </div>
    );
};

export default Home;
