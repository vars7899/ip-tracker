import { useState, useEffect } from "react";
import ReactMapGL, { Marker, FlyToInterpolator } from "react-map-gl";
import axios from "axios";
import { FaMapMarkerAlt } from "react-icons/fa";
import "./App.css";

function App() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [responseData, setResponseData] = useState([]);
    const [ip, setIp] = useState("");
    const [newIp, setNewIp] = useState("");
    const [viewport, setViewport] = useState({
        width: "100vw",
        height: "800px",
        latitude: 40.6326,
        longitude: -4.0011,
        zoom: 1,
    });

    const fetch_data = async () => {
        await axios.get(`http://ip-api.com/json/${newIp}`).then(
            async (res) => {
                setLoading(false);
                const myArray = await Object.values(res.data);
                await setResponseData(myArray);
                console.log(Object.values(responseData));
            },
            (error) => {
                setLoading(false);
                setError(error);
            }
        );
        // setViewport({
        //     ...viewport,
        //     longitude: responseData[8],
        //     latitude: responseData[7],
        //     zoom: 10,
        //     transitionInterpolator: new FlyToInterpolator({
        //         speed: 1.2,
        //     }),
        //     transitionDuration: "auto",
        // });
    };

    // 127.0.0.1
    useEffect(() => {
        fetch_data();
    }, [newIp]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setNewIp(ip);
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (loading) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="app">
                {console.log(responseData)}
                <div className="header">
                    <form onSubmit={handleSubmit}>
                        <input
                            className="ip-input"
                            type="text"
                            onChange={(e) => setIp(e.target.value)}
                            placeholder="Search for any IP address"
                        />
                    </form>
                    <div className="ip-info">
                        <div className="ip">
                            <p className="tittle">IP ADDRESS</p>
                            <p className="detail">{responseData[13]}</p>
                        </div>
                        <div className="ip">
                            <p className="tittle">TIMEZONE</p>
                            <p className="detail">{responseData[9]}</p>
                        </div>
                        <div className="ip">
                            <p className="tittle">LOCATION</p>
                            <p className="detail">
                                {responseData[5] +
                                    ", " +
                                    responseData[4] +
                                    ", " +
                                    responseData[1]}
                            </p>
                        </div>

                        <div className="ip">
                            <p className="tittle">ISP</p>
                            <p className="detail">{responseData[12]}</p>
                        </div>
                    </div>
                </div>
                <div className="map">
                    <ReactMapGL
                        {...viewport}
                        mapboxApiAccessToken={
                            "pk.eyJ1IjoidmFpYmhhdjc4OTkiLCJhIjoiY2tuejdjMGhsMDJqdDJ3bzU2Y2Q5aGJldCJ9.kQ9aXpd4fRYfBhMJ22kMHg"
                        }
                        transitionDuration="300"
                        onViewportChange={(viewport) => {
                            setViewport(viewport);
                        }}
                        mapStyle={
                            "mapbox://styles/vaibhav7899/cknz7prnw042917rmfryn7h9p"
                        }
                        // onChange={setViewport({
                        //     ...viewport,
                        //     longitude: responseData[8],
                        //     latitude: responseData[7],
                        //     zoom: 10,
                        //     transitionInterpolator: new FlyToInterpolator({
                        //         speed: 1.2,
                        //     }),
                        //     transitionDuration: "auto",
                        // })}
                    >
                        <Marker
                            latitude={responseData[7]}
                            longitude={responseData[8]}
                        >
                            <button className="marker-btn">
                                <FaMapMarkerAlt
                                    style={{
                                        fontSize: viewport.zoom * 7,
                                        color: "#fff",
                                    }}
                                />
                            </button>
                        </Marker>
                    </ReactMapGL>
                </div>
            </div>
        );
    }
}

export default App;
