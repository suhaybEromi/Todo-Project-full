import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import Dailog from "./Dailog";

/**
 * Todo
 *
 * @param { Object } props - component props
 * @param {Object}   props.setRefresh - page refresh handler
 * @param {Obejct } props.data - todo datas
 * @param {Number} props.data.id - todo id
 * @param {String} props.data.title - todo title
 * @param {Number} props.data.collectionId - todo collection id
 * @param {Boolean} props.data.isCompleted - is todo isCompleted?
 * @param {Date} props.data.createdAt - todo creation date
 * @returns todo component
 */

export default function Todo({ data }) {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [datas, setDatas] = useState(data);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <input
            type="checkbox"
            name={`todo-${data.id}`}
            id={`todo-${data.id}`}
            className="mb-4"
            checked={datas.isCompleted}
            onChange={() =>
              setDatas({ ...datas, isCompleted: !datas.isCompleted })
            }
          />
          <label
            htmlFor={`todo-${data.id}`}
            className={`ms-3 fs-5 ${
              datas.isCompleted
                ? "text-decoration-line-through text-secondary"
                : ""
            }`}
          >
            {data.title}
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
        acceptButton={{ show: true }}
        header="Edit Todo"
        body={
          <div className="mb-1 mt-1">
            <input
              type="text"
              id={`todo-${data.id}`}
              name={`todo-${data.id}`}
              placeholder="Todo Title"
              className="form-control form-control-lg border-2 rounded-4 customInput"
              value={datas.title}
              onChange={e => setDatas({ ...datas, title: e.target.value })}
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
        acceptButton={{ show: true }}
        header="Delete Todo"
        body="Are you sure you want to delete this todo?"
      />
    </div>
  );
}
