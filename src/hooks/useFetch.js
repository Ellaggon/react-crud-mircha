import React, { useState } from "react";

export const useFetch = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const abortController = new abortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      setLoader(true);
      
      try {
        const res = await fetch(url);

        if(!res.ok){
          let err = new Error("Error en la peticion Fetch")
          err.status = res.status || "00";
          err.statusText = res.statusText || "Error"
        }  
        const json = await res.json();
        if(!signal.aborted){
          setData(json);
          setError(null);
        }
      } catch (error) {
        if(!res.ok){
          setData(null);
          setError(error);
        }
      } finally {
        setLoader(false);
      }
      
    };
    fetchData();

    // El return representa la fase de desmontaje del ciclo de vida en los class components
    return () => abortController.abort();
  }, [url]);

  return { data, error, loader };
};
