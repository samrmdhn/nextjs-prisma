import React, { useState, useEffect } from "react";import axios from "axios";
import Router from "next/router";

export default function Users() {
  const [data, setData] = useState([]);

  const getData = async () => {
    const res = await axios.get("/api/users").then(function (response) {
      return response;
    });
    setData(res.data.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h3>Users</h3>

      {data.map((dta, index) => {
        return (
          <div key={index}>
            <h5>
              {dta.name} {dta.sex} {dta.address}{" "}
              <button onClick={() => Router.push(`users/${dta.id}`)}>✏️</button>
            </h5>
          </div>
        );
      })}
    </div>
  );
}
