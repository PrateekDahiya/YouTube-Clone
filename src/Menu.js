import Menuitem from "./Menuitem";
import "./Menu.css";

function Menu(params) {
    return (
        <div className="Menu">
            {params.menuStyle === "Hidden" ? (
                <div className="HiddenMenu">
                    <Menuitem
                        imgpath="https://cdn-icons-png.flaticon.com/128/1946/1946436.png"
                        title="Home"
                        head="/home"
                        menu="Hidden"
                    />
                    <Menuitem
                        imgpath="https://cdn-icons-png.flaticon.com/128/2989/2989849.png"
                        title="Subs"
                        head="/subscriptions"
                        menu="Hidden"
                    />
                    <Menuitem
                        imgpath="https://cdn-icons-png.flaticon.com/128/456/456212.png"
                        title="You"
                        head="/me"
                        menu="Hidden"
                    />
                </div>
            ) : (
                <div className="fullMenu">
                    <div className="menudiv">
                        <Menuitem
                            imgpath="https://cdn-icons-png.flaticon.com/128/1946/1946436.png"
                            title="Home"
                            head="/home"
                        />

                        <Menuitem
                            imgpath="https://cdn-icons-png.flaticon.com/128/2989/2989849.png"
                            title="Subscriptions"
                            head="/subscriptions"
                        />
                    </div>
                    <div className="menudiv">
                        <Menuitem title="You >" head="/me" />
                        <Menuitem
                            imgpath="https://cdn-icons-png.flaticon.com/128/456/456212.png"
                            title="Your channel"
                            head="/yourchannel"
                        />
                        <Menuitem
                            imgpath="https://cdn-icons-png.flaticon.com/128/3503/3503786.png"
                            title="History"
                            head="/history"
                        />
                        <Menuitem
                            imgpath="https://cdn-icons-png.flaticon.com/128/4043/4043797.png"
                            title="Playlists"
                            head="/playlists"
                        />
                        <Menuitem
                            imgpath="https://cdn-icons-png.flaticon.com/128/2991/2991195.png"
                            title="Your videos"
                            head="/yourvideos"
                        />
                        <Menuitem
                            imgpath="https://cdn-icons-png.flaticon.com/128/15469/15469061.png"
                            title="Watch later"
                            head="/watchlater"
                        />
                        <Menuitem
                            imgpath="https://cdn-icons-png.flaticon.com/128/126/126473.png"
                            title="Liked videos"
                            head="/likedvideos"
                        />
                    </div>
                    <div className="menudiv">
                        <h3>Subscriptions</h3>
                        <Menuitem
                            imgpath="https://wallpapercave.com/wp/wp6892456.jpg"
                            title="BeastBoyShub"
                            head="/beastboyshub"
                            profile={true}
                        />
                    </div>
                    <div className="menudiv">
                        <h3>Explore</h3>
                        <Menuitem
                            imgpath="https://cdn-icons-png.flaticon.com/128/1946/1946485.png"
                            title="Trending"
                            head="/trending"
                        />
                        <Menuitem
                            imgpath="https://cdn-icons-png.flaticon.com/128/2662/2662503.png"
                            title="Shopping"
                            head="/shopping"
                        />
                        <Menuitem
                            imgpath="https://cdn-icons-png.flaticon.com/128/2995/2995035.png"
                            title="Music"
                            head="/music"
                        />
                        <Menuitem
                            imgpath="https://cdn-icons-png.flaticon.com/128/1179/1179120.png"
                            title="Movies"
                            head="/movies"
                        />
                        <Menuitem
                            imgpath="https://cdn-icons-png.flaticon.com/128/2989/2989838.png"
                            title="Live"
                            head="/live"
                        />
                        <Menuitem
                            imgpath="https://cdn-icons-png.flaticon.com/128/686/686589.png"
                            title="Gaming"
                            head="/gaming"
                        />
                        <Menuitem
                            imgpath="https://cdn-icons-png.flaticon.com/128/1042/1042782.png"
                            title="News"
                            head="/news"
                        />
                        <Menuitem
                            imgpath="https://cdn-icons-png.flaticon.com/128/1198/1198416.png"
                            title="Sports"
                            head="/sports"
                        />
                        <Menuitem
                            imgpath="https://cdn-icons-png.flaticon.com/128/841/841743.png"
                            title="Courses"
                            head="/courses"
                        />
                        <Menuitem
                            imgpath="https://cdn-icons-png.flaticon.com/128/3050/3050198.png"
                            title="Fashion & Beauty"
                            head="/fasionbeauty"
                        />
                        <Menuitem
                            imgpath="https://cdn-icons-png.flaticon.com/128/15867/15867998.png"
                            title="Podcasts"
                            head="/podcasts"
                        />
                    </div>
                    <div className="menudiv">
                        <Menuitem
                            imgpath="https://cdn-icons-png.flaticon.com/128/2040/2040504.png"
                            title="Settings"
                            head="/settings"
                        />
                        <Menuitem
                            imgpath="https://cdn-icons-png.flaticon.com/128/2814/2814368.png"
                            title="Report history"
                            head="/reporthistory"
                        />
                        <Menuitem
                            imgpath="https://cdn-icons-png.flaticon.com/128/471/471664.png"
                            title="Help"
                            head="/help"
                        />
                        <Menuitem
                            imgpath="https://cdn-icons-png.flaticon.com/128/813/813419.png"
                            title="Send feedback"
                            head="/sendfeedback"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Menu;
