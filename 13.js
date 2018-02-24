var through = require("through");
var zlib = require("zlib");
var stream_combiner = require("stream-combiner");
var split = require("split")

module.exports = function (){
	var grouper = through(write,end);
	var current;
	
	function write(buffer){
		if(buffer.length == 0)return;
		var row = JSON.parse(buffer);
		if(row.type === 'genre'){
			if(current){
				this.push(JSON.stringify(current) + '\n');
			}
			current = {name : row.name , books : []};
		}
		else if(row.type === 'book'){
			current.books.push(row.name);
		}
		
	}
	function end(){
		if(current)
			this.push(JSON.stringify(current) + '\n');
		this.push(null);
	}
	return stream_combiner(split(),grouper,zlib.createGzip());

}
