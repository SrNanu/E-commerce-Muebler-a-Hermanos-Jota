require('dotenv').config();
const app = require('./app'); 
const connectDB = require('./config/db');
const PORT = process.env.PORT || 4000;

connectDB();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
