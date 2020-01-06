const mongoose = require("mongoose");
const User = require("../model/user");

const urlConnect = `mongodb+srv://admin:admin@cluster0-ctxqq.mongodb.net/DrugStore?retryWrites=true&w=majority`;

//Connect to database

mongoose.connect(
  urlConnect,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  err => {
    if (err) throw err;
    console.log("Connect to create successfully!");
    const user = new User({
      username: "test2",
      password: "matkhau",
      name: "name312312312",
      phoneNumber: 012331231,
      address: "fjdsalfjalsdk321312312;"
    });
    user.save(err => {
      if (err) throw err;
      console.log("User successfully saved!");
    });
  }
);
