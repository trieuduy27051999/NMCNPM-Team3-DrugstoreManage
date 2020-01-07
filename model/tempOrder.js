module.exports = function Order(oldOrder) {
  this.items = oldOrder.items || {};
  this.totalQty = oldOrder.totalQty || 0;
  this.totalPrice = oldOrder.totalPrice || 0;

  this.add = (item, id) => {
    var storeItem = this.items[id];
    if (!storeItem) {
      storeItem = this.items[id] = {
        TENSP: item.TENSP,
        GIA: item.GIA,
        qty: 0,
        price: 0
      };
    }
    storeItem.qty++;
    storeItem.price = storeItem.GIA * storeItem.qty;
    this.totalQty++;
    this.totalPrice += storeItem.GIA;
  };

  this.deleteItem = id => {
    var storeItem = this.items[id];
    console.log(storeItem);
    this.totalQty -= storeItem.qty;
    this.totalPrice -= storeItem.price;
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
