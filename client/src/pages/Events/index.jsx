import { useEffect, useState, useRef } from "react";

import Card from "../../components/Card";
import { Link } from "react-router-dom";
import { useData } from "../../hooks/useData";
import EventSorting from "../../components/EventsSorting";

function Events() {
  const [sorting, setSorting] = useState({ key: null, order: null });
  const { isLoading, items, hasMore, fetchMoreData, reset } = useData();

  const observerTarget = useRef(null);

  useEffect(() => {
    if (!hasMore) {
      return null;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          fetchMoreData(sorting);
        }
      },
      { threshold: 1.0 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [fetchMoreData, isLoading, hasMore, sorting]);

  const handleSorting = (sorting) => {
    setSorting(sorting);
    reset();
  };

  return (
    <>
      <Link to={"add"}>Add project</Link>
      <EventSorting onSort={handleSorting} />

      <div className="flex flex-wrap justify-center">
        {items.map((item) => (
          <div key={item.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
            <div className="flex h-full">
              <Card {...item} />
            </div>
          </div>
        ))}
      </div>

      {hasMore ? <div ref={observerTarget}>Loading...</div> : null}
    </>
  );
}

export default Events;
