const _ = require('underscore');

function Transfer(coincheck) {
    this._coincheck = coincheck;
}

Transfer.prototype = {
    urlRoot: '/api/exchange/transfers',
    to_leverage: function(params) {
        var arr = _.extend({
            data: {
                amount: null,
                currency: null
            }
        }, params);
        return this._coincheck.request('post', this.urlRoot + '/to_leverage', arr);
    },
    from_leverage: function(params) {
        var arr = _.extend({
            data: {
                amount: null,
                currency: null
            }
        }, params);
        return this._coincheck.request('post', this.urlRoot + '/from_leverage', arr);
    }
};

exports.Transfer = Transfer;