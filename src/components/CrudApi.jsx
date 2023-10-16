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
      console.log(res)
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
    // console.log(data);
    data.id = Date.now();
    setDb([...db, data]);
  };

  const updateData = (data) => {
    const newData = db.map((el) => (el.id === data.id ? data : el));
    setDb(newData);
  };

  const deleteData = (id) => {
    if (confirm(`Estas seguro de eliminar ${id}`)) {
      const newDb = db.filter((el) => el.id !== id);
      setDb(newDb);
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
            <Messaje msg={`Error ${error.status}: ${error.statusText}`} bgColor="#dc3545" />
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
