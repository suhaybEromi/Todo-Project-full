import { useEffect, useState } from "react";
import Dailog from "./components/Dailog";
import request from "./components/request";
import Todo from "./components/Todo";
import Collection from "./components/Collection";
export default function Page() {
  const [datas, setDatas] = useState([]);

  const [showNewCollection, setShowNewCollection] = useState(false);
  const [newCollection, setNewCollection] = useState({ name: "" });

  useEffect(() => {
    request("http://localhost:3000/api/collections")
      .then(res => setDatas(res.data.data))
      .catch(err => console.log(err.data));
  }, []);

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
            {/* coolection's - main */}
            <main className="bg-light p-3 rounded-4 w-75">
              {/* title */}
              <h5 className="fw-bold mt-2">Collection</h5>
              <hr className="border-dark border-2" />

              {/* collections */}
              <div>
                {datas.map(collection => (
                  <Collection key={collection.collection_id} data={collection} />
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
        acceptButton={{ show: true }}
        header="Add Collection"
        body={
          <div className="mb-1 mt-1">
            <input
              type="text"
              className="form-control form-control-lg border-2 rounded-4 customInput"
              id="newCollection"
              name="newCollection"
              placeholder="Collection name"
              value={newCollection.title}
              onChange={e =>
                setNewCollection({ ...datas, title: e.target.value })
              }
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
