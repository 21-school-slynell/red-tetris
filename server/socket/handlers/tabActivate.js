export default function handle(payload, callback) {
    this.socket.data.tabIsActive = payload.isVisible;

    if (callback) {
        callback({ result: true });
    }
}
