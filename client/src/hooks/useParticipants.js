// useParticipants.js

import { useState, useCallback } from "react";
import axios from "axios";

const useParticipants = ({ eventId }) => {
  const [participants, setParticipants] = useState([]);

  // Method to fetch participants for a specific event
  const fetchParticipants = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/participants/${eventId}`,
      );
      setParticipants(response.data);
    } catch (error) {
      console.error("Error fetching participants:", error);
    }
  }, [eventId]);

  const addParticipant = async (participantData) => {
    try {
      await axios.post("http://localhost:4000/participants", participantData);
      // If successful, update the participants state
      setParticipants((prevParticipants) => [
        ...prevParticipants,
        participantData,
      ]);
    } catch (error) {
      console.error("Error adding participant:", error);
    }
  };

  return { participants, fetchParticipants, addParticipant };
};

export default useParticipants;
