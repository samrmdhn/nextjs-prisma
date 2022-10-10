import React, { useEffect, useState } from "react";import Router, { useRouter } from "next/router";
import axios from "axios";

export default function CategoryID() {
  const [data, setData] = useState("");
  const [name, setName] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const router = useRouter();
  const { id } = router.query;

  const getData = async () => {
    const res = await axios
      .get(`/api/categories/find/${id}`)
      .then(function (response) {
        return response;
      });

    console.log(res.data.data);
    setData(res.data.data);
    setCategoryName(res.data.data.name);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (categoryName == "") return;

    const dataBody = {
      name: categoryName,
    };

    const res = await axios
      .patch(`/api/categories/update/${id}`, dataBody)
      .then(function (response) {
        return response;
      });
    Router.push(`/categories`);
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
          defaultValue={categoryName}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
