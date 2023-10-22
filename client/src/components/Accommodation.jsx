import React from "react";
import { useParams } from "react-router-dom";

function Accommodation() {
  const { id } = useParams();
  return <div>Accommodation {id}</div>;
}

export default Accommodation;
