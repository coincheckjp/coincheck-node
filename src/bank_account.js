var utils = require('./utils.js');

function BankAccount(coinCheck) {
    this._coinCheck = coinCheck;
}

BankAccount.prototype = {
    urlRoot: '/api/bank_accounts',
    create : function (params) {
        var arr = utils.extend({
            data: {
                bank_name: null,
                branch_name: null,
                bank_account_type: null,
                number: null,
                name: null,
            }
        }, params);
        return this._coinCheck.request('post', this.urlRoot, arr);
    },
    all : function (params) {
        return this._coinCheck.request('get', this.urlRoot, params);
    },
    delete : function (params) {
        var arr = utils.extend({
            data: {
                id: null
            }
        }, params);
        return this._coinCheck.request('delete', this.urlRoot + '/' + arr.data.id, arr);
    }
};

exports.BankAccount = BankAccount;