const db = require("../db");

// get all collection
const getAllTodos = async (req, res) => {
  /** @todo - filter by user */

  try {
    const data = await db("todo");
    res.status(200).json({
      status: 200,
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({ status: 500, success: false, error: err.message });
  }
};

// create todo
const createTodos = async (req, res) => {
  try {
    const { todo_title } = req.body;
    const collection_id = 1;

    /** @todo - return the whole todo */
    const createdId = await db("todo").insert({
      todo_title,
      collection_id,
    });
    if (createdId.length == 0) {
      return res
        .status(400)
        .json({ status: 400, success: false, error: "Todo Not created" });
    }

    const data = await db("todo").where("todo_id", createdId[0]);
    if (data.length == 0) {
      return res
        .status(404)
        .json({ status: 404, success: false, error: "Todo Not found" });
    }

    res.status(200).json({
      status: 200,
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({ status: 500, success: false, error: err.message });
  }
};

module.exports = {
  getAllTodos,
  createTodos,
  //   getTodosById,
  //   updateTodos,
  //   deleteTodos,
  //   deleteTodosSome,
};
