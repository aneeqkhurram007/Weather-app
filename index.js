import express from "express";
import cors from "cors";
import mongoose from "mongoose";
const DB =
  "mongodb+srv://zurkoa999:aneeq12345@cluster0.kwkdl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const port = process.env.PORT || 9002;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
mongoose
  .connect(DB)
  .then(() => {
    console.log("connections established");
  })
  .catch((err) => console.log("no connection", err));
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
const User = new mongoose.model("User", userSchema);
// Routes
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      if (password === user.password) {
        res.send({ message: "Login Successful", user: user });
      } else {
        res.send({ message: "Password did not match" });
      }
    } else {
      res.send("User not registered");
    }
  });
});
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "User already registered" });
    } else {
      const user = new User({ name, email, password });
      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "Successfully Registered. Please Log In Now" });
        }
      });
    }
  });
});
if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
}
app.listen(port, () => console.log("Connected to the port"));
