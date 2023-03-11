const { Schema, model } = require("mongoose");

const tagSchema = new Schema({
  name: {
    type: String,
  },
});

module.exports = tagSchema;
