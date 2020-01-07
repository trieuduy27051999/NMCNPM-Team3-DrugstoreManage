module.exports = function Cart(oldCart) {
  this.items = oldCart.items || {};
  this.totalQty = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;
  this.numItems = oldCart.numItems || 0;

  this.add = (item, id) => {
    const itemQty = qty ? qty : 1;
    var storeItem = this.items[id];
    if (!storeItem) {
      storeItem = this.items[id] = {
        TENSP: item.TENSP,
        price: item.GIA
      };
    }
    this.totalQty++;
    this.totalPrice += storeItem.GIA;
  };

  this.deleteItem = id => {
    var storeItem = this.items[id];
    this.totalQty--;
    this.totalPrice -= storeItem.GIA;
    delete this.items[id];
  };

  this.generateArray = () => {
    var arr = [];
    for (var id in this.items) {
      arr.push(this.items[id]);
    }
    return arr;
  };
};
