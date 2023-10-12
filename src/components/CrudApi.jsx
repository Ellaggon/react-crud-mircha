import React, { useState } from "react";
import CrudForm from "./CrudForm";
import CrudTable from "./CrudTable";

const CrudApi = () => {
  const [db, setDb] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);

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
        <CrudTable
          data={db}
          setDataToEdit={setDataToEdit}
          deleteData={deleteData}
        />
      </article>
    </>
  );
};

export default CrudApi;
