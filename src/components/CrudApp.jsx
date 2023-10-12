import React, { useState } from "react"
import CrudForm from "./CrudForm"
import CrudTable from "./CrudTable"

const initialDb = [
  {
    id: 1,
    name: "Seiya",
    constellation: "Pegaso",
  },
  {
    id: 2,
    name: "Shiryu",
    constellation: "Dragon",
  },
  {
    id: 3,
    name: "Hyoga",
    constellation: "Cisne",
  },
  {
    id: 4,
    name: "Shun",
    constellation: "Andromeda",
  },
  {
    id: 5,
    name: "Ikki",
    constellation: "Fenix",
  },
];

const CrudApp = () => {
  const [db, setDb] = useState(initialDb);
  const [dataToEdit, setDataToEdit] = useState(null);
  
  const createData = (data) => {
    // console.log(data);
    data.id = Date.now();
    setDb([...db, data])
  };
  
  const updateData = (data) => {
    const newData = db.map(el => el.id === data.id ? data : el);
    setDb(newData);
  };
  
  const deleteData = (id) => {

    if(confirm(`Estas seguro de eliminar ${id}`)){
      const newDb = db.filter(el => el.id !== id)
      setDb(newDb);  
    } else {
      alert("You have canceled the operation");
    }
  };

  return (
    <>
    <h2>CRUD APP</h2>
    <article className="grid-1-2">
      <CrudForm 
        createData={createData}
        updateData={updateData}
        dataToEdit={dataToEdit}
        setDataToEdit={setDataToEdit}/>
      <CrudTable 
        data={db}
        setDataToEdit={setDataToEdit}
        deleteData={deleteData}/>
    </article>
    </>
  )
}

export default CrudApp