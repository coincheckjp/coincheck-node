function OrderBook(coinCheck) {
    this._coinCheck = coinCheck;
}

OrderBook.prototype = {
    urlRoot: '/api/order_books',
    all: function(params){
        return this._coinCheck.request('get', this.urlRoot, params);
    }
};

exports.OrderBook = OrderBook;