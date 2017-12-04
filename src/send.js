const _ = require('underscore');

function Send(coinCheck) {
    this._coinCheck = coinCheck;
}

Send.prototype = {
    urlRoot: '/api/send_money',
    create: function(params) {
        var arr = _.extend({
            data: {
                address: null,
                amount: null
            }
        }, params);console.info(arr);
        return this._coinCheck.request('post', this.urlRoot, params);
    },
    all: function(params) {
        var arr = _.extend({
            data: {
                currency: null
            }
        }, params);
        return this._coinCheck.request('get', this.urlRoot, arr);
    }
};

exports.Send = Send;