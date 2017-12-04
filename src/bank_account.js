const _ = require('underscore');

function BankAccount(coincheck) {
    this._coincheck = coincheck;
}

BankAccount.prototype = {
    urlRoot: '/api/bank_accounts',
    create : function (params) {
        var arr = _.extend({
            data: {
                bank_name: null,
                branch_name: null,
                bank_account_type: null,
                number: null,
                name: null,
            }
        }, params);
        return this._coincheck.request('post', this.urlRoot, arr);
    },
    all : function (params) {
        return this._coincheck.request('get', this.urlRoot, params);
    },
    delete : function (params) {
        var arr = _.extend({
            data: {
                id: null
            }
        }, params);
        return this._coincheck.request('delete', this.urlRoot + '/' + arr.data.id, arr);
    }
};

exports.BankAccount = BankAccount;
