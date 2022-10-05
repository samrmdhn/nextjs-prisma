import React, { useEffect, useState } from "react";import axios from "axios";
import Router, { useRouter } from "next/router";

export default function ProductId() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState({});
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [notification, setNotification] = useState("");

  const getData = async () => {
    const res = await axios
      .get(`/api/product/find/${id}`)
      .then(function (response) {
        return response;
      });
    setName(res.data.data.name);
    setPrice(res.data.data.price);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const datas = {
        name: name,
        price: price,
      };

      if (name == "" || price == "") {
        setNotification("Semua input harus diupdate");
        return;
      }

      const res = await axios
        .put(`/api/product/update/${id}`, datas)
        .then(function (response) {
          return response;
        });

      Router.push("/");
    } catch (error) {
      setNotification(error.message);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    getData();
  }, [router.isReady]);

  return (
    <div style={{ padding: 50 }}>
      {notification}
      <form onSubmit={submitHandler}>
        <input
          type="text"
          name={name}
          defaultValue={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          name={price}
          defaultValue={price}
          onChange={(e) => {
            setPrice(parseInt(e.target.value));
          }}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
