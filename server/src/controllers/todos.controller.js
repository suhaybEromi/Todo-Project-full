const db = require("../db");

// get all collection
const getAllTodosByCollection = async (req, res) => {
  /** @todo - filter by user */

  try {
    const collection_id = req.params.id;
    const data = await db("todo").where("collection_id", collection_id);

    if (data == 0) {
      return res
        .status(404)
        .json({ status: 404, success: false, error: "Collection Not found" });
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

// get todo by id
const getTodosById = async (req, res) => {
  /** @todo - filter by user */

  try {
    const body = req.params.id;
    const data = await db("todo").where("todo_id", body);

    if (data.length == 0) {
      return res
        .status(404)
        .json({ status: 404, success: false, error: "Todo Not found" });
    }

    res.status(200).json({
      status: 200,
      success: true,
      data: data[0],
    });
  } catch (err) {
    res.status(500).json({ status: 500, success: false, error: err.message });
  }
};

// update todo
const updateTodos = async (req, res) => {
  /** @todo - filter by user */

  try {
    const { todo_title } = req.body;
    const { id } = req.params;
    const isUpdated = await db("todo")
      .where("todo_id", id)
      .update({ todo_title });
    if (isUpdated == 0) {
      return res.status(400).json({
        status: 400,
        success: false,
        error: "Todo Not updated",
      });
    }

    const data = await db("todo").where("todo_id", id);
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

// delete todo
const deleteTodos = async (req, res) => {
  /** @todo - filter by user */

  try {
    const body = req.params.id;
    const isDeleted = await db("todo").where("todo_id", body).del();
    if (isDeleted == 0) {
      return res.status(400).json({
        status: 400,
        success: false,
        error: "Todo Not deleted",
      });
    }
    res.status(200).json({
      status: 200,
      success: true,
      body,
    });
  } catch (err) {
    res.status(500).json({ status: 500, success: false, error: err.message });
  }
};

// delete Todos Some
const deleteTodosSome = async (req, res) => {
  try {
    const todo_id = req.params.id.split(",").map(id => parseInt(id));
    if (!Array.isArray(todo_id) || todo_id.length == 0) {
      return res.status(400).json({
        status: 400,
        success: false,
        error: "Please provide valid collection IDs to delete.",
      });
    }

    const deleteData = await db("todo").whereIn("todo_id", todo_id).del();
    if (deleteData !== todo_id.length) {
      return res.status(400).json({
        status: 400,
        success: false,
        error: "Some todos couldn't be deleted.",
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      todo_id,
    });
  } catch (err) {
    res.status(500).json({ status: 500, success: false, error: err.message });
  }
};

module.exports = {
  getAllTodosByCollection,
  createTodos,
  getTodosById,
  updateTodos,
  deleteTodos,
  deleteTodosSome,
};
