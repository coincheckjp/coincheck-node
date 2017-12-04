const _ = require('underscore');

function Withdraw(coincheck) {
    this._coincheck = coincheck;
}

Withdraw.prototype = {
    urlRoot: '/api/withdraws',
    create: function(params) {
        return this._coincheck.request('post', this.urlRoot, params);       
    },
    all: function(params) {
        return this._coincheck.request('get', this.urlRoot, params);  
    },
    cancel: function(params) {
        var arr = _.extend({
            data: {
                id: null
            }
        }, params);
        return this._coincheck.request('delete', this.urlRoot + '/' + arr.data.id, arr);
    }
};

exports.Withdraw = Withdraw;