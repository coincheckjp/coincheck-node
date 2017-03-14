var utils = require('./utils.js');

function Deposit(coinCheck) {
    this._coinCheck = coinCheck;
}

Deposit.prototype = {
    urlRoot: '/api/deposit_money',
    all: function (params) {
        var arr = utils.extend({
            data: {
                currency: null
            }
        }, params);
        return this._coinCheck.request('get', this.urlRoot, arr);
    },
    fast: function (params) {
        var arr = utils.extend({
            data: {
                id: null
            }
        }, params);
        return this._coinCheck.request('post', this.urlRoot + '/' + arr.data.id + '/fast', arr);
    }
};

exports.Deposit = Deposit;