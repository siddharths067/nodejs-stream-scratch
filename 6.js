var concat = require("concat-stream");

var fs = require("fs");
process.stdin.pipe(concat(function (body){
	process.stdout.write(body.toString().split("").reverse().join("")+"\n");
}));
