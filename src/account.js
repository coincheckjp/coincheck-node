function Account(coinCheck) {
    this._coinCheck = coinCheck;
}

Account.prototype = {
    urlRoot: '/api/accounts',
    balance : function (params) {
        return this._coinCheck.request('get', this.urlRoot + '/balance', params);
    },
    leverage_balance : function (params) {
        return this._coinCheck.request('get', this.urlRoot + '/leverage_balance', params);
    },
    info : function (params) {
        return this._coinCheck.request('get', this.urlRoot, params);
    }
};

exports.Account = Account;