function Leverage(coincheck) {
    this._coincheck = coincheck;
}

Leverage.prototype = {
    urlRoot: '/api/exchange/leverage',
    positions: function (params) {
        return this._coincheck.request('get', this.urlRoot + '/positions', params);
    }
};

exports.Leverage = Leverage;