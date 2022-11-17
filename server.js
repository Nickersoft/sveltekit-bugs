import http from 'http';

const server = http.createServer(function (req, res) {
	res.setHeader('Access-Control-Allow-Origin', 'http://example.com:5173');
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	res.setHeader(
		'set-cookie',
		'access_token=hello_world; Domain=example.com; Path=/; HttpOnly; SameSite=Strict'
	);
	res.setHeader('content-type', 'application/json; charset=utf-8');

	res.write('{ message: "Hello world" }');
	res.end();
});

server.listen(9090);

console.log('Node.js web server at port 9090 is running..');
