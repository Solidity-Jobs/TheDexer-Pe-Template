const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const createError = require("http-errors");
const { DbService } = require("./db/index");
const app = express();
const dotenv = require("dotenv");
const { DEXER_BASE_URL } = require("./config");
const http = require("http");
dotenv.config();

const PORT = process.env.PORT || 5000;

//DB service connection
DbService.connect();

const corsOption = {
  origin: DEXER_BASE_URL,
  optionsSuccessStatus: 200,
  credentials: true,
};
app.disable("x-powered-by");
app.use(cors(corsOption));
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.set("trust proxy", true);

// Security
if (process.env.NODE_ENV === "production") {
  app.use(helmet());
}

//Routes
app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Welcome to Dexer",
  });
});
app.use("/", require("./routes/index"));

//Catch 404 and forard to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({
    statusCode: "ERROR",
    message: err.message,
  });
});

http.createServer(app).listen(PORT, () => console.log(`Dexer private server started on port http://0.0.0.0:${PORT}`));
