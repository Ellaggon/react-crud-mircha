import React from "react"

const Messaje = ({msg, bgColor}) => {
  let style = {
    padding: "1rem",
    marginBottom: "1rem",
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    backgroundColor: bgColor,
  };

  return (
    <div style={style}>
      <p>{msg}</p>
    </div>
  )
}

export default Messaje