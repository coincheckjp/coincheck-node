const _ = require('underscore');

function Order(coinCheck) {
    this._coinCheck = coinCheck;
}

Order.prototype = {
    urlRoot: '/api/exchange/orders',
    create: function(params) {
        return this._coinCheck.request('post', this.urlRoot, params);
    },
    cancel: function(params) {
        var arr = _.extend({
            data: {
                id: null
            }
        }, params);
        return this._coinCheck.request('delete', this.urlRoot + '/' + arr.data.id, arr);
    },
    opens: function(params) {
        return this._coinCheck.request('get', this.urlRoot + '/opens', params);
    },
    transactions: function(params) {
        return this._coinCheck.request('get', this.urlRoot + '/transactions', params);
    }
};

exports.Order = Order;