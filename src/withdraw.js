var utils = require('./utils.js');

function Withdraw(coinCheck) {
    this._coinCheck = coinCheck;
}

Withdraw.prototype = {
    urlRoot: '/api/withdraws',
    create: function(params) {
        return this._coinCheck.request('post', this.urlRoot, params);       
    },
    all: function(params) {
        return this._coinCheck.request('get', this.urlRoot, params);  
    },
    cancel: function(params) {
        var arr = utils.extend({
            data: {
                id: null
            }
        }, params);
        return this._coinCheck.request('delete', this.urlRoot + '/' + arr.data.id, arr);
    }
};

exports.Withdraw = Withdraw;