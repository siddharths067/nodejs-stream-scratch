var trumpet = require("trumpet");
var through = require("through2");
function to_upper(buffer, encoding, next){
	this.push(buffer.toString().toUpperCase());
	next();
}
var tr = trumpet();
process.stdin.pipe(tr).pipe(process.stdout);;

var stream = tr.select(".loud").createStream();
stream.pipe(through(to_upper)).pipe(stream);
