var decipher = require("crypto").createDecipher(process.argv[2],process.argv[3]);
var parser = new require("tar").Parse();
parser.on('entry',function(e){
	if(e.type !== 'File')
			return;
			var hasher = require("crypto").createHash('md5',{encoding : 'hex'});
			e.pipe(hasher).pipe(require("through").through(null, function(){
					this.push(' '+e.path+'\n');
			})).pipe(process.stdout);
});
process.stdin.pipe(decipher).pipe(require('zlib').createGunzip()).pipe(parser);
