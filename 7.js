var through = require("through2");
var http = require("http");
http.createServer(function(req,res){
		req.pipe(through(function(buffer,encoding,next){
				this.push(buffer.toString().toUpperCase());
				next();
			},function(done){done();})).pipe(res);
	}
).listen(process.argv[2])
