import { useState } from "react";

const EventSorting = ({ onSort }) => {
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const handleSortChange = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const handleSort = () => {
    onSort({ key: sortKey, order: sortOrder });
  };

  return (
    <div className="my-4">
      <button
        onClick={() => handleSortChange("title")}
        className={`bg-blue-500 text-white font-semibold py-2 px-4 rounded mr-2 ${sortKey === "title" && sortOrder === "asc" && "bg-blue-700"}`}
      >
        Sort by Title
      </button>
      <button
        onClick={() => handleSortChange("date")}
        className={`bg-blue-500 text-white font-semibold py-2 px-4 rounded mr-2 ${sortKey === "date" && sortOrder === "asc" && "bg-blue-700"}`}
      >
        Sort by Event Date
      </button>
      <button
        onClick={() => handleSortChange("organizer")}
        className={`bg-blue-500 text-white font-semibold py-2 px-4 rounded mr-2 ${sortKey === "organizer" && sortOrder === "asc" && "bg-blue-700"}`}
      >
        Sort by Organizer
      </button>
      <button
        onClick={handleSort}
        className="bg-green-500 text-white font-semibold py-2 px-4 rounded"
      >
        Apply Sorting
      </button>
    </div>
  );
};

export default EventSorting;
