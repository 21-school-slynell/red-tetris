export const addUser = ({ io, ...user }) => {
  if (!Array.isArray(io.users)) {
    // eslint-disable-next-line no-param-reassign
    io.users = [];
  }

  io.users.push(user);
  return { user };
};

export const getUser = ({ socket, io }) => io.users.find((user) => user.id === socket.id);

export const deleteUser = ({ socket, io }) => {
  const index = io.users.findIndex((user) => user.id === socket.id);
  if (index !== -1) return io.users.splice(index, 1)[0];
};

export const getUsers = ({ room, io }) => io.users.filter((user) => user.room === room);
