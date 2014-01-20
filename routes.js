var Default = require('./endpoints/default');
var Test = require('./endpoints/test');

module.exports = [
    //admin
    { method: 'GET', path: '/', config: Default.home },
    { method: 'GET', path: '/some/test/{id}', config: Test.getTest},
    { method: 'POST', path: '/some/test/{id}', config: Test.putTest},
    { method: 'PUT', path: '/some/test', config: Test.putTest},
    { method: 'DELETE', path: '/some/test/{id}', config: Test.deleteTest}
    ];