const express = require("express");
const app = express();
const cors = require("cors");
const { connectDB } = require("./utils/db.config");
require("dotenv").config();
const { studentsRouter } = require("./routes/students.routes");
const { streamsRouter } = require("./routes/streams.routes");
const { subjectRouter } = require("./routes/subjects.routes");
const { marksRouter } = require("./routes/marks.routes");
const { keepAlive } = require("./keepalive");

app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  return res.status(200).json({ message: "This is Home Page of server" });
});

app.use("/student", studentsRouter);
app.use("/streams", streamsRouter);
app.use("/subjects", subjectRouter);
app.use("/marks", marksRouter);

app.listen(port, async () => {
  await connectDB();
  // keepAlive();
  console.log(`Server is running on http://localhost:${port}`);
});
