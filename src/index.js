require("dotenv").config();
const app = require("./server");
require("./database");


app.listen(app.get("port"), () => {
  console.log(">>> Servidor activo y corriendo en el port: ", app.get("port"));
});
