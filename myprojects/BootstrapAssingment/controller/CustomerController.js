

$("#btnSaveOrUpdate").click(function () {
    //gather customer information
    let customerID = $("#txtCuID").val();
    let customerName = $("#txtcuName").val();
    let customerAddress = $("#txtcuadres").val();
    let customerTP = $("#txtcuPNumber").val();
    let nullVal='';
    if(customerID==nullVal||customerName==nullVal||customerAddress==nullVal||customerTP==nullVal){
        alert("warning Please Input Data Correctly To Continue...");
        return;
    }
    let index=isExists(customerID);
    if(index!=-1){
        alert("Customer Updated");
        customer[index].setCustomerName(customerName);
        customer[index].setCustomerAddress(customerAddress);
        customer[index].setCustomerNumber(setCustomerNumber);
        loadAllCustomers()
        bindEvent();
        return;
    }
    //Add To DB..
    let c1=new CustomerDTO(customerID,customerName,customerAddress,customerTP);
    customer.push(c1);
    loadAllCustomers();
    bindEvent();
    clearFieldsCus();
});

//Search Function Search bar..
$("#btnSearch").click(function () {
    //gather Address Or ID
    let property=$("#srcCusID").val();
    let index=isExists(property,property);
    if(index!=-1){
        alert("Customer Found");
        $("#txtCuID").val(customer[index].getCustomerId());
        $("#txtCusName").val(customer[index].getCustomerName());
        $("#txtCusAddress").val(customer[index].getCustomerAddress());
        $("#txtCusTP").val(customer[index].getCustomerNumber());
        return;
    }
    alert("Customer Not Found");
});

//Delete Function
$("#btnDelete").click(function () {
    let customerID=$("#txtCuID").val();
    let index=isExists(customerID);
    if(index!=-1){
        customer.splice(index,1);
        loadAllCustomers();
        alert("Customer "+customerID+" Deleted");
        clearFieldsCus();
        return;
    }
    alert("No Customer Found");
});

function clearFieldsCus() {
    $("#txtCuID").val('');
    $("#txtCusName").val('');
    $("#txtCusAddress").val('');
    $("#txtCusTP").val('');
    $("#srcCusID").val('');
}

function isExists(id,address){
    let x=-1;
    for(let i=0;i<customer.length;i++){
        if(customer[i].getCustomerId()==id||customer[i].getCustomerAddress()==address) {
            x = i;
        }
    }
    return x;
}

function loadAllCustomers() {
    $("#customerTable>tr").remove();
    for(let i=0;i<customer.length;i++){
        let customerID=customer[i].getCustomerId();
        let customerName=customer[i].getCustomerName();
        let customerAddress=customer[i].getCustomerAddress();
        let customerTP=customer[i].getCustomerNumber();
        let row = `<tr><td>${customerID}</td><td>${customerName}</td><td>${customerAddress}</td><td>${customerTP}</td></tr>`;
        $("#customerTable").append(row);
    }

}
function bindEvent() {
    //bind the event after the row was added
    $("#customerTable>tr").off("click");
    $("#customerTable>tr").click(function(){
        let Row=$(this);
        let CustomerID = $(Row.children().get(0)).text();
        let CustomerName = $(Row.children().get(1)).text();
        let CustomerAddress = $(Row.children().get(2)).text();
        let CustomerTP = $(Row.children().get(3)).text();
        //Assignment
        $("#txtCuID").val(CustomerID);
        $("#txtCusName").val(CustomerName);
        $("#txtCusAddress").val(CustomerAddress);
        $("#txtCusTP").val(CustomerTP);
    });
}
