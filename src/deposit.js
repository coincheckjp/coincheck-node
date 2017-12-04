const _ = require('underscore');

function Deposit(coincheck) {
    this._coincheck = coincheck;
}

Deposit.prototype = {
    urlRoot: '/api/deposit_money',
    all: function (params) {
        var arr = _.extend({
            data: {
                currency: null
            }
        }, params);
        return this._coincheck.request('get', this.urlRoot, arr);
    },
    fast: function (params) {
        var arr = _.extend({
            data: {
                id: null
            }
        }, params);
        return this._coincheck.request('post', this.urlRoot + '/' + arr.data.id + '/fast', arr);
    }
};

exports.Deposit = Deposit;