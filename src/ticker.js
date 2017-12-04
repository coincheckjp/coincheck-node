function Ticker(coinCheck) {
    this._coinCheck = coinCheck;
}

Ticker.prototype = {
    urlRoot: '/api/ticker',
    all: function(params) {
        return this._coinCheck.request('get', this.urlRoot, params);
    }
};

exports.Ticker = Ticker;