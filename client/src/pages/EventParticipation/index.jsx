import { useEffect, useState } from "react";
import useParticipants from "../../hooks/useParticipants";
import { useData } from "../../hooks/useData";
import ParticipantCard from "../../components/ParticipantCard";
import { useParams } from "react-router-dom";

const EventParticipation = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const { participants, fetchParticipants } = useParticipants({ eventId });
  const [filteredParticipants, setFilteredParticipants] =
    useState(participants);
  const { getEvent } = useData();

  useEffect(() => {
    const filtered = participants.filter(
      (participant) =>
        participant.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        participant.email.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredParticipants(filtered);
  }, [searchTerm, participants]);

  useEffect(() => {
    fetchParticipants();
  }, [fetchParticipants]);

  useEffect(() => {
    getEvent(eventId).then((data) => setEvent(data));
  }, [eventId, getEvent]);

  if (!participants) {
    return "Loading...";
  }

  return (
    <div>
      <h2>Event Participants</h2>
      {event ? (
        <div>
          <p>
            <strong>Title:</strong> {event.title}
          </p>
          <p>
            <strong>Description:</strong> {event.description}
          </p>
          <p>
            <strong>Date:</strong> {new Date(event.date).toLocaleString()}
          </p>
          <p>
            <strong>Organizer:</strong> {event.organizer}
          </p>
        </div>
      ) : null}
      <br />

      <input
        type="text"
        name="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={"Search by name or email"}
        className="border border-gray-300 px-3 py-2 w-full rounded-md"
      />
      {filteredParticipants.length ? (
        <div className="flex flex-wrap justify-center">
          {filteredParticipants.map((participant) => (
            <div
              key={participant.email}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
            >
              <ParticipantCard participant={participant} />
            </div>
          ))}
        </div>
      ) : (
        <div>No participants yet</div>
      )}
    </div>
  );
};

export default EventParticipation;
