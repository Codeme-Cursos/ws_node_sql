const express = require("express");
const http = require("http");
const app = express();
const { PORT } = process.env;
// Routes
const userRoutes = require("./routes/users.route");

app.use(express.json());

// Routes
const prefix = '';
app.use(prefix, userRoutes);
app.get("/", (req, res) => {
  res.send("Página de inicio");
});

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
