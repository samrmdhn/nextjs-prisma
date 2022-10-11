import { useEffect, useState } from "react";
import Router from "next/router";
import axios from "axios";

export default function Product() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState("");

  const getData = async () => {
    try {
      setLoading("Loading...");
      const res = await axios.get("/api/products").then(function (response) {
        return response;
      });
      setResponse(res.data.message);
      console.log(res);
      setData(res.data.data);
      setLoading("Success get data");
    } catch (error) {
      console.log(error);
    }
  };

  const formHandler = async (e) => {
    const datas = {
      name,
      price,
    };
    e.preventDefault();
    try {
      const req = await axios
        .post("/api/products/create", datas)
        .then(function (response) {
          return response;
        });

      setResponse(req.data.message);

      const cloneData = [...data];

      cloneData.push(req.data.data);
      setData(cloneData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteHandler = async (dataId) => {
    try {
      const res = await axios
        .delete(`/api/products/delete/${dataId}`)
        .then(function (response) {
          return response;
        });

      setResponse(res.data.message);

      const cloneData = [...data];

      const filteredData = cloneData.filter((dta) => {
        return dta.id != dataId;
      });

      setData(filteredData);
    } catch (error) {
      setResponse(error.message);
    }
  };

  return (
    <div style={{ padding: 50 }}>
      <form onSubmit={formHandler}>
        <input
          type="text"
          placeholder="Machiato"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="5000"
          onChange={(e) => setPrice(parseInt(e.target.value))}
        />
        <button type="submit">Submit</button>
      </form>

      {response}

      {data.map((dt, index) => {
        return (
          <div key={index}>
            <h5>
              {dt.name} {dt.price} {dt.brands.name}
              <button onClick={() => Router.push(`products/${dt.id}`)}>
                ✏️
              </button>
              <button onClick={() => deleteHandler(dt.id)}>🗑️</button>
            </h5>
          </div>
        );
      })}
    </div>
  );
}
