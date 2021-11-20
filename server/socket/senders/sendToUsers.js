import { createUserEventStatus } from '../config';

export async function send(userIds, event, payload, callback) {
    const { io } = this;
    const statuses = [];
    let connectedUsers = io.of('/').adapter.rooms;

    for (const userId of userIds) {
        if (!connectedUsers.has(`user:${userId}`)) {
            statuses.push(createUserEventStatus(userId, 'User is not connected'));
        } else {
            io.to(`user:${userId}`).emit(event, payload, callback);
            statuses.push(createUserEventStatus(userId));
        }
    }

    return statuses;
}
