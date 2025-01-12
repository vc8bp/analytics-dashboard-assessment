import React, { useMemo, useState } from "react";
import { Map, Marker, Overlay } from "pigeon-maps";
import styles from "./Map.module.scss";

const PigeonMap = ({ data }) => {
    const [popupInfo, setPopupInfo] = useState(null);
    const [maxPoints, setMaxPoints] = useState(100); 
    const [currentPage, setCurrentPage] = useState(1);


    const locations = useMemo(() => data.map((row) => {
        const location = row["Vehicle Location"];
        if (location && location.startsWith("POINT")) {
            const [lng, lat] = location.replace("POINT (", "").replace(")", "").split(" ");         
            return {
                city: row.City,
                county: row.County,
                state: row.State,
                latitude: parseFloat(lat),
                longitude: parseFloat(lng),
            };
        }
        return null;
    }).filter(Boolean), [data])

    const totalPages = Math.ceil(locations.length / maxPoints);
    const paginatedLocations = locations.slice( (currentPage - 1) * maxPoints, currentPage * maxPoints );

    const handleMaxPointsChange = (event) => {
        setMaxPoints(Number(event.target.value));
        setCurrentPage(1); 
    };

    const handlePageChange = (direction) => {
        if (direction === "next" && currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        } else if (direction === "prev" && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.controls}>
                <div className={styles.details}>
                    <p>Total Points: {locations.length}</p>
                    <p>
                        Showing {Math.min(maxPoints, locations.length)} points per page
                    </p>
                </div>
                <div className={styles.actions}>
                    <label htmlFor="maxPoints" className={styles.label}>
                        Max Points:
                    </label>
                    <select
                        id="maxPoints"
                        value={maxPoints}
                        onChange={handleMaxPointsChange}
                        className={styles.select}
                    >
                        {[50, 100, 200, 500].map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            
            <div className={styles.note}>
                <p>
                    <strong>Note:</strong> The dataset has over 50,000 markers, and rendering them all at once caused major lag. To fix this, I added pagination and a dropdown to control how many markers show at a time. This keeps the map smooth and responsive while letting users explore the data easily without performance issues.
                </p>
            </div>

            <div className={styles.mapContainer}>
                <Map
                    height={"65vh"}
                    defaultCenter={[47.6062, -122.3321]}
                    defaultZoom={8}
                >
                    {paginatedLocations.map((location, index) => (
                        <Marker
                            key={index}
                            width={50}
                            anchor={[location.latitude, location.longitude]}
                            onClick={() => setPopupInfo(location)}
                        />
                    ))}

                    {popupInfo && (
                        <Overlay
                            anchor={[popupInfo.latitude, popupInfo.longitude]}
                            offset={[120, 79]}
                        >
                            <div className={styles.popup}>
                                <strong>City:</strong> {popupInfo.city} <br />
                                <strong>County:</strong> {popupInfo.county} <br />
                                <strong>State:</strong> {popupInfo.state}
                            </div>
                        </Overlay>
                    )}
                </Map>
            </div>

            <div className={styles.pagination}>
                <button onClick={() => handlePageChange("prev")} disabled={currentPage === 1} className={styles.button} >
                    Previous
                </button>
                <span> Page {currentPage} of {totalPages} </span>
                <button onClick={() => handlePageChange("next")} disabled={currentPage === totalPages} className={styles.button} >
                    Next
                </button>
            </div>


        </div>
    );
};

export default PigeonMap;
