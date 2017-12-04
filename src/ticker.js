function Ticker(coincheck) {
    this._coincheck = coincheck;
}

Ticker.prototype = {
    urlRoot: '/api/ticker',
    all: function(params) {
        return this._coincheck.request('get', this.urlRoot, params);
    }
};

exports.Ticker = Ticker;