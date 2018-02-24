var split = require("split");
var through = require("through2");
var i = 1;
process.stdin.pipe(split()).pipe(through(
function (buffer, encoding, next){
		i++;
		if(i%2)
			this.push((buffer.toString()).toUpperCase() + '\n');
		else 
			this.push((buffer.toString()).toLowerCase() + '\n');
		next();
	}
),function(done){done();}).pipe(process.stdout);
