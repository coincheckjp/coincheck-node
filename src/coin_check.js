'use strict'

const fs = require('fs');
const path = require('path');
const https = require('https');
const querystring = require('querystring');
const crypto = require('crypto');
const _ = require('underscore');

const Ticker = require('./ticker.js');
const Trade = require('./trade.js');
const OrderBook = require('./order_book.js');
const Order = require('./order.js');
const Leverage = require('./leverage.js');
const Account = require('./account.js');
const Send = require('./send.js');
const Deposit = require('./deposit.js');
const BankAccount = require('./bank_account.js');
const Withdraw = require('./withdraw.js');
const Borrow = require('./borrow.js');
const Transfer = require('./transfer.js');

function CoinCheck(accessKey, secretKey, options) {
    this.accessKey = accessKey;
    this.secretKey = secretKey;

    /** Public API */
    this.ticker = new Ticker.Ticker(this);
    this.trade = new Trade.Trade(this);
    this.orderBook = new OrderBook.OrderBook(this);

    /** Private API */
    this.order = new Order.Order(this);
    this.leverage = new Leverage.Leverage(this);
    this.account = new Account.Account(this);
    this.send = new Send.Send(this);
    this.deposit = new Deposit.Deposit(this);
    this.bank_account = new BankAccount.BankAccount(this);
    this.withdraw = new Withdraw.Withdraw(this);
    this.borrow = new Borrow.Borrow(this);
    this.transfer = new Transfer.Transfer(this);
}

CoinCheck.prototype = {
    VERSION: '0.2.0',

    apiBase: 'coincheck.com',
    accessKey: null,
    secretKey: null,

    /** @var Ticker */
    _ticker: null,
    /** @var $Trade */
    _trade: null,
    /** @var OrderBooks */
    _orderBook: null,

    /** @var Order */
    _order: null,
    /** @var Leverage */
    _leverage: null,
    /** @var Account */
    _account: null,
    /** @var Send */
    _send: null,
    /** @var Deposit */
    _deposit: null,
    /** @var BankAccount */
    _bank_account: null,
    /** @var Withdraw */
    _withdraw: null,
    /** @var Borrow */
    _borrow: null,
    /** @var Transfer */
    _transfer: null,
    _headers: {},

    setSignature: function (path, obj) {
        var nonce, url, message, signature;

        nonce = new Date().getTime();
        url = 'https://' + this.apiBase + path;
        message = nonce + url + ((Object.keys(obj).length > 0) ? JSON.stringify(obj) : '');
        signature = crypto.createHmac('sha256', this.secretKey).update(message).digest('hex');
        this._headers = _.extend(this._headers, {
            'ACCESS-KEY': this.accessKey,
            'ACCESS-NONCE': nonce,
            'ACCESS-SIGNATURE': signature
        });

    },
    request: function (method, path, params) {
        var paramData, options, req, success, error;

        params = params || {};
        paramData = params.data ? params.data : {};
        options = params.options ? params.options : {};

        if (method == 'get' && _.isEmpty(paramData) === false) {
            path = path + '?' + querystring.stringify(paramData);
            paramData = {};
        }

        var headers = _.extend(this._headers, {
            'Content-Type': 'application/json',
            'User-Agent': `NodeCoinCheckClient v${CoinCheck.prototype.VERSION}`
        });

        this.setSignature(path, paramData);

        if (method == 'post' || method == 'delete') {
            headers = _.extend(JSON.parse(JSON.stringify(headers)), {
                'Content-Length': Buffer.byteLength(JSON.stringify(paramData))
            });
        }

        let req_params = {
            host: this.apiBase,
            port: 443,
            path: path,
            method: method,
            headers: headers
        };
        // console.info(req_params);

        error = options.error;
        req = https.request(req_params, function(response) {
            // console.info('headers:', response.headers);
            // console.info('statusCode:', response.statusCode);
            var data = '';

            //another chunk of data has been recieved, so append it to `str`
            response.on('data', function (chunk) {
                data += chunk;
            });

            success = options.success;
            //the whole response has been recieved, so we just print it out here
            response.on('end', function () {
                if (response.statusCode == 200) {
                    if (success) {
                        success.call(options.context, data, response, options);
                    }
                } else if (error) {
                    error.call(options.context, data, response, options);
                }
            });
        });
        req.write(JSON.stringify(paramData));
        options.error = function(e) {
            // console.info('into error', e);
            if (error) {
                error.call(options.context, e, options);
            }
        };
        req.on('error', options.error);
        req.end();
    }
};

exports.CoinCheck = CoinCheck;
