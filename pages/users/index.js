import React, { useState, useEffect } from "react";
import axios from "axios";
import Router from "next/router";

export default function Users() {
  const [data, setData] = useState([]);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [sex, setSex] = useState("");

  const getData = async () => {
    try {
      const res = await axios.get("/api/users").then(function (response) {
        return response;
      });
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteHandler = async (dataId) => {
    const res = await axios
      .delete(`/api/users/delete/${dataId}`)
      .then(function (response) {
        return response;
      });

    const cloneData = [...data];
    const filteredData = cloneData.filter((clone) => {
      return clone.id !== dataId;
    });

    setData(filteredData);
  };

  const formHandler = async (e) => {
    e.preventDefault();

    const dataBody = {
      name,
      phone,
      address,
      sex,
    };

    const res = await axios
      .post(`/api/users/create`, dataBody)
      .then(function (response) {
        return response;
      });
    const cloneData = [...data];
    cloneData.push(res.data.data);
    setData(cloneData);
  };

  const handleChange = (e) => {
    setSex(e.target.value);
  };

  return (
    <div style={{ padding: 50 }}>
      <h3>Users</h3>

      <form onSubmit={formHandler}>
        <input
          type="text"
          placeholder="Kael"
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="085155305199"
          onChange={(e) => setPhone(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Address"
          onChange={(e) => setAddress(e.target.value)}
        />
        <br />
        <label>
          <input
            type="radio"
            name="Male"
            value="Male"
            onChange={handleChange}
            checked={sex === "Male"}
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            name="Female"
            value="Female"
            onChange={handleChange}
            checked={sex === "Female"}
          />
          Female
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>

      {data.map((dta, index) => {
        return (
          <div key={index}>
            <h5>
              {dta.name} {dta.sex} {dta.address}
              <button onClick={() => Router.push(`users/${dta.id}`)}>✏️</button>
              <button onClick={() => deleteHandler(dta.id)}>🗑️</button>
            </h5>
          </div>
        );
      })}
    </div>
  );
}
