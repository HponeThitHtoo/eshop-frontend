import React from "react";

import styles from "../../styles/styles";

import EventCard from "./EventCard";
import { useSelector } from "react-redux";

const Events = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);

  return (
    <div>
      {!isLoading && (
        <div className={`${styles.section}`}>
          <div className={`${styles.heading}`}>
            <h1>Popular Events</h1>
          </div>

          <div className="w-full grid">
            {allEvents?.length !== 0 && (
              <EventCard data={allEvents && allEvents[0]} />
            )}
            {allEvents?.length === 0 && <h4>No Event Have!</h4>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
