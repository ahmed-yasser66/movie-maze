import { useEffect, useState } from "react";
const key = process.env.REACT_APP_API_KEY;
export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${key}`,
  },
};

const useFetch = (url) => {
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const resp = await fetch(url, options);
        if (!resp.ok) {
          throw new Error("something went wrong");
        }
        const data = await resp.json();
        setData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);

  return { data, error, loading };
};
export default useFetch;
