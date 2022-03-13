clearValidation();
function clearValidation() {
    $("#validationTextId").css('display','none');
    $("#validationTextName").css('display','none');
    $("#validationTextAddress").css('display','none');
    $("#validationTextTp").css('display','none');
}

//Validation-Customer.Id
let RegExCusID=/^(C00-)[0-9]{3,4}$/;
$("#txtCuID").keyup(function () {
    if($("#txtCuID").val()==''){
        $("#validationTextId").css('display','none');
        $("#txtCuID").css('border','1px solid #ced4da');
        return;
    }
    let input =$("#txtCuID").val();
    if(RegExCusID.test(input)){
        $("#txtCuID").css('border','2px solid green');
        $("#validationTextId").css('display','none');
    }
    else{
        $("#txtCuID").css('border','2px solid red');
        $("#validationTextId").css('display','block');
    }
});
//Validation-Customer.Name
let RegExCusName=/^[A-z]{5,10}$/;
$("#txtcuName").keyup(function () {
    if($("#txtcuName").val()==''){
        $("#validationTextName").css('display','none');
        $("#txtcuName").css('border','1px solid #ced4da');
        return;
    }
    let input =$("#txtcuName").val();
    if(RegExCusName.test(input)){
        $("#txtcuName").css('border','2px solid green');
        $("#validationTextName").css('display','none');
    }
    else{
        $("#txtcuName").css('border','2px solid red');
        $("#validationTextName").css('display','block');
    }
});

//Validation-Customer.address
let RegExCusAddress=/^[A-z]{4,100}$/;
$("#txtcuadres").keyup(function () {
    if($("#txtcuadres").val()==''){
        $("#validationTextAddress").css('display','none');
        $("#txtcuadres").css('border','1px solid #ced4da');
        return;
    }
    let input =$("#txtcuadres").val();
    if(RegExCusAddress.test(input)){
        $("#txtcuadres").css('border','2px solid green');
        $("#validationTextAddress").css('display','none');
    }
    else{
        $("#txtcuadres").css('border','2px solid red');
        $("#validationTextAddress").css('display','block');
    }
});

//Validation-Customer.TP
let RegExCusTP=/^(07)[0-9]{8,9}$/;
$("#txtcuPNumber").keyup(function () {
    if($("#txtcuPNumber").val()==''){
        $("#validationTextTp").css('display','none');
        $("#txtcuPNumber").css('border','1px solid #ced4da');
        return;
    }
    let input =$("#txtcuPNumber").val();
    if(RegExCusTP.test(input)){
        $("#txtcuPNumber").css('border','2px solid green');
        $("#validationTextTp").css('display','none');
    }
    else{
        $("#txtcuPNumber").css('border','2px solid red');
        $("#validationTextTp").css('display','block');
    }
});

//----------------------------------------------------------------------------------------


$("#btnSaveOrUpdate").click(function () {
    //Add & Update Customer
    let customerID = $("#txtCuID").val();
    let customerName = $("#txtcuName").val();
    let customerAddress = $("#txtcuadres").val();
    let customerTP = $("#txtcuPNumber").val();
    let nullVal='';
    if(customerID==nullVal||customerName==nullVal||customerAddress==nullVal||customerTP==nullVal){
        alert("Warning! Please Input Data Correctly To Continue...");
        return;
    }
    let index=isExists(customerID);
    if(index!=-1){
        alert("Customer Updated");
        customer[index].setCustomerName(customerName);
        customer[index].setCustomerAddress(customerAddress);
        customer[index].setCustomerNumber(customerTP);
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
        $("#txtcuName").val(customer[index].getCustomerName());
        $("#txtcuadres").val(customer[index].getCustomerAddress());
        $("#txtcuPNumber").val(customer[index].getCustomerNumber());
        return;
    }
    alert("Customer Not Found");
    clearFieldsCus();
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
    $("#txtcuName").val('');
    $("#txtcuadres").val('');
    $("#txtcuPNumber").val('');
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
function searchCustomer(id) {
    for (var i = 0; i < customer.length; i++) {
        if (customer[i].getCustomerId() == id) {
            return customer[i];
        }
    }
}
