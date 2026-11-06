export function initializeSockets(io) {
    io.on('connection', (socket) => {
        console.log(`Client connected over WebSocket channel: ${socket.id}`);

        
        socket.on('join_user_channel', (userId) => {
            if (userId) {
                socket.join(userId.toString());
                console.log(`WebSocket Client attached to Private Room: ${userId}`);
            }
        });

        socket.on('disconnect', () => {
            console.log(`Client split communication lines: ${socket.id}`);
        });
    });
}
