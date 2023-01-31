const http = require('http');
const socketio = require('socket.io');
const port = 3001;

const server = http.createServer((req, res) => {
    res.end('Socket server');
})

server.listen(port, () => console.log("Server is running : http://localhost:" + port));

const io = socketio(server);

let rooms = {};

io.on('connection', (socket) => {
    let roomName;

    socket.on('join room', (uuid) => {
        socket.emit('player name', socket.id);
        const count = findRoomSize(io, uuid);
        if (!rooms[uuid]) {
            rooms[uuid] = {};
            rooms[uuid]["player1"] = socket.id;
            rooms[uuid]["player2"] = null;
            rooms[uuid]["player1Choice"] = null;
            rooms[uuid]["player2Choice"] = null;
            rooms[uuid]["round"] = 1;
        } else {
            if (rooms[uuid]["player1"] !== socket.id) {
                rooms[uuid]["player2"] = socket.id;
            }
        }

        if (count === 3) {
            socket.emit('player count error');
            return;
        }

        socket.join(uuid);
        roomName = uuid;

        io.to(uuid).emit('room size', count);
    })

    socket.on('choice', ({choice, room}) => {
        const player = findPlayerNumber(socket.id, rooms[room]);
        rooms[room][`${player}Choice`] = choice;

        socket.broadcast.to(room).emit('opponent choice');

        if (rooms[room]['player1Choice'] && rooms[room]['player2Choice']) {
            const winner = getWinner(rooms[room]['player1Choice'], rooms[room]['player2Choice']);
            console.log(winner)
            rooms[room]["player1Choice"] = null;
            rooms[room]["player2Choice"] = null;
            rooms[room]['round'] += 1;
            io.to(room).emit('round count', rooms[room]['round']);
            io.to(room).emit('result', {
                winner: winner === true ? rooms[room]['player1'] : rooms[room]['player2']
            });
        }
    });

    socket.on('leave room', (roomName) => {
        socket.leave(roomName);
        io.to(roomName).emit('room size', findRoomSize(io, roomName));
    })

    socket.on('disconnect', () => {
        socket.leave(roomName);
        io.to(roomName).emit('room size', findRoomSize(io, roomName));
    });
})

const findRoomSize = (io, roomName) => {
    const room = io.sockets.adapter.rooms.get(roomName);
    return room ? room.size : 0;
};

const findPlayerNumber = (id, room) => {
    return room['player1'] === id ? 'player1' : 'player2';
}

const getWinner = (playerOne, playerTwo) => {
    if (playerOne === playerTwo) return "DRAW";

    switch (playerOne) {
        case "ROCK":
            return playerTwo === "SCISSORS";
        case "PAPER":
            return playerTwo === "ROCK";
        case "SCISSORS":
            return playerTwo === "PAPER";
    }
}