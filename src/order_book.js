function OrderBook(coincheck) {
    this._coincheck = coincheck;
}

OrderBook.prototype = {
    urlRoot: '/api/order_books',
    all: function(params){
        return this._coincheck.request('get', this.urlRoot, params);
    }
};

exports.OrderBook = OrderBook;