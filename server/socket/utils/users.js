export const addUser = ({ io, ...user }) => {
  if (!Array.isArray(io.users)) {
    // eslint-disable-next-line no-param-reassign
    io.users = [];
  }
  if (io.users.find((obj) => obj.login === user.login)) {
    return { error: 'Dublicate login' };
  }
  io.users.push(user);
  return { user };
};

export const getUser = ({ socket, io }) => {
  if (io.users && io.users.length) {
    return io.users.find((user) => user.id === socket.id);
  }
  return [];
};

export const deleteUser = ({ socket, io }) => {
  if (io.users && io.users.length) {
    const index = io.users.findIndex((user) => user.id === socket.id);
    if (index !== -1) {
      return io.users.splice(index, 1)[0];
    }
  }
  return [];
};

export const getUsers = ({ room, io }) => {
  if (io.users && io.users.length) {
    return io.users.filter((user) => user.room === room);
  }
  return [];
};
