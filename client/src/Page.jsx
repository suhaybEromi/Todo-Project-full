import { Link, useNavigate, useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import Todo from "./components/Todo";
import { GoPlus } from "react-icons/go";
import { RiArrowGoBackLine } from "react-icons/ri";
import { IoTrashOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import Dailog from "./components/Dailog";
import request from "./components/request";

export default function Page() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [refresh, setRefresh] = useState(false);
  // current todo
  const [datas, setDatas] = useState([]);
  // all collection
  const [allCollections, setAllCollections] = useState([]);
  // current collection
  const [collection, setCollection] = useState({});
  // edit and delete collection
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [editCollection, setEditCollection] = useState({
    collection_name: "",
  });
  // new collection
  const [showNewCollection, setShowNewCollection] = useState(false);
  const [newCollection, setNewCollection] = useState({ collection_name: "" });
  // new todo
  const [showNewTodo, setShowNewTodo] = useState(false);
  const [newTodo, setNewTodo] = useState({ todo_title: "" });

  // handle add collection
  const handleAddCollection = async () => {
    try {
      const { data } = await request("/api/collections", {
        method: "POST",
        data: { collection_name: newCollection.collection_name },
      });
      setNewCollection({ collection_name: "" });
      navigate(`/${data.data.collection_id}`);
    } catch (err) {
      console.log(err);
    }
  };

  // handle update collection
  const handleUpdateCollection = async () => {
    try {
      await request(`/api/collections/${collection.collection_id}`, {
        method: "PUT",
        data: { collection_name: editCollection.collection_name },
      });
      setRefresh(Math.random());
    } catch (err) {
      console.log(err.data);
    }
  };

  // handle delete collection
  const handleDeleteCollection = async () => {
    try {
      await request(`/api/collections/${collection.collection_id}`, {
        method: "DELETE",
        data: { collection_name: datas.collection_name },
      });
      navigate("/");
    } catch (err) {
      console.log(err.data);
    }
  };

  // all collection
  useEffect(() => {
    request("/api/collections")
      .then(res => setAllCollections(res.data.data))
      .catch(err => console.log(err.data));
  }, [refresh]);

  // current collection
  useEffect(() => {
    request(`/api/collections/${id}`)
      .then(res => {
        setCollection(res.data.data);
        setEditCollection(res.data.data);
      })
      .catch(err => console.log(err.data));
  }, [refresh, id]);

  return (
    <>
      <div>
        <div style={{ background: "#4DD0E1" }}>
          {/* back button */}
          <div>
            <Link to={"/"}>
              <button className="btn btn-light ms-4 mt-3 fs-5">
                <RiArrowGoBackLine />
              </button>
            </Link>
          </div>
          <div className="d-flex justify-content-center align-items-center vh-100">
            {/* todo's - main */}
            <main className="bg-light p-3 rounded-4 w-75">
              {/* todo's - collection */}
              <div className="d-flex justify-content-between align-items-center">
                <style>
                  {`
                .btn:hover h5 {
                text-decoration: underline;
                }
                `}
                </style>
                <button
                  className="btn border-0"
                  onClick={() => setShowEdit(true)}
                >
                  <h5 className="fw-bold mt-2">{collection.collection_name}</h5>
                </button>

                <div className="link-danger mt-1">
                  <button
                    className="btn border-0 mb-3 fs-5 mt-2"
                    onClick={() => setShowDelete(true)}
                  >
                    <IoTrashOutline />
                  </button>
                </div>
                <div className="ms-auto me-2">
                  <Form.Select
                    id="collection"
                    name="collection"
                    className="mt-2"
                    size="sm"
                    value={collection.collection_id}
                    onChange={e => navigate(`/${e.target.value}`)}
                  >
                    {allCollections.map(collection => (
                      <option
                        key={collection.collection_id}
                        value={collection.collection_id}
                      >
                        {collection.collection_name}
                      </option>
                    ))}
                  </Form.Select>
                </div>
                <button
                  className="btn border-0"
                  onClick={() => setShowNewCollection(true)}
                >
                  <GoPlus className="fs-5" />
                </button>
              </div>
              <hr className="border-dark border-2" />

              {/* todo's */}
              <div>
                {datas.map(todo => (
                  <Todo key={todo.todo_id} data={todo} />
                ))}
                <div className="text-center mt-3 mb-2">
                  <button
                    className="btn btn-dark w-50 p-2"
                    onClick={() => setShowNewTodo(true)}
                  >
                    Add Todo
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
              placeholder="Collection"
              value={newCollection.collection_name}
              onChange={e =>
                setNewCollection({
                  ...newCollection,
                  collection_name: e.target.value,
                })
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

      {/* Edit Collection */}
      <Dailog
        show={showEdit}
        onClose={() => setShowEdit(false)}
        acceptButton={{ show: true, onAccept: handleUpdateCollection }}
        header="Edit Collection"
        body={
          <div className="mb-1 mt-1">
            <input
              type="text"
              id="collection"
              name="collection"
              placeholder="Collection"
              className="form-control form-control-lg border-2 rounded-4 customInput"
              value={editCollection.collection_name}
              onChange={e =>
                setEditCollection({
                  ...editCollection,
                  collection_name: e.target.value,
                })
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

      {/* Delete Collection */}
      <Dailog
        show={showDelete}
        onClose={() => setShowDelete(false)}
        acceptButton={{ show: true, onAccept: handleDeleteCollection }}
        header="Delete Collection"
        body="Are you sure you want to delete this Collection?"
      />

      {/* New Todo */}
      <Dailog
        show={showNewTodo}
        onClose={() => setShowNewTodo(false)}
        acceptButton={{ show: true }}
        header="Add Todo"
        body={
          <div className="mb-1 mt-1">
            <input
              type="text"
              className="form-control form-control-lg border-2 rounded-4 customInput"
              id="newTodo"
              name="newTodo"
              placeholder="Todo Title"
              value={newTodo.todo_title}
              onChange={e =>
                setNewTodo({ ...newTodo, todo_title: e.target.value })
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
