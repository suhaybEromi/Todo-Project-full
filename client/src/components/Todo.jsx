import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import Dailog from "./Dailog";
import request from "../components/request";
import { useNavigate } from "react-router-dom";

/**
 * Todo
 *
 * @param { Object } props - component props
 * @param { Object } props.setRefresh - page refresh handler
 * @param { Obejct } props.data - todo datas
 * @param { Number } props.data.todo_id - todo todo_id
 * @param { String } props.data.todo_title - todo todo_title
 * @param { Number } props.data.collection_id - todo collection todo_id
 * @param { Boolean } props.data.todo_is_completed - is todo todo_is_completed?
 * @param { Date } props.data.todo_date - todo creation date
 * @returns todo component
 */

export default function Todo({ data, setRefresh }) {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [datas, setDatas] = useState(data);

  // handle update todo
  const handleUpdateTodo = async () => {
    try {
      await request(`/api/todos/${data.todo_id}`, {
        method: "PUT",
        data: { todo_title: datas.todo_title },
      });
      setRefresh(Math.random());
    } catch (err) {
      console.log(err.data);
    }
  };

  // handle update todo IsCompleted
  const handleUpdateTodoIsCompleted = async () => {
    try {
      setDatas({
        ...datas,
        todo_is_completed: !datas.todo_is_completed,
      });
      await request(`/api/todos/${data.todo_id}`, {
        method: "PATCH",
        data: { todo_is_completed: !datas.todo_is_completed },
      });
      setRefresh(Math.random());
    } catch (err) {
      console.log(err.data);
    }
  };

  // handle delete todo
  const handleDeleteTodo = async () => {
    try {
      await request(`/api/todos/${data.todo_id}`, {
        method: "DELETE",
      });
      setRefresh(Math.random());
    } catch (err) {
      console.log(err.data);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <input
            type="checkbox"
            name={`todo-${data.todo_id}`}
            id={`todo-${data.todo_id}`}
            className="mb-4"
            checked={datas.todo_is_completed}
            onChange={handleUpdateTodoIsCompleted}
            autoComplete="off"
          />
          <label
            htmlFor={`todo-${data.todo_id}`}
            className={`ms-3 fs-5 ${
              datas.todo_is_completed
                ? "text-decoration-line-through text-secondary"
                : ""
            }`}
          >
            {data.todo_title}
          </label>
        </div>
        <div className="d-flex">
          <div className="link-primary">
            <button
              className="btn border-0 mb-3 fs-5"
              onClick={() => setShowEdit(true)}
            >
              <FaRegEdit />
            </button>
          </div>
          <div className="link-danger">
            <button
              className="btn border-0 mb-3 fs-5"
              onClick={() => setShowDelete(true)}
            >
              <IoTrashOutline />
            </button>
          </div>
        </div>
      </div>

      {/* Edit */}
      <Dailog
        show={showEdit}
        onClose={() => setShowEdit(false)}
        acceptButton={{ show: true, onAccept: handleUpdateTodo }}
        header="Edit Todo"
        body={
          <div className="mb-1 mt-1">
            <input
              type="text"
              id={`todo-${data.todo_id}`}
              name={`todo-${data.todo_id}`}
              placeholder="Todo title"
              className="form-control form-control-lg border-2 rounded-4 customInput"
              value={datas.todo_title}
              onChange={e => setDatas({ ...datas, todo_title: e.target.value })}
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

      {/* Delete */}
      <Dailog
        show={showDelete}
        onClose={() => setShowDelete(false)}
        acceptButton={{ show: true, onAccept: handleDeleteTodo }}
        header="Delete Todo"
        body="Are you sure you want to delete this todo?"
      />
    </div>
  );
}
