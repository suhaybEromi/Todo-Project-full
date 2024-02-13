const db = require("../db");

// get all collection
const getAllCollection = async (req, res) => {
  /** @todo - filter by user */

  try {
    const data = await db("collection");
    res.status(200).json({
      status: 200,
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({ status: 500, success: false, error: err.message });
  }
};

// create collection
const createCollection = async (req, res) => {
  try {
    const { collection_name } = req.body;
    const user_id = 1;

    /** @todo - return the whole collection */
    const createdId = await db("collection").insert({
      collection_name,
      user_id,
    });
    if (createdId.length == 0) {
      return res
        .status(400)
        .json({ status: 400, success: false, error: "Collection Not created" });
    }

    const data = await db("collection").where("collection_id", createdId[0]);
    if (data.length == 0) {
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

// get colelction by id
const getCollectionById = async (req, res) => {
  /** @todo - filter by user */

  try {
    const body = req.params.id;
    const data = await db("collection").where("collection_id", body);

    if (data.length == 0) {
      return res
        .status(404)
        .json({ status: 404, success: false, error: "Collection Not found" });
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

// update collection
const updateCollection = async (req, res) => {
  /** @todo - filter by user */

  try {
    const { collection_name } = req.body;
    const { body } = req.params.id;
    const isUpdated = await db("collection")
      .where("collection_id", body)
      .update({ collection_name });
    if (isUpdated == 0) {
      return res.status(400).json({
        status: 400,
        success: false,
        error: "Collection Not updated",
      });
    }

    const data = await db("collection").where("collection_id", body);
    if (data.length == 0) {
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

// delete collection
const deleteCollection = async (req, res) => {
  /** @todo - filter by user */

  try {
    const body = req.params.id;
    const isDeleted = await db("collection").where("collection_id", body).del();
    if (isDeleted == 0) {
      return res.status(400).json({
        status: 400,
        success: false,
        error: "Collection Not deleted",
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

// delete collection some
const deleteCollectionSome = async (req, res) => {
  try {
    const collection_id = req.params.id.split(",").map(id => parseInt(id));
    if (!Array.isArray(collection_id) || collection_id.length == 0) {
      return res.status(400).json({
        status: 400,
        success: false,
        error: "Please provide valid collection IDs to delete.",
      });
    }

    const deleteData = await db("collection")
      .whereIn("collection_id", collection_id)
      .del();
    if (deleteData !== collection_id.length) {
      return res.status(400).json({
        status: 400,
        success: false,
        error: "Some collections couldn't be deleted.",
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      collection_id,
    });
  } catch (err) {
    res.status(500).json({ status: 500, success: false, error: err.message });
  }
};
module.exports = {
  getAllCollection,
  getCollectionById,
  createCollection,
  updateCollection,
  deleteCollection,
  deleteCollectionSome,
};
