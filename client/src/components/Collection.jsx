import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import Dailog from "./Dailog";
import { Link } from "react-router-dom";
import request from "./request";

/**
 * Collection
 *
 * @param { Object } props - component props
 * @param {Object} props.setRefresh - page refresh handler
 * @param {Obejct } props.data - collection datas
 * @param {Number} props.data.collection_id - collection collection_id
 * @param {String} props.data.collection_name - collection collection_name
 * @param {Number} props.data.user_id - collection user_id
 * @param {Date} props.data.collection_date - collection creation date
 * @returns collection component
 */

export default function Collection({ data, setRefresh }) {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [datas, setDatas] = useState(data);

  // handle update collection
  const handleUpdateCollection = async () => {
    try {
      const { data: res } = await request(
        `/api/collections/${data.collection_id}`,
        {
          method: "PUT",
          data: { collection_name: datas.collection_name },
        },
      );
      setRefresh(Math.random());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <Link
            to={`/${data.collection_id}`}
            className="ms-2 fs-5 fw-bold text-dark text-decoration-none link-warning"
          >
            {data.collection_name}
          </Link>
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
        acceptButton={{ show: true, onAccept: handleUpdateCollection }}
        header="Edit Collection"
        body={
          <div className="mb-1 mt-1">
            <input
              type="text"
              id={`collection-${data.collection_id}`}
              name={`collection-${data.collection_id}`}
              placeholder="Collection Title"
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

      {/* Delete */}
      <Dailog
        show={showDelete}
        onClose={() => setShowDelete(false)}
        acceptButton={{ show: true }}
        header="Delete collection"
        body="Are you sure you want to delete this collection?"
      />
    </div>
  );
}
