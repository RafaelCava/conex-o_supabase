const express = require('express');
const routes = require('./routes');
const app = express()

app.use(express.json({ limit: "10mb" }));
app.use(routes)

module.exports = app