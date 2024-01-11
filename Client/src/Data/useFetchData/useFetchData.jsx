import { useState, useEffect } from "react";

export const useFetchData = (url, formatter) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Flag to check if the component is mounted

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jsonData = await response.json();
        const formattedData = formatter ? jsonData.map(formatter) : jsonData;

        // Only update state if the component is still mounted
        if (isMounted) {
          setData(formattedData);
          setLoading(false);
        }
      } catch (err) {
        // Only update state if the component is still mounted
        if (isMounted) {
          setError(err.message || "Unknown error occurred");
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      // Cleanup function to set isMounted to false when the component unmounts
      isMounted = false;
    };
  }, [url, formatter]);

  return { data, loading, error };
};
