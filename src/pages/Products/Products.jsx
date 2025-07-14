import React, { useState, useRef, useEffect } from "react";
import RecentProducts from "../../components/RecentProducts/RecentProducts";

export default function Products() {
  const [search, setSearch] = useState("");
  // const inputRef = useRef(null);

  // useEffect(() => {
  //   inputRef.current && inputRef.current.focus();
  // }, []);

  return (
    <>
    {/* {search.length == 0? 
    <div className="flex justify-center my-8">
        <input
          // ref={inputRef}
          type="text"
          placeholder="search...."
          className="w-1/2 md:w-1/2 border rounded px-4 py-1 text-lg focus:outline-blue-400 focus:ring"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    : null} */}
      <div className="flex justify-center my-8">
        <input
          // ref={inputRef}
          type="text"
          placeholder="search...."
          className="w-1/2 md:w-1/2 border rounded px-4 py-1 text-lg focus:outline-blue-400 focus:ring"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <RecentProducts search={search} />
    </>
  );
}
