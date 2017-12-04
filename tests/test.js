'use strict'

var Coincheck = require('../src/coin_check.js');

const {ACCESS_KEY, API_SECRET} = process.env;
const cc = new Coincheck.Coincheck(ACCESS_KEY, API_SECRET);

var params = {
    options: {
        success: function(data, response, params) {
            console.log('success', data);
        },
        error: function(error, response, params) {
            console.log('error', error);
        }
    }
};

/** Public API */
cc.ticker.all(params);
cc.trade.all(params);
cc.orderBook.all(params);

/** Private API */
// params['data'] = {
//     rate: 2850,
//     amount: 0.00508771,
//     order_type: 'buy',
//     pair: 'btc_jpy'
// }
// cc.order.create(params);
// cc.order.opens(params);
// params['data'] = {
//     id: 2953613
// }
// cc.order.cancel(params);
// cc.order.transactions(params);

cc.leverage.positions(params);

// cc.account.balance(params);
// cc.account.leverage_balance(params);
// cc.account.info(params);

// params['data'] = {
//     address: '1Gp9MCp7FWqNgaUWdiUiRPjGqNVdqug2hY',
//     amount: '0.0002'
// };
// cc.send.create(params);
// params['data'] = {
//     currency: 'BTC'
// };
// cc.send.all(params);

// params['data'] = {
//     currency: 'BTC'
// };
// cc.deposit.all(params);
// params['data'] = {
//     id: 2222
// };
// cc.deposit.fast(params);

// cc.bank_account.all(params);
// params['data'] = {
//     bank_name: "田中 田中",
//     branch_name: "田中 田中",
//     bank_account_type: "futsu",
//     number: "1234567",
//     name: "田中 田中"
// };
// cc.bank_account.create(params);
// params['data'] = {
//     id: 2222
// };
// cc.bank_account.delete(params);

// cc.withdraw.all(params);
// params['data'] = {
//     bank_account_id: 2222,
//     amount: 50000,
//     currency: 'JPY',
//     is_fast: false
// };
// cc.withdraw.create(params);
// params['data'] = {
//     id: 2222
// };
// cc.withdraw.cancel(params);

// params['data'] = {
//     amount: '0.01',
//     currency: 'BTC'
// };
// cc.borrow.create(params);
// cc.borrow.matches(params);
// params['data'] = {
//     id: '1135'
// };
// cc.borrow.repay(params);

// params['data'] = {
//     amount: 100,
//     currency: 'JPY'
// };
// cc.transfer.to_leverage(params);
// params['data'] = {
//     amount: 100,
//     currency: 'JPY'
// };
// cc.transfer.from_leverage(params);
