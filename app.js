const express = require("express");
const users = require("./api");

const app = express();
const PORT = 5000;

//allow body | body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET REQUEST
app.get(`/api/user`, (req, res) => {
  res.json(users);
});

// POST REQUEST
app.post("/api/user", (req, res) => {
  console.log("object");
  const body = req.body;
  const data = {
    id: req.body.id,
    name: req.body.name,
    email: req.body.email,
    contact: req.body.contact,
  };

  users.push(data);
  res.send(data)
});

// // PUT REQUEST
app.put("/api/user/:id", (req , res)=>{
    const  {id}  = req.params;
    const body = req.body;
    // res.send(id);
    let index = users.findIndex(({ id }) => {
     return id === req.params.id;
    });
    console.log(index, "index");//index no
    let updateData = {id, ...body};
    users[index]=updateData;
    res.send(updateData)
});

// // DELETE REQUEST
app.delete("/api/user/:id", (req, res) => {
  const { id } = req.params;
  res.send(id);
  const itemIndex = users.findIndex(({ id }) => id === req.params.id);
  // console.log(itemIndex); //index no of an array element
  if (itemIndex >= 0) {
    users.splice(itemIndex, 1);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on localhost ${PORT}`);
});
