const { connect } = require("mongoose");
const { mongoUri } = require("./env");

const connectDB = () => {
  connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
