import React, { Component, useEffect } from "react";

import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";

export const Search = () => {
  const [text, setText] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const endPoint = `${process.env.NEXT_PUBLIC_URL_API}`;

  async function getAutocomplete(text) {
    try {
      setLoading(true);
      const { data } = await axios.get(`${endPoint}/searcher`, {
        params: { text: text },
      });

      setResults(data);
      setLoading(false);
      console.log(results);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  function sendUrl(url) {
    router.push(`estate/${url}`);
  }

  return (
    <>
      <div className="container d-flex justify-content-center">
        <div className="search">
          <h1>Welcome to a best search of estates </h1>
          <input
            type="text"
            className="input-search"
            placeholder="Enter an address, neighborhood, city, or ZIP code"
            defaultValue={""}
            autoFocus
            onChange={(event) => {
              getAutocomplete(event.target.value);
            }}
          ></input>
          {loading && <div>Cargando tu busqueda de</div>}
          <div className="results">
            {results.length > 0 && (
              <ul className="list-items">
                {results.map((item, i) => {
                  return (
                    <li
                      key={i}
                      className="item"
                      onClick={() => sendUrl(item.url)}
                    >
                      {item.postalCode}, {item.name}, {item.state}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
