const express = require("express");
const app = express();
app.use(express.static("public"));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/html_files'));


app.get('/', (req, res) => {
	res.sendFile(__dirname + '/home.html');
})

app.get('/learn', (req, res) => {
	res.sendFile(__dirname + '/learn.html');
})

app.get('/quiz', (req, res) => {
	res.sendFile(__dirname + '/quiz.html');
})

app.get('/game', (req, res) => {
	res.sendFile(__dirname + '/game.html');
})

app.get('/end', (req, res) => {
	res.sendFile(__dirname + '/end.html');
})

app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/aboutus.html');
})

app.listen(3000, () => {
	console.log("LISTENING ON PORT 3000");
})

