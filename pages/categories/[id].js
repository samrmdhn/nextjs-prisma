import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import axios from "axios";

export default function CategoryID() {
  const [data, setData] = useState("");
  const [name, setName] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const router = useRouter();
  const { id } = router.query;

  const getData = async () => {
    try {
      const res = await axios
        .get(`/api/categories/find/${id}`)
        .then(function (response) {
          return response;
        });

      console.log(res.data.data);
      setData(res.data.data);
      setName(res.data.data.name);
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const dataBody = {
        name,
      };

      const res = await axios
        .patch(`/api/categories/update/${id}`, dataBody)
        .then(function (response) {
          return response;
        });
      console.log(res);
      Router.push(`/categories`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    getData();
  }, [router.isReady]);

  return (
    <div>
      <h3>category id</h3>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          defaultValue={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
