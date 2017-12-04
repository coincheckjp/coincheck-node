# coincheck

coincheck
The easiest Bitcoin Exchange in Japan
https://coincheck.jp/

## Installation

```
npm install coincheck
```

## Usage

```js
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

// 新規注文
// "buy" 指値注文 現物取引 買い
// "sell" 指値注文 現物取引 売り
// "market_buy" 成行注文 現物取引 買い
// "market_sell" 成行注文 現物取引 売り
// "leverage_buy" 指値注文 レバレッジ取引新規 買い
// "leverage_sell" 指値注文 レバレッジ取引新規 売り
// "close_long" 指値注文 レバレッジ取引決済 売り
// "close_short" 指値注文 レバレッジ取引決済 買い
params['data'] = {
    rate: 2850,
    amount: 0.00508771,
    order_type: 'buy',
    pair: 'btc_jpy'
}
coinCheck.order.create(params);

// 未決済の注文一覧
coinCheck.order.opens(params);

// 注文のキャンセル
params['data'] = {
    id: 2953613
}
coinCheck.order.cancel(params);

// 取引履歴
coinCheck.order.transactions(params);

// ポジション一覧
coinCheck.leverage.positions(params);

// 残高
coinCheck.account.balance(params);

// レバレッジアカウントの残高
coinCheck.account.leverage_balance(params);

// アカウント情報
coinCheck.account.info(params);

// ビットコインの送金
params['data'] = {
    address: '1Gp9MCp7FWqNgaUWdiUiRPjGqNVdqug2hY',
    amount: '0.0002'
};
coinCheck.send.create(params);

// ビットコインの送金履歴
params['data'] = {
    currency: 'BTC'
};
coinCheck.send.all(params);

// ビットコインの受け取り履歴
params['data'] = {
    currency: 'BTC'
};
coinCheck.deposit.all(params);

// ビットコインの高速入金
params['data'] = {
    id: 2222
};
coinCheck.deposit.fast(params);

// 銀行口座一覧
coinCheck.bank_account.all(params);

// 銀行口座の登録
params['data'] = {
    bank_name: "田中 田中",
    branch_name: "田中 田中",
    bank_account_type: "futsu",
    number: "1234567",
    name: "田中 田中"
};
coinCheck.bank_account.create(params);
params['data'] = {
    id: 2222
};

// 銀行口座の削除
coinCheck.bank_account.delete(params);

// 出金履歴
coinCheck.withdraw.all(params);

// 出金申請の作成
params['data'] = {
    bank_account_id: 2222,
    amount: 50000,
    currency: 'JPY',
    is_fast: false
};
coinCheck.withdraw.create(params);

// 出金申請のキャンセル
params['data'] = {
    id: 2222
};
coinCheck.withdraw.cancel(params);

// 借入申請
params['data'] = {
    amount: '0.01',
    currency: 'BTC'
};
coinCheck.borrow.create(params);

// 借入中一覧
coinCheck.borrow.matches(params);

// 返済
params['data'] = {
    id: '1135'
};
coinCheck.borrow.repay(params);

// レバレッジアカウントへの振替
params['data'] = {
    amount: 100,
    currency: 'JPY'
};
coinCheck.transfer.to_leverage(params);

// レバレッジアカウントからの振替
params['data'] = {
    amount: 100,
    currency: 'JPY'
};
coinCheck.transfer.from_leverage(params);
```

## License
MIT
