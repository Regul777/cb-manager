var test = require('tape')
var CallbackManager = require('../')

test('Check timers', function(t) {
	t.plan(3)

	var cbm = CallbackManager()

	cbm.timeout(t.pass, 100, 'Simple timeout')
	cbm.interval(t.pass, 100, 2, 'Simple interval')

	t.timeoutAfter(300)

})

test('Check clear timers', function(t) {
	t.plan(1)

	var cbm = CallbackManager()

	var timeoutId = cbm.timeout(t.fail, 100)
	var intervalId = cbm.interval(t.fail, 100, -1)

	cbm.clear(timeoutId)
	cbm.clear(intervalId)

	setTimeout(t.pass, 200, 'Clear success')

})

test('Check callback', function(t) {
	t.plan(1)

	var cbm = CallbackManager()

	var cb = cbm.callback(function (value) {
		t.equal(value, 10)
	}, null, 10)

	cb();
	cbm.clear(cb);
	cb();

})

test('Check clearAll', function(t) {
	t.plan(1)

	var cbm = CallbackManager()

	var cb = cbm.callback(t.fail, null, 'Callback clear fail')
	cbm.timeout(t.fail, 100, 'Timeout clear tail')
	cbm.interval(t.fail, 100, -1, 'Interval clear tail')

	cbm.clearAll();

	cb();

	setTimeout(t.pass, 200, 'Everything is empty');

})