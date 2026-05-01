import mongoose from "mongoose";
import userModel from "./user.js";

mongoose.connect("mongodb://127.0.0.1:27017/users");

const addUser = (user) => {
  const userToAdd = new userModel(user);
  return userToAdd.save();
};

const getUsers = (name, job) => {
  const query = {};

  if (name !== undefined) {
    query.name = name;
  }

  if (job !== undefined) {
    query.job = job;
  }

  return userModel.find(query);
};

const findUserById = (id) => {
  return userModel.findById(id);
};

const findUserByName = (name) => {
  return userModel.find({ name: name });
};

const findUserByJob = (job) => {
  return userModel.find({ job: job });
};

const deleteUser = (id) => {
  return userModel.findByIdAndDelete(id);
};

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
  deleteUser
};