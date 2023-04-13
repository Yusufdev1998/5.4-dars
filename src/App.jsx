import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

const URL = "http://localhost:3000/odamlar/";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    setLoading(true);
    const res = await fetch(URL);
    const data = await res.json();
    setData(data);
    setLoading(false);
  }
  const deleteOdam = async id => {
    const res = await fetch(URL + id, {
      method: "DELETE",
    });

    if (res.status == 200) {
      setData(data.filter(d => d.id !== id));
    }
  };

  const createOdamName = async e => {
    if (e.key == "Enter" && e.target.value) {
      const obj = {
        nomi: e.target.value,
      };
      const res = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });

      const result = await res.json();
      if (res.status == 201) {
        setData([...data, result]);
      }
    }
  };

  const edit = async id => {
    const obj = {
      nomi: "O'zgardi",
    };
    const res = await fetch(URL + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    const result = await res.json();
    if (res.status == 200) {
      setData(
        data.map(d => {
          if (d.id == id) {
            return result;
          } else return d;
        })
      );
    }
  };
  return (
    <div className="App">
      <input type="text" onKeyDown={createOdamName} placeholder="odam" />
      {loading && <h1>Loading...</h1>}
      {data.length > 0 &&
        data.map(d => (
          <>
            <h1 onClick={() => deleteOdam(d.id)} key={d.id}>
              {d.id}. {d.nomi}
            </h1>
            <button onClick={() => edit(d.id)}>Edit</button>
          </>
        ))}
    </div>
  );
}

export default App;
