const _ = require('underscore');

function Borrow(coincheck) {
    this._coincheck = coincheck;
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
        return this._coincheck.request('post', this.urlRoot, arr);
    },
    matches: function (params) {
        return this._coincheck.request('get', this.urlRoot + '/matches', params);
    },
    repay: function (params) {
        var arr = _.extend({
            data: {
                id: null
            }
        }, params);
        return this._coincheck.request('post', this.urlRoot + '/repay', arr);
    }
};

exports.Borrow = Borrow;