const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const http = require("http");
const serverio = require("socket.io");
const path = require("path");

const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const io = serverio(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const _dirName = path.dirname("");
const buildPath = path.join(_dirName, "../client/dist");
app.use(express.static(buildPath));

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2dhdxvg.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const userCollection = client.db("taskDB").collection("users");
    const taskCollection = client.db("taskDB").collection("tasks");
    const subscriptionCollection = client
      .db("taskDB")
      .collection("subscriptions");

    const chatCollection = client.db("taskDB").collection("chats");

    //connection socket
    io.on("connection", (socket) => {
      socket.on("sendMessage", async (messageInfo, receiverEmail) => {
        // console.log(messageInfo);
        socket.broadcast.emit(receiverEmail, messageInfo);
        await chatCollection.insertOne(messageInfo);
      });
    });

    app.get("/users", async (req, res) => {
      try {
        const options = {
          projection: { password: 0 },
        };
        const users = await userCollection.find({}, options).toArray();
        res.status(200).send(users);
      } catch (err) {
        res.status(402).send({ err });
      }
    });

    app.get("/user/:id", async (req, res) => {
      try {
        const query = { _id: new ObjectId(req.params.id) };
        // console.log(query);

        const users = await userCollection.findOne(query);
        res.status(200).send(users);
      } catch (err) {
        res.status(402).send({ err });
      }
    });

    app.get("/users/:searchTxt", async (req, res) => {
      try {
        const options = {
          projection: { password: 0 },
        };
        const query = {
          name: {
            $regex: req.params.searchTxt,
            $options: "i",
          },
        };
        const users = await userCollection.find(query, options).toArray();
        res.status(200).send(users);
      } catch (err) {
        res.status(402).send({ err });
      }
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      const query = { email: user.email };
      // console.log(user);
      const existingUser = await userCollection.findOne(query);

      if (existingUser) {
        return res.send({ message: "User already exists", insertedId: null });
      }

      try {
        const result = await userCollection.insertOne(user);
        res.send({
          message: "User created successfully",
          insertedId: result.insertedId,
        });
      } catch (error) {
        console.error("Error:", error);
        res.status(400).json({ error: error.message });
      }
    });

    app.get("/tasks/:email", async (req, res) => {
      const email = req.params.email;
      const query = { userEmail: email };
      const result = await taskCollection.find(query).toArray();
      res.send(result);
    });

    app.post("/createTask", async (req, res) => {
      const task = req.body;
      const result = await taskCollection.insertOne(task);
      res.send(result);
    });

    app.patch("/tasks/:id", async (req, res) => {
      const id = req.params.id;
      const updatedTask = req.body;

      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          ...(updatedTask.taskName && { taskName: updatedTask.taskName }),
          ...(updatedTask.taskDescription && {
            taskDescription: updatedTask.taskDescription,
          }),
          ...(updatedTask.taskDate && { taskDate: updatedTask.taskDate }),
          ...(updatedTask.taskPriority && {
            taskPriority: updatedTask.taskPriority,
          }),
          ...(updatedTask.droppableId && {
            droppableId: updatedTask.droppableId,
          }),
        },
      };

      const result = await taskCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    app.patch("/update-tasks", async (req, res) => {
      const id = req.body;
      const filter = { _id: new ObjectId(id) };
      const query = await taskCollection.findOne(filter);
      if (query.droppableId === "droppable-1") {
        const update = { $set: { droppableId: "droppable-2" } };
        const result = await taskCollection.updateOne(filter, update);
        res.send(result);
      } else {
        const update = { $set: { droppableId: "droppable-3" } };
        const result = await taskCollection.updateOne(filter, update);
        res.send(result);
      }
    });

    app.delete("/:id", async (req, res) => {
      const id = req.params.id;
      // console.log(id);
      const query = { _id: new ObjectId(id) };
      const result = await taskCollection.deleteOne(query);
      res.send(result);
    });

    app.get("/subscriptions/:email", async (req, res) => {
      const email = req.params.email;
      // console.log(email);
      const query = { userEmail: email };
      const result = await subscriptionCollection.findOne(query);
      if (!result) {
        return res.send({ message: "No data found" });
      }
      res.send(result);
    });

    app.post("/subscriptions", async (req, res) => {
      const subscription = req.body;
      // console.log(subscription);
      const result = await subscriptionCollection.insertOne(subscription);
      res.send(result);
    });

    app.get("/messages", async (req, res) => {
      // console.log(req.query.m, req.query.f);
      const query = {
        $or: [
          { "sender.email": req.query.m, "receiver.email": req.query.f },
          { "receiver.email": req.query.m, "sender.email": req.query.f },
        ],
      };
      const options = {
        // Sort returned documents in ascending order by title (A->Z)
        sort: { time: 1 },
      };
      const result = await chatCollection.find(query, options).toArray();
      // console.log(result)

      res.send(result);
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("TODO App running at http://localhost:5000");
});

server.listen(port, () => {
  console.log(`TODO App listening on port ${port}`);
});
