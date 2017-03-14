function Trade(coinCheck) {
    this._coinCheck = coinCheck;
}

Trade.prototype = {
    urlRoot: '/api/trades',
    all: function(params) {
        return this._coinCheck.request('get', this.urlRoot, params);
    }
};

exports.Trade = Trade;