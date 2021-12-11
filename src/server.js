const app = require('./index');
require('dotenv').config();

app.listen(process.env.PORT, () => console.log(`Server rodando na porta ${process.env.PORT}`))