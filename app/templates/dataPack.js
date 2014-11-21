var DataPack = function() {
	this.$id = "dataPack";
	this.$consts = null;
}

DataPack.prototype.packOk = function(result) {
	return {
		code: this.$consts.CODE_OK,
		result: result
	}
}

DataPack.prototype.packFailure = function(message) {
	return {
		code: this.$consts.CODE_ERROR,
		message: message
	}
}

DataPack.prototype.unpackResultOk = function(res) {
	try {
		res = JSON.parse(res);
		var code = res['code'];

		if (code && code === this.$consts.CODE_OK) {
			return true;
		} else {
			return false;
		}
	} catch (e) {
		return false;
	}
}

module.exports = DataPack;