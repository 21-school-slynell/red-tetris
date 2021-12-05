/* eslint-disable no-param-reassign */

export const addUser = ({ login, room, id, io }) => {
  if (!Array.isArray(io.users)) {
    io.users = [];
  }

  const user = { id, login, room };
  io.users.push(user);
  return { user };
};

export const getUser = ({ socket, io }) => io.users.find((user) => user.id === socket.id);

export const deleteUser = ({ socket, io }) => {
  const index = io.users.findIndex((user) => user.id === socket.id);
  if (index !== -1) return io.users.splice(index, 1)[0];
};

export const getUsers = ({ room, io }) => io.users.filter((user) => user.room === room);
