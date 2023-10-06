const app = require("./index");

const PORT = require("./config/port");

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
