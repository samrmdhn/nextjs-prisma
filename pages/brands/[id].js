import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function BrandsID() {
  const [data, setData] = useState([]);

  const router = useRouter();
  const { id } = router.query;

  const getData = async () => {
    const res = await axios
      .get(`/api/brands/find/${id}`)
      .then(function (response) {
        return response;
      });
    setData(res.data.data);
  };

  useEffect(() => {
    if (!router.isReady) return;
    getData();
  }, [router.isReady]);

  return (
    <div style={{ padding: 50 }}>
      <h5>Brands ID</h5>
      {data.map((dta, index) => {
        return (
          <div key={index}>
            <div>
              {dta.name} {dta.price}
            </div>
          </div>
        );
      })}
    </div>
  );
}
