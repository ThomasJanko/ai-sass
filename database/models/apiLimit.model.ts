

//user Model mongoose

import mongoose from "mongoose";

const apiLimitSchema = new mongoose.Schema({
  userId: {type: String, required: true},
  count: {type: Number, required: true, default: 0},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
});

export default mongoose.models.ApiLimit ||
  mongoose.model("ApiLimit", apiLimitSchema);

