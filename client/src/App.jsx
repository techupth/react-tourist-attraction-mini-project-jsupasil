import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [keyword, setKeyword] = useState("");
  const [searchList, setSearchList] = useState([]);
  const getSearch = async (words) => {
    const result = await axios.get(
      `http://localhost:4001/trips?keywords=${words}`
    );
    setSearchList(result.data?.data ?? []);
    console.log(result.data?.data);
  };

  useEffect(() => {
    getSearch(keyword);
  }, [keyword]);

  return (
    <div className="flex flex-col">
      <div>
        <h1 className="text-center">เที่ยวไหนดี</h1>
        <h2>ค้นหาที่เที่ยว</h2>
        <input
          id="searchKeyword"
          type="text"
          value={keyword}
          onChange={(event) => {
            setKeyword(event.target.value);
          }}
          placeholder="หาที่เที่ยวแล้วไปกัน ..."
        />
      </div>
      <div>
        {searchList.map((item, index) => {
          return (
            <div className="flex flex-row" key={index}>
              <img
                src={item.photos[0]}
                alt="main photo"
                className="w-3/12 h-3/12"
              />
              <div className="flex flex-col">
                <h2>{item.title}</h2>
                <p>{item.description.slice(0, 100)} ... </p>
                <a href={item.url}>อ่านต่อ</a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
