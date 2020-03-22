'use strict';

var _Dep = require('./Dep.js');

var _Dep2 = _interopRequireDefault(_Dep);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // import Watcher from "./Watcher/.js";


function observe(value, cb) {
    Object.keys(value).forEach(function (key) {
        return defineReactive(value, key, value[key], cb);
    });
}
function defineReactive(obj, key, val, cb) {
    var dep = new _Dep2.default();
    Object.defineProperty(obj, key, {
        enumberable: true,
        configurable: true,
        get: function get() {
            if (_Dep2.default.target) {
                dep.addSub(_Dep2.default.target);
            }
        },
        set: function set(newVal) {
            dep.notify();
        }
    });
}
function _proxy(data) {
    var that = this;
    Object.keys(data).forEach(function (key) {
        Object.defineProperty(that, key, {
            configurable: true,
            enumerable: true,
            get: function proxyGetter() {
                return that._data[key];
            },
            set: function proxySetter(val) {
                that._data[key] = val;
            }
        });
    });
}

var Vue = function Vue(options) {
    _classCallCheck(this, Vue);

    this._data = options.data;
    observe(this._data, options.render);
    _proxy.call(this, options.data); // 将data中数据直接代理到vm实例上
    // this.text = 'text-text'
    // let watcher = new Watcher(this)
};

var app = new Vue({
    el: '#app',
    data: {
        text: 'text',
        text2: 'text2'
    },
    render: function render() {
        console.log('render');
    }
});
_Dep2.default.target = null;

var test = function test() {
    return true;
};
