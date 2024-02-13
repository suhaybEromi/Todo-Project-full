import { GoPlus } from "react-icons/go";
import { Form } from "react-bootstrap";
import Todo from "./components/Todo";
import { IoTrashOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import Dailog from "./components/Dailog";
import request from "./components/request";

export default function Page() {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [datas, setDatas] = useState({ collection_name: "Collection 1" });

  const [showNewCollection, setShowNewCollection] = useState(false);
  const [newCollection, setNewCollection] = useState({ collection_name: "" });

  const [showNewTodo, setShowNewTodo] = useState(false);
  const [newTodo, setNewTodo] = useState({ todo_title: "" });

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    request("http://localhost:3000/api/collections", {}).then(res =>
      console.log(res.data),
    );
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
                  <h5 className="fw-bold mt-2">Collection</h5>
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
                  <Form.Select className="mt-2" size="sm">
                    <option value="">Col 1</option>
                    <option value="">Col 2</option>
                    <option value="">Col 3</option>
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
                {todos.map(todo => (
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

      {/* Edit Collection */}
      <Dailog
        show={showEdit}
        onClose={() => setShowEdit(false)}
        acceptButton={{ show: true }}
        header="Edit Collection"
        body={
          <div className="mb-1 mt-1">
            <input
              type="text"
              id="collection"
              name="collection"
              placeholder="Collection"
              className="form-control form-control-lg border-2 rounded-4 customInput"
              value={datas.collection_name}
              onChange={e =>
                setDatas({ ...datas, collection_name: e.target.value })
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
        acceptButton={{ show: true }}
        header="Delete Collection"
        body="Are you sure you want to delete this Collection?"
      />

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
              placeholder="Collection"
              value={newCollection.todo_title}
              onChange={e =>
                setNewCollection({ ...datas, todo_title: e.target.value })
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
                setNewTodo({ ...datas, todo_title: e.target.value })
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
