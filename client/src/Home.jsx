import { useEffect, useState } from "react";
import Dailog from "./components/Dailog";
import request from "./components/request";
import Collection from "./components/Collection";
export default function Page() {
  const [refresh, setRefresh] = useState(Math.random());

  const [datas, setDatas] = useState([]);
  const [showNewCollection, setShowNewCollection] = useState(false);
  const [newCollection, setNewCollection] = useState({ collection_name: "" });

  // handle add collection
  const handleAddCollection = async () => {
    try {
      const { data } = await request("/api/collections", {
        method: "POST",
        data: { collection_name: newCollection.collection_name },
      });
      setDatas([...datas, data.data]);
      setRefresh(Math.random());
    } catch (err) {
      console.log(err);
    }
  };

  // handle delete collection
  const handleDeleteCollection = async () => {
    try {
      const { data } = await request("/api/collections", {
        method: "POST",
        data: { collection_name: newCollection.collection_name },
      });
      setDatas([...datas, data.data]);
      setRefresh(Math.random());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    request("/api/collections")
      .then(res => setDatas(res.data.data))
      .catch(err => console.log(err.data));
  }, [refresh]);

  // /NOTE we can send that too👇,but the above is easier👆.
  // useEffect(() => {
  //   axios({
  //     url: "http://localhost:3000/api/collections",
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //   }).then(res => console.log(res));
  // }, []);

  return (
    <>
      <div>
        <div style={{ background: "#4DD0E1" }}>
          <div className="d-flex justify-content-center align-items-center vh-100">
            {/* collections - main */}
            <main className="bg-light p-3 rounded-4 w-75">
              {/* title */}
              <h5 className="fw-bold mt-2">Collection</h5>
              <hr className="border-dark border-2" />

              {/* collections */}
              <div>
                {datas.map(collection => (
                  <Collection
                    key={collection.collection_id}
                    data={collection}
                    setRefresh={setRefresh}
                  />
                ))}
                <div className="text-center mt-3 mb-2">
                  <button
                    className="btn btn-dark w-50 p-2"
                    onClick={() => setShowNewCollection(true)}
                  >
                    Add Collection
                  </button>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
      {/* New Collection */}

      <Dailog
        show={showNewCollection}
        onClose={() => setShowNewCollection(false)}
        acceptButton={{ show: true, onAccept: handleAddCollection }}
        header="Add Collection"
        body={
          <div className="mb-1 mt-1">
            <input
              type="text"
              className="form-control form-control-lg border-2 rounded-4 customInput"
              id="newCollection"
              name="newCollection"
              placeholder="Collection name"
              value={newCollection.collection_name}
              onChange={e =>
                setNewCollection({ ...datas, collection_name: e.target.value })
              }
              autoComplete="off"
            />

            <style>
              {`
                .customInput {
                  transition: border-color 0.4s ease-in-out;

                }
                .customInput:hover {
                  border-color: #74E291;
                } 
                `}
            </style>
          </div>
        }
      />
    </>
  );
}
