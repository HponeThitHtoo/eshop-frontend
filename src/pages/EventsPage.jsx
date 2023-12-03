import React from "react";
import Header from "../components/Layout/Header";
import EventCard from "../components/Events/EventCard";
import Footer from "../components/Layout/Footer";
import { useSelector } from "react-redux";

const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);

  return (
    <div>
      <Header activeHeading={4} />
      {!isLoading &&
        allEvents.map((event) => (
          <EventCard key={event._id} active={true} data={event} />
        ))}
      <Footer />
    </div>
  );
};

export default EventsPage;
