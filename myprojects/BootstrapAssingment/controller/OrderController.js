
//Validation Order.Id
let RegExOrderId=/^O[0-9]{2}-[0-9]{3}$/;
$("#txtOrderId").keyup(function () {
    if($("#txtOrderId").val()==''){
        $("#txtOrderId").css('border','1px solid #ced4da');
        return;
    }
    let input=$("#txtOrderId").val();
    if(RegExOrderId.test(input)) {
        $("#txtOrderId").css('border','2px solid green');
    }
    else {
        $("#txtOrderId").css('border','2px solid red');
    }
});
//Validation Order.Customer
let RegExCusIdForSearch=/^(C00-)[0-9]{3,4}$/;
$("#txtCusIDForSearch").keyup(function () {
    if($("#txtCusIDForSearch").val()==''){
        $("#txtCusIDForSearch").css('border','1px solid #ced4da');
        $("#btnSearchCus").css('cursor','not-allowed');
        return;
    }
    let input =$("#txtCusIDForSearch").val();
    if(RegExCusIdForSearch.test(input)){
        $("#txtCusIDForSearch").css('border','2px solid green');
        $("#btnSearchCus").css('cursor','pointer');
    }
    else{
        $("#txtCusIDForSearch").css('border','2px solid red');
        $("#btnSearchCus").css('cursor','not-allowed');
    }
});

//Validation Order.Item
let RegExItemIdForSearch=/^(I00-)[0-9]{3,4}$/;
$("#txtItemCodeForSearch").keyup(function () {
    if($("#txtItemCodeForSearch").val()==''){
        $("#txtItemCodeForSearch").css('border','1px solid #ced4da');
        return;
    }
    let input =$("#txtItemCodeForSearch").val();
    if(RegExItemIdForSearch.test(input)){
        $("#txtItemCodeForSearch").css('border','2px solid green');
    }
    else{
        $("#txtItemCodeForSearch").css('border','2px solid red');
    }
});

//Validation Order.Qty
let RegExQtyForOrder=/^[0-9]{2,10}$/;
$("#txtQtyForAdd").keyup(function () {
    if($("#txtQtyForAdd").val()==''){
        $("#txtQtyForAdd").css('border','1px solid #ced4da');
        $("#btnAddItem").css('cursor','not-allowed');
        $("#btnAddItem").css('pointer-events','none');
        return;
    }
    if($("#txtQtyForAdd").val()>$("#txtItemQtyResult").val()){
        $("#txtQtyForAdd").css('border','2px solid red');
        $("#btnAddItem").css('cursor','not-allowed');
        $("#btnAddItem").css('pointer-events','none');
        return;
    }
    let input =$("#txtQtyForAdd").val();
    if(RegExQtyForOrder.test(input)){
        $("#txtQtyForAdd").css('border','2px solid green');
        $("#btnAddItem").css('cursor','pointer');
        $("#btnAddItem").css('pointer-events','auto');
    }
    else{
        $("#txtQtyForAdd").css('border','2px solid red');
        $("#btnAddItem").css('cursor','not-allowed');
        $("#btnAddItem").css('pointer-events','none');
    }
});

//Validation Order.cash
let RegExCashForOrder=/^[0-9]{1,9}|.([0-9]{2})$/;
$("#txtGivenCash").keyup(function () {
    if($("#txtGivenCash").val()==''){
        $("#txtGivenCash").css('border','1px solid #ced4da');
        $("#txtDiscount").attr('disabled','disabled');
        return;
    }
    let input =$("#txtGivenCash").val();
    if(RegExCashForOrder.test(input)){
        $("#txtGivenCash").css('border','2px solid green');
        $("#txtDiscount").removeAttr('disabled');
    }
    else{
        $("#txtGivenCash").css('border','2px solid red');
        $("#txtDiscount").attr('disabled','disabled');
    }
});

//Validation Order.Discount
let RegExDiscountTxt=/^[0-9]{1,2}|(.)[0-9]{1,2}$/;
$("#txtDiscount").keyup(function () {
    if($("#txtDiscount").val()==''){
        $("#txtDiscount").css('border','1px solid #ced4da');
        return;
    }
    let input =$("#txtDiscount").val();
    if(RegExDiscountTxt.test(input)){
        $("#txtDiscount").css('border','2px solid green');
        let discount=100-$("#txtDiscount").val();
        let subTotal=tempTotal*(discount/100);
        tempSubTotal=subTotal;
        $("#txtDisplaySubTotal").text('Sub Total: '+subTotal+'/=');
        let balance=$("#txtGivenCash").val()-subTotal;
        $("#txtIdBalance").val(balance);
    }
    else{
        $("#txtDiscount").css('border','2px solid red');
    }
});

//--------------------------------------------
//Search Customer And Fill..
$("#btnSearchCus").click(function () {
    if($("#txtCusIDForSearch").val()==''){
        alert("Please Add Data to Search");
        return;
    }
    searchCustomerById($("#txtCusIDForSearch").val());
});

//Search item and fill
$("#btnSearchItem").click(function () {
    if($("#txtItemCodeForSearch").val()==''){
        alert("Please Add Data to Search");
        return;
    }
    serchItemById($("#txtItemCodeForSearch").val());
});
function serchItemById(Itid) {
    for(let i=0;i<item.length;i++){
        if(item[i].getItemId()==Itid){
            $("#txtItemNameResult").val(item[i].getItemName());
            $("#txtItemPriceResult").val(item[i].getItemPrice());
            $("#txtItemQtyResult").val(item[i].getItemQty());

            return;
        }
    }
}

function searchCustomerById(id) {
    for(let i=0;i<customer.length;i++){
        if(customer[i].getCustomerId()==id){
            $("#txtCusNameResult").val(customer[i].getCustomerName());
            $("#txtCusAddressResult").val(customer[i].getCustomerAddress());
            $("#txtCusSalaryResult").val(customer[i].getCustomerNumber());
            return;
        }
    }
}



//Fill Table With Items..
let tempTotal=0;
let tempSubTotal=0;
$("#btnAddItem").click(function () {
    //Logic For Add Item To Table.
    let ItemTot=$("#txtItemPriceResult").val() * $("#txtQtyForAdd").val();
    tempTotal=tempTotal+ItemTot;
    let rowItem = `<tr><td>${$("#txtItemCodeForSearch").val()}</td><td>${$("#txtItemNameResult").val()}</td><td>${$("#txtItemPriceResult").val()}</td><td>${$("#txtQtyForAdd").val()}</td><td>${ItemTot}</td></tr>`;
    $("#itemTableForViewOnOrder").append(rowItem);
    $("#txtDisplayTotal").text('Total: '+tempTotal+'/=');
    let newQtyForDb=$("#txtItemQtyResult").val()-$("#txtQtyForAdd").val();
    $("#txtItemQtyResult").val(newQtyForDb);
    let indexForReduce=isItemExists($("#txtItemCodeForSearch").val());
    if(indexForReduce!=-1){
        item[indexForReduce].setItemQty(newQtyForDb);
        loadAllItem();
        bindEventItemTable()
        return;
    }
});
//Purchase Btn
$("#btnPurchase").click(function () {
    if($("#txtOrderId").val()!=''&&$("#txtOrderDate").val()!=''&&$("#txtCusIDForSearch").val()!=''&&$("#txtItemCodeForSearch").val()!=''&&$("#txtGivenCash").val()!=''){
        let OrderIDdb=$("#txtOrderId").val();
        let OrderDatedb=$("#txtOrderDate").val();
        let OrderCustID=$("#txtCusIDForSearch").val();
        let OrderPrice=tempSubTotal;
        if(isOrderExists(OrderIDdb)){
            alert("Order_ID Already Exists");
            return;
        }
        //adding to DB
        if (confirm("Confirm Order For:"+OrderCustID+" Order Price: "+tempSubTotal+"/=")) {
            let o1=new Order(OrderIDdb,OrderDatedb,OrderCustID,OrderPrice);
            order.push(o1);
        } else {
            alert("Order Dismissed");
            return;
        }
    }
    else{
        alert("Please Insert Correct Data..");
        return;
    }
});
$("#btnRefresh").click(function () {
    newOrder();
});

function isOrderExists(o_id){
    for(let i=0;i<order.length;i++) {
        if(order[i].getOrderId()==o_id){
            return true;
        }
        else{
            return false;
        }
    }
}
function newOrder() {
    $("#itemTableForViewOnOrder>tr").remove();
    $("#txtOrderId").val('');
    $("#txtOrderDate").val('');
    $("#txtCusIDForSearch").val('');
    $("#txtCusNameResult").val('');
    $("#txtCusAddressResult").val('');
    $("#txtCusSalaryResult").val('');
    $("#txtItemCodeForSearch").val('');
    $("#txtItemNameResult").val('');
    $("#txtItemQtyResult").val('');
    $("#txtItemPriceResult").val('');
    $("#txtGivenCash").val('');
    $("#txtDiscount").val('');
    $("#txtIdBalance").val('');
}
