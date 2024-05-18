import { useState, useCallback } from "react";
import axios from "axios";

const LIMIT = 12;

export const useData = () => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [offset, setOffset] = useState(0);

  const fetchMoreData = (sorting) => {
    setIsLoading(true);
    setIsError(false);

    axios
      .get(
        `http://localhost:4000/events?offset=${offset}&limit=${LIMIT}&sortKey=${sorting.key}&sortOrder=${sorting.order}`,
      )
      .then((res) => {
        setItems((prevItems) => [...prevItems, ...res.data]);

        res.data.length > 0 ? setHasMore(true) : setHasMore(false);
        setIsLoading(false);
        setOffset(offset + LIMIT);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setIsError(true);
      });
  };

  const getEvent = useCallback((eventId) => {
    return axios.get(`http://localhost:4000/events/${eventId}`).then((res) => {
      return res.data;
    });
  }, []);

  const reset = () => {
    setOffset(0);
    setItems([]);
    setIsLoading(false);
    setIsError(false);
    setHasMore(true);
  };

  return {
    isError,
    isLoading,
    items,
    hasMore,
    fetchMoreData,
    reset,
    getEvent,
  };
};
