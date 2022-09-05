const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
  return users;
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
  return users;
};

const getUser = (receiverId) => {
  const user = users.find((user) => user.userId === receiverId);
  return user;
};

io.on("connection", (socket) => {
  // when connect
  console.log("User connected");
  console.log({ users });

  // take userId and socket Id from user and add to real-time database
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  // send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const receiver = getUser(receiverId);
    io.to(receiver.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  // when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnect");
    const newUsers = removeUser(socket.id);
    io.emit("getUsers", newUsers);
  });
});
