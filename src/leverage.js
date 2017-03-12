function Leverage(coinCheck) {
    this._coinCheck = coinCheck;
}

Leverage.prototype = {
    urlRoot: '/api/exchange/leverage',
    positions: function (params) {
        return this._coinCheck.request('get', this.urlRoot + '/positions', params);
    }
};

exports.Leverage = Leverage;