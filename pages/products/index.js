import { useEffect, useState } from "react";
import Router from "next/router";
import axios from "axios";

export default function Product() {
  const [data, setData] = useState([]);

  const [brands, setBrands] = useState([]);
  const [brandId, setBrandId] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoriesId1, setCategoriesId1] = useState("");
  const [categoriesId2, setCategoriesId2] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState("");

  const getData = async () => {
    try {
      setLoading("Loading...");
      const res = await axios.get(`/api/products`).then(function (response) {
        return response;
      });

      console.log(res);

      const res2 = await axios.get(`/api/categories`).then(function (response) {
        return response;
      });

      const res3 = await axios.get(`/api/brands`).then(function (response) {
        return response;
      });

      const cloneCategories = [...res2.data.data];
      cloneCategories.unshift({
        id: "0",
        name: "Select Categories",
      });

      const cloneCategories2 = [...res2.data.data];
      cloneCategories2.unshift({
        id: "0",
        name: "Select Categories",
      });

      const cloneBrands = [...res3.data.data];
      cloneBrands.unshift({
        id: "0",
        name: "Select Brands",
      });

      setCategories(cloneCategories);

      setBrands(cloneBrands);

      setResponse(res.data.message);

      setData(res.data.data);
      // setCategories(res2.data.data);
      setLoading("Success get data");
    } catch (error) {
      console.log(error);
    }
  };

  const formHandler = async (e) => {
    const datas = {
      name,
      price,
      categoriesId1,
      categoriesId2,
      brandId,
    };
    e.preventDefault();
    console.log(datas);

    try {
      const res = await axios
        .post("/api/products/create", datas)
        .then(function (response) {
          return response;
        });

      setResponse(res.data.message);

      const cloneData = [...data];

      cloneData.push(res.data.data);
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

  const handleChange = (e) => {
    setCategoriesId1(e.target.value);
  };

  const handleChange2 = (e) => {
    setBrandId(e.target.value);
  };

  const handleChange3 = (e) => {
    setCategoriesId2(e.target.value);
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

        <select onChange={handleChange} value={categoriesId1}>
          {categories.map((ctr, index) => {
            return (
              <>
                {categoriesId2 == ctr.id ? (
                  <>{/* */}</>
                ) : (
                  <>
                    <option
                      key={index}
                      value={ctr.id}
                      name={ctr.id}
                      label={ctr.name}
                    />
                  </>
                )}
              </>
            );
          })}
        </select>

        <select onChange={handleChange3} value={categoriesId2}>
          {categories.map((ctr, index) => {
            return (
              <>
                {categoriesId1 == ctr.id ? (
                  <>{/**/}</>
                ) : (
                  <>
                    <option label={ctr.name} value={ctr.id} key={index} />
                  </>
                )}
              </>
            );
          })}
        </select>

        <select onChange={handleChange2} value={brandId}>
          {brands.map((brd, index) => {
            return (
              <>
                <option key={index} label={brd.name} value={brd.id} />
              </>
            );
          })}
        </select>

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
