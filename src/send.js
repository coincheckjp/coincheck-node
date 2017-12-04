const _ = require('underscore');

function Send(coincheck) {
    this._coincheck = coincheck;
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
        return this._coincheck.request('post', this.urlRoot, params);
    },
    all: function(params) {
        var arr = _.extend({
            data: {
                currency: null
            }
        }, params);
        return this._coincheck.request('get', this.urlRoot, arr);
    }
};

exports.Send = Send;