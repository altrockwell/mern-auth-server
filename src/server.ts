import https from 'https';
import fs from 'fs';
import path from 'path';
import app from './app';

const PORT = 8000 || process.env.SERVER_PORT;

//
const server = https.createServer(
	{ key: fs.readFileSync('key.pem'), cert: fs.readFileSync('cert.pem') },
	app
);

server.listen(PORT, () => {
	console.log(`Server listening to port https://localhost:${PORT}`);
});
