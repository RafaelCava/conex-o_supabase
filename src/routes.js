const express = require('express');
const { enviarImages, deletarImages } = require('./controllers/uploads');
const routes = express()

routes.route('/image/enviar')
  .post(enviarImages)
routes.route('/image/deletar')
  .delete(deletarImages)

module.exports = routes