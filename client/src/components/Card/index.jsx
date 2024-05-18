import { Link } from "react-router-dom";

const Card = ({ title, description, date, organizer, id }) => {
  // Convert ISO date string to Date object
  const eventDate = new Date(date);
  // Format date to local time
  const formattedDate = eventDate.toLocaleString();

  return (
    <div className="w-full bg-white rounded-lg overflow-hidden shadow-md">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-6 py-4">
        <p className="text-gray-700">Date: {formattedDate}</p>
        <p className="text-gray-700">Organizer: {organizer}</p>
      </div>
      <div className="px-6 py-4 flex justify-between">
        <Link to={`/event-registration/${id}`}>Register</Link>
        <Link to={`/event-participations/${id}`}>View</Link>
      </div>
    </div>
  );
};

export default Card;
