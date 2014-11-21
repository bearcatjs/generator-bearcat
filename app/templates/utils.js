var Utils = function() {
	this.$id = "utils";
}

Utils.prototype.invokeCallback = function(cb) {
	if (!!cb && typeof cb === 'function') {
		cb.apply(null, Array.prototype.slice.call(arguments, 1));
	}
};

Utils.prototype.requireNoCache = function(module) {
	delete require.cache[require.resolve(module)];
	return require(module);
}

module.exports = Utils;