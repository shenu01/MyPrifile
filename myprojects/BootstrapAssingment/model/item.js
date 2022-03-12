function ItemDTO(id,name,price,qty){
    var __id=id;
    var __name=name;
    var __qty=qty;
    var __price=price;


    this.getItemId = function () {
        return __id;
    }

    this.setItemId = function (v) {
        __id = v;
    }

    this.getItemName = function () {
        return __name;
    }

    this.setItemName = function (v) {
        __name = v;
    }
    this.getItemQty = function () {
        return __qty;
    }

    this.setItemQty = function (v) {
        __qty = v;
    }

    this.getItemPrice = function () {
        return __price;
    }

    this.setItemPrice = function (v) {
        __price = v;
    }





}