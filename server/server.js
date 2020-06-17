const server = require('http').createServer();
const io = require('socket.io')(server);
const axios = require('axios');

const sessions = {};

io.on('connection', socket => {
    const code = `${Math.floor(Math.random() *999999)}`.padStart(6, '0');
    sessions[code] = {
        socket,
        status: 'waiting_call'
    }
    socket.emit('code', code);
    socket.emit('status', sessions[code].status);

});

//short polling
setInterval(async function () {

    const response = (await axios({
        url_webHooks = '"https://api.pipedream.com/v1/sources/dc_76umeK/event_summaries',
        method: 'get',
        headers: {
            'Authorization': 'Bearer XXXXXXXXXXXXXXXXXXXXXX'
        },
    })).data;

    const whook = response.data;
    for (const w of whook) {
        const body = w.event.body;
        if (!body || body.ultimo_dtmf)
            continue;

        const code = Object.keys(sessions).find(x => x == body.ultimo_dtmf);
        if (!code) continue;


        sessions[code].status = 'received';
        sessions[code].socket.emit('status', sessions[code].status)
    }

}, 1000);


server.listen(3001);