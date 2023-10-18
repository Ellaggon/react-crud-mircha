import React, { useEffect, useState } from "react";
import CrudForm from "./CrudForm";
import CrudTable from "./CrudTable";
import { helpHttp } from "../helpers/helphttp";
import Messaje from "./Messaje";
import Loader from "./Loader";

const CrudApi = () => {
  const [db, setDb] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(true);

  let api = helpHttp();
  let url = "http://localhost:5000/santos";

  useEffect(() => {
    setLoading(true);
    api.get(url).then((res) => {
      // console.log(res);
      if (!res.err) {
        setDb(res);
        setError(null);
      } else {
        setDb(null);
        setError(res);
      }
      setLoading(false);
    });
  }, [url]);

  const createData = (data) => {
    data.id = Date.now();

    let options = { 
      body: data, 
      headers: { "content-type": "application/json" },
    };

    api.post(url, options).then((res) => {
      // console.log(res);
      if (!res.err) {
        setDb([...db, res]);
      } else {
        setError(res);
      }
    });
  };

  const updateData = (data) => {
    let endpoint = `${url}/${data.id}`;
    let options = { 
      body: data, 
      headers: { "content-type": "application/json" },
    };

    api.put(endpoint, options).then((res) => {
      if (!res.err) {
        const newData = db.map((el) => (el.id === data.id ? data : el));
        setDb(newData);
      } else {
        setError(res);
      }
    });
  };

  const deleteData = (id) => {
    let isDelete = confirm(`Estas seguro de eliminar ${id}?`);

    if (isDelete) {
      let endpoint = `${url}/${id}`;
      let options = { 
        headers: { "content-type": "application/json" },
      };

      api.del(endpoint, options).then(res => {
        if (!res.err) {
          let newDb = db.filter((el) => el.id !== id);
          setDb(newDb);
        } else {
          setError(res);
        }
      })
    } else {
      alert("You have canceled the operation");
    }
  };

  return (
    <>
      <h2>CRUD API</h2>
      <article className="grid-1-2">
        <CrudForm
          createData={createData}
          updateData={updateData}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />
        <div>
          {loading && <Loader />}
          {error && (
            <Messaje
              msg={`Error ${error.status}: ${error.statusText}`}
              bgColor="#dc3545"
            />
          )}
          {db && (
            <CrudTable
              data={db}
              setDataToEdit={setDataToEdit}
              deleteData={deleteData}
            />
          )}
        </div>
      </article>
    </>
  );
};

export default CrudApi;
