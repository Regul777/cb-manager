module.exports = function () {

	var timeouts = {}
	var intervals = {}
	var callbacks = []

	var globalId = 0;

	function createTimeInstance(timeFn, list, fn, ms, repeats, args) {
		if (!fn) throw new Error('Callback is empty')

		ms = ms || 0
		var id = globalId++;
		repeats = (repeats === undefined ? -1 : repeats);

		var tid = timeFn(function () {
			if (timeFn == setTimeout) {
				delete list[id]
			} else {
				if (repeats >= 0 && repeats-- == 0) {
					CallbackManager.clear(id)
					return
				}
			}
			fn.apply(global, args)
		}, ms)

		list[id] = tid

		return id
	}

	var CallbackManager = {
		timeout: function (fn, ms) {
			return createTimeInstance(setTimeout, timeouts, fn, ms, 0, [].slice.call(arguments).slice(2));
		},

		interval: function (fn, ms, repeats) {
			return createTimeInstance(setInterval, intervals, fn, ms, repeats, [].slice.call(arguments).slice(3));
		},

		callback: function(fn, context) {
			var args = [].slice.call(arguments).slice(2)
			context = (context === undefined ? global : context)
			var cb = function () {
				if (callbacks.indexOf(cb) > -1) {
					fn.apply(context, args)
				}
			};
			callbacks.push(cb)
			return cb
		},

		clear: function (target) {
			if (target in timeouts) {
				clearTimeout(timeouts[target])
				delete timeouts[target]
			} else if (target in intervals) {
				clearInterval(intervals[target])
				delete intervals[target]
			} else if (callbacks.indexOf(target) > -1) {
				callbacks.splice(callbacks.indexOf(target), 1)
			}
		},

		clearAllTimers: function () {
			for (var id in timeouts) {
				CallbackManager.clear(id)
			}
		},

		clearAllIntervals: function () {
			for (var id in intervals) {
				CallbackManager.clear(id)
			}
		},

		clearAllCallbacks: function () {
			callbacks = [];
		},

		clearAll: function () {
			CallbackManager.clearAllTimers();
			CallbackManager.clearAllIntervals();
			CallbackManager.clearAllCallbacks();
		}
	}

	return CallbackManager
}