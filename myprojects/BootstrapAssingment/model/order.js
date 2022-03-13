function Order(oid,odate,OcustID,price) {
    var __Oid=oid;
    var __Odate=odate;
    var __OcustID=OcustID;
    var __OPrice=price;

    this.getOrderId=function () {
        return __Oid;
    }
    this.getOrderDate=function () {
        return __Odate;
    }
    this.getOrder_CustomerID=function () {
        return __OcustID;
    }
    this.getOrderPrice=function () {
        return __OPrice;
    }

    this.setOrderId=function (id) {
        __Oid=id;
    }
    this.setOrderDate=function (date) {
        __Odate=date;
    }
    this.setOrder_CustomerID=function (custId) {
        __OcustID=custId;
    }
    this.setOrderPrice=function (price) {
        __OPrice=price;
    }
}
