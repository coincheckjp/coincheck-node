function Trade(coincheck) {
    this._coincheck = coincheck;
}

Trade.prototype = {
    urlRoot: '/api/trades',
    all: function(params) {
        return this._coincheck.request('get', this.urlRoot, params);
    }
};

exports.Trade = Trade;