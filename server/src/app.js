const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

const configRoutes = require("./routes/config.routes");

const leadRoutes = require("./routes/lead.routes");

const authRoutes = require("./routes/auth.routes");

const ownerConfigRoutes = require("./routes/owner-config.routes");

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Wantace API is running",
  });
});

app.use("/api/config", configRoutes);

app.use("/api/leads", leadRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/owner/config", ownerConfigRoutes);

module.exports = app;