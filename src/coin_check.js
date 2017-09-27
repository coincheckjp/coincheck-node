var fs = require('fs');
var path = require('path');
var https = require('https');
var querystring = require('querystring');
var crypto = require('crypto');
var utils = require('./utils.js');

var Ticker = require('./ticker.js');
var Trade = require('./trade.js');
var OrderBook = require('./order_book.js');
var Order = require('./order.js');
var Leverage = require('./leverage.js');
var Account = require('./account.js');
var Send = require('./send.js');
var Deposit = require('./deposit.js');
var BankAccount = require('./bank_account.js');
var Withdraw = require('./withdraw.js');
var Borrow = require('./borrow.js');
var Transfer = require('./transfer.js');

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
    VERSION: '0.1.0',

    apiBase: 'coincheck.jp',
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
        this._headers = utils.extend(this._headers, {
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

        if (method == 'get' && utils.isEmpty(paramData) === false) {
            path = path + '?' + querystring.stringify(paramData);
            paramData = {};
        }

        this.setSignature(path, paramData);

        if (method == 'post' || method == 'delete') {
            this._headers = utils.extend(this._headers, {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(JSON.stringify(paramData))
            });
        }

        req_params = {
            host: this.apiBase,
            port: 443,
            path: path,
            method: method,
            headers: this._headers
        };
        //console.info(req_params);

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
