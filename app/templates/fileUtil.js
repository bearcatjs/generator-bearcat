var path = require('path');
var fs = require('fs');

var FileUtil = function() {
	this.$id = "fileUtil";
}

FileUtil.prototype.writeFileSync = function(filepath, key, value) {
	fs.writeFileSync(filepath, key + ' ' + value + '\n');
}

FileUtil.prototype.appendFileSync = function(filepath, key, value) {
	fs.appendFileSync(filepath, key + ' ' + value + '\n');
}

FileUtil.prototype.appendFileChangeLine = function(filepath) {
	this.appendFileSync(filepath, "", "");
}

FileUtil.prototype.createFileSync = function(filepath, value) {
	fs.writeFileSync(filepath, value);
}

/**
 * FileUtil Check file suffix
 
 * @param {String} fn file name
 * @param {String} suffix suffix string, such as .js, etc.
 */
FileUtil.prototype.checkFileType = function(fn, suffix) {
	if (suffix.charAt(0) !== '.') {
		suffix = '.' + suffix;
	}

	if (fn.length <= suffix.length) {
		return false;
	}

	var str = fn.substring(fn.length - suffix.length).toLowerCase();
	suffix = suffix.toLowerCase();
	return str === suffix;
};

FileUtil.prototype.checkFileSize = function(filepath) {
	return fs.statSync(filepath).size;
}

FileUtil.prototype.md5File = function(filepath, cb) {
	var md5sum = crypto.createHash('md5');
	var r = fs.createReadStream(filepath);

	r.on('data', function(data) {
		md5sum.update(data);
	});

	r.on('end', function() {
		var str = md5sum.digest('hex');
		cb(null, str);
	});
}

/**
 * FileUtil Check isFile
 
 * @param  {String}  path 
 * @return {Boolean} true|false.
 */
FileUtil.prototype.isFile = function(filepath) {
	if (fs.existsSync(filepath)) {
		return fs.statSync(filepath).isFile();
	}
};

/**
 * FileUtil Check isDir
 
 * @param  {String}  path 
 * @return {Boolean} true|false.
 */
FileUtil.prototype.isDir = function(filepath) {
	if (fs.existsSync(filepath)) {
		return fs.statSync(filepath).isDirectory();
	}
};

FileUtil.prototype.mkDirSync = function(filepath) {
	return fs.mkdirSync(filepath);
}

/**
 * FileUtil get file name
 
 * @param  {String}  fp 
 * @param  {Number}  suffixLength
 * @return {String}  file name
 */
FileUtil.prototype.getFileName = function(fp, suffixLength) {
	var fn = path.basename(fp);
	if (fn.length > suffixLength) {
		return fn.substring(0, fn.length - suffixLength);
	}

	return fn;
};

FileUtil.prototype.readDirFiles = function(fpath, results) {
	var files = fs.readdirSync(fpath);

	for (var i = 0; i < files.length; i++) {
		var filepath = fpath + '/' + files[i];

		if (this.isDir(filepath)) {
			this.readDirFiles(filepath, results);
		}

		if (this.isFile(filepath)) {
			results.push(filepath);
		}
	}
}

module.exports = FileUtil;