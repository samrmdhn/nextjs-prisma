import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Brands() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");

  const getData = async () => {
    const res = await axios.get(`/api/brands`).then(function (response) {
      return response;
    });
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
        .post(`/api/brands/create`, dataBody)
        .then(function (response) {
          return response;
        });

      const cloneData = [...data];
      cloneData.push(res.data.data);
      setData(cloneData);
      setName("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: 50 }}>
      <h5>Brands</h5>

      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Insert Name.."
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>

      {data.map((dta, index) => {
        return (
          <div key={index}>
            <Link href={`/brands/${dta.id}`}>
              <a>{dta.name}</a>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
