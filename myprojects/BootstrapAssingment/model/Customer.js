function CustomerDTO(id, name, address, number) {
    var __id = id;
    var __name = name;
    var __address = address;
    var __number = number;

    this.getCustomerId = function () {
        return __id;
    }

    this.setCustomerId = function (v) {
        __id = v;
    }

    this.getCustomerName = function () {
        return __name;
    }

    this.setCustomerName = function (v) {
        __name = v;
    }

    this.getCustomerAddress = function () {
        return __address;
    }

    this.setCustomerAddress = function (v) {
        __address = v;
    }

    this.getCustomerNumber = function () {
        return __number;
    }

    this.setCustomerNumber = function (v) {
        __number = v;
    }

}