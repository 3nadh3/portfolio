const mongoose = require('../config/db');

const visitorSchema = new mongoose.Schema({ count: Number });
const Visitor = mongoose.model("Visitor", visitorSchema);

module.exports = Visitor;

