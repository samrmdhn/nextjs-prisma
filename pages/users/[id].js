import React, { useState, useEffect } from "react";
import axios from "axios";
import Router, { useRouter } from "next/router";

const SEX = [
  {
    label: "Male",
    value: "Male",
  },
  {
    label: "Female",
    value: "Female",
  },
];

export default function UserID() {
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState({});

  const [name, setName] = useState("");
  const [sex, setSex] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const getData = async () => {
    try {
      const res = await axios
        .get(`/api/users/find/${id}`)
        .then(function (response) {
          return response;
        });
      setData(res.data.data);
      setName(res.data.data.name);
      setSex(res.data.data.sex);
      setAddress(res.data.data.address);
      setPhone(res.data.data.phone);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    getData();
  }, [router.isReady]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const dataBody = {
      name,
      sex,
      address,
      phone,
    };

    const res = await axios
      .patch(`/api/users/update/${id}`, dataBody)
      .then(function (response) {
        return response;
      });
    console.log(res);
    Router.push(`/users`);
  };

  const handleChange = (e) => {
    setSex(e.target.value);
  };

  return (
    <div style={{ padding: 50 }}>
      <h5>User ID</h5>
      <form onSubmit={submitHandler}>
        <input defaultValue={name} onChange={(e) => setName(e.target.value)} />
        <br />
        <input
          defaultValue={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <br />
        <textarea
          defaultValue={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <br />

        <div>
          <label>
            <input
              type="radio"
              name="Male"
              value="Male"
              checked={sex === "Male"}
              onChange={handleChange}
            />
            Male
          </label>

          <label>
            <input
              type="radio"
              name="Female"
              value="Female"
              checked={sex === "Female"}
              onChange={handleChange}
            />
            Female
          </label>
        </div>

        <br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
