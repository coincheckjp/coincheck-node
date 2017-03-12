var CoinCheck = require('../src/coin_check.js');

var coinCheck = new CoinCheck.CoinCheck('ACCESS_KEY', 'API_SECRET');

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
coinCheck.ticker.all(params);
coinCheck.trade.all(params);
coinCheck.orderBook.all(params);

/** Private API */
// params['data'] = {
//     rate: 2850,
//     amount: 0.00508771,
//     order_type: 'buy',
//     pair: 'btc_jpy'
// }
// coinCheck.order.create(params);
// coinCheck.order.opens(params);
// params['data'] = {
//     id: 2953613
// }
// coinCheck.order.cancel(params);
// coinCheck.order.transactions(params);

// coinCheck.leverage.positions(params);

// coinCheck.account.balance(params);
// coinCheck.account.leverage_balance(params);
// coinCheck.account.info(params);

// params['data'] = {
//     address: '1Gp9MCp7FWqNgaUWdiUiRPjGqNVdqug2hY',
//     amount: '0.0002'
// };
// coinCheck.send.create(params);
// params['data'] = {
//     currency: 'BTC'
// };
// coinCheck.send.all(params);

// params['data'] = {
//     currency: 'BTC'
// };
// coinCheck.deposit.all(params);
// params['data'] = {
//     id: 2222
// };
// coinCheck.deposit.fast(params);

// coinCheck.bank_account.all(params);
// params['data'] = {
//     bank_name: "田中 田中",
//     branch_name: "田中 田中",
//     bank_account_type: "futsu",
//     number: "1234567",
//     name: "田中 田中"
// };
// coinCheck.bank_account.create(params);
// params['data'] = {
//     id: 2222
// };
// coinCheck.bank_account.delete(params);

// coinCheck.withdraw.all(params);
// params['data'] = {
//     bank_account_id: 2222,
//     amount: 50000,
//     currency: 'JPY',
//     is_fast: false
// };
// coinCheck.withdraw.create(params);
// params['data'] = {
//     id: 2222
// };
// coinCheck.withdraw.cancel(params);

// params['data'] = {
//     amount: '0.01',
//     currency: 'BTC'
// };
// coinCheck.borrow.create(params);
// coinCheck.borrow.matches(params);
// params['data'] = {
//     id: '1135'
// };
// coinCheck.borrow.repay(params);

// params['data'] = {
//     amount: 100,
//     currency: 'JPY'
// };
// coinCheck.transfer.to_leverage(params);
// params['data'] = {
//     amount: 100,
//     currency: 'JPY'
// };
// coinCheck.transfer.from_leverage(params);