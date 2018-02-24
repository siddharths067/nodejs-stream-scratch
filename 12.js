var duplex = require("duplexer2");
var through = require("through2").obj;

module.exports = function (counter){
	var counts = {};
	return duplex({writableObjectMode: true},through(proc,init),counter);
	function proc(obj, encoding, next){
		var country = obj.country;
		counts[country] = (counts[country] || 0) + 1;
		next();
	}
	function init(){
		counter.setCounts(counts);
		counts = {};
	}
}
