const _ = require('underscore');

function Borrow(coinCheck) {
    this._coinCheck = coinCheck;
}

Borrow.prototype = {
    urlRoot: '/api/lending/borrows',
    create: function (params) {
        var arr = _.extend({
            data: {
                amount: null,
                currency: null
            }
        }, params);
        return this._coinCheck.request('post', this.urlRoot, arr);
    },
    matches: function (params) {
        return this._coinCheck.request('get', this.urlRoot + '/matches', params);
    },
    repay: function (params) {
        var arr = _.extend({
            data: {
                id: null
            }
        }, params);
        return this._coinCheck.request('post', this.urlRoot + '/repay', arr);
    }
};

exports.Borrow = Borrow;