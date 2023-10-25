import { useFetch } from "../hooks/useFetch";

const SelectList = ({ title, url, handleChange }) => {
  const { data, error, loader } = useFetch(url);
  console.log(data, error, loader);

  if(!data) return null;
  if(error){
    return (
      <Message 
      msg={`Error ${error.status}: ${error.statusText}`}
      bgColor="#dc3545"
      />
    );
  }

  let id = `select - ${title}`;
  let label = title.charAt(0).toUpperCase() + title.slice(1);

  return (
    <>
      <label htmlFor={id}>{label}</label>
      {loader && <loader />}
      <select name={id} id={ id} onChange={handleChangevc}>
        <option value={id}>Elige un {title}</option>
        {data && options.map(el => <option value={el}>{el}</option>)}
      </select>
    </>
  );
};

export default SelectList;
