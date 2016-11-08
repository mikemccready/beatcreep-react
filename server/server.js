// server.js
const http = require('http');

const PORT = 3000;

const handleReq = (req, res) => {
	res.end('reponding ', req.url)
}

const app = http.createServer(handleReq);

app.listen(PORT, () => {
	console.log('server listening on port ', PORT)
})