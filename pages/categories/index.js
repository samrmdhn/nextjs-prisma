import React, { useState, useEffect } from "react";
import axios from "axios";
import Router from "next/router";

export default function Categories() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");

  const getData = async () => {
    const res = await axios.get(`/api/categories`).then(function (response) {
      return response;
    });
    console.log(res.data.data);
    setData(res.data.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    const dataBody = {
      name,
    };

    try {
      const res = await axios
        .post(`/api/categories/create`, dataBody)
        .then(function (response) {
          return response;
        });

      const cloneData = [...data];
      cloneData.push(res.data.data);
      setData(cloneData);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = async (dataId) => {
    try {
      const res = await axios
        .delete(`/api/categories/delete/${dataId}`)
        .then(function (response) {
          return response;
        });

      const cloneData = [...data];
      const filteredData = data.filter((dta) => {
        return dta.id !== dataId;
      });
      setData(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: 50 }}>
      <h5>Categories</h5>
      <form onSubmit={submitHandler}>
        <input type="text" onChange={(e) => setName(e.target.value)} />
        <button>Submit</button>
      </form>
      {data.map((dta, index) => {
        return (
          <div key={index}>
            {dta.name}
            <button onClick={() => Router.push(`/categories/${dta.id}`)}>
              ✏️
            </button>
            <button onClick={() => deleteHandler(dta.id)}>🗑️</button>
          </div>
        );
      })}
    </div>
  );
}
