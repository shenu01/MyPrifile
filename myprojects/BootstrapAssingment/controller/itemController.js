clearItemValidation();

function clearItemValidation() {
    $("#validationTextItemId").css('display','none');
    $("#validationTextItemName").css('display','none');
    $("#validationTextItemQty").css('display','none');
    $("#validationTextItemPrice").css('display','none');
}



//Validation-Item.Id
let RegExItemID=/^(I00-)[0-9]{3,4}$/;
$("#txtitemid").keyup(function () {
    if($("#txtitemid").val()==''){
        $("#validationTextItemId").css('display','none');
        $("#txtitemid").css('border','1px solid #ced4da');
        return;
    }
    let input =$("#txtitemid").val();
    if(RegExItemID.test(input)){
        $("#txtitemid").css('border','2px solid green');
        $("#validationTextItemId").css('display','none');
    }
    else{
        $("#txtitemid").css('border','2px solid red');
        $("#validationTextItemId").css('display','block');
    }
});

//Validation-Item.Name
let RegExItemName=/^[A-z]{4,100}$/;
$("#txtitemname").keyup(function () {
    if($("#txtitemname").val()==''){
        $("#validationTextItemName").css('display','none');
        $("#txtitemname").css('border','1px solid #ced4da');
        return;
    }
    let input =$("#txtitemname").val();
    if(RegExItemName.test(input)){
        $("#txtitemname").css('border','2px solid green');
        $("#validationTextItemName").css('display','none');
    }
    else{
        $("#txtitemname").css('border','2px solid red');
        $("#validationTextItemName").css('display','block');
    }
});

//Validation-Item.Qty
let RegExItemQty=/^[0-9]{1,5}$/;
$("#txtqty").keyup(function () {
    if($("#txtqty").val()==''){
        $("#validationTextItemQty").css('display','none');
        $("#txtqty").css('border','1px solid #ced4da');
        return;
    }
    let input =$("#txtqty").val();
    if(RegExItemQty.test(input)){
        $("#txtqty").css('border','2px solid green');
        $("#validationTextItemQty").css('display','none');
    }
    else{
        $("#txtqty").css('border','2px solid red');
        $("#validationTextItemQty").css('display','block');
    }
});

//Validation-Item.Price
let RegExItemPrice=/^[0-9]{1,9}(.)[0-9]{2}$/;
$("#txtprice").keyup(function () {
    if($("#txtprice").val()==''){
        $("#validationTextItemPrice").css('display','none');
        $("#txtprice").css('border','1px solid #ced4da');
        return;
    }
    let input =$("#txtprice").val();
    if(RegExItemPrice.test(input)){
        $("#txtprice").css('border','2px solid green');
        $("#validationTextItemPrice").css('display','none');
    }
    else{
        $("#txtprice").css('border','2px solid red');
        $("#validationTextItemPrice").css('display','block');
    }
});

//-----------------------------------------------------------------------
$("#itemSaveOrUpdate").click(function () {
    //Add & Update Item
    let itemID = $("#txtitemid").val();
    let itemName = $("#txtitemname").val();
    let itemQty= $("#txtqty").val();
    let itemPrice = $("#txtprice").val();
    let nullVal='';
    if(itemID==nullVal||itemName==nullVal||itemQty==nullVal||itemPrice==nullVal){
        alert("Warning! Please Input Data Correctly To Continue...");
        return;
    }
    let index=isItemExists(itemID);
    if(index!=-1){
        alert("Item Updated");
        item[index].setItemName(itemName);
        item[index].setItemQty(itemQty);
        item[index].setItemPrice(itemPrice);
        loadAllItem()
        bindEventItemTable();
        return;
    }
    //Add To DB..
    let i1=new ItemDTO(itemID,itemName,itemQty,itemPrice);
    item.push(i1);
    loadAllItem();
    bindEventItemTable();
    clearFields();
});

//Search Function
$("#btnItemSearch").click(function () {
    //gather Address Or ID
    let property=$("#srcItemProperty").val();
    let index=isItemExists(property);
    if(index!=-1){
        alert("Item Found");
        $("#txtitemid").val(item[index].getItemId());
        $("#txtitemname").val(item[index].getItemName());
        $("#txtqty").val(item[index].getItemQty());
        $("#txtprice").val(item[index].getItemPrice());
        return;
    }
    alert("Item Not Found");
});

//Delete Function ..
$("#itemDelete").click(function () {
    let itemID=$("#txtitemid").val();
    let index=isItemExists(itemID);
    if(index!=-1){
        item.splice(index,1);
        loadAllItem();
        alert("Item "+itemID+" Deleted");
        clearFields();
        return;
    }
    alert("No Item Found");
});

//clear Fields
function clearFields() {
    $("#txtitemid").val('');
    $("#txtitemname").val('');
    $("#txtqty").val('');
    $("#txtprice").val('');
    $("#srcItemProperty").val('');
}
function isItemExists(id){
    let x=-1;
    for(let i=0;i<item.length;i++){
        if(item[i].getItemId()==id) {
            x = i;
        }
    }
    return x;
}
//Update From Here..
function loadAllItem() {
    $("#itemTable>tr").remove();
    for(let i=0;i<item.length;i++){
        let itemId=item[i].getItemId();
        let itemName=item[i].getItemName();
        let itemQty=item[i].getItemQty();
        let itemPrice=item[i].getItemPrice();
        let row = `<tr><td>${itemId}</td><td>${itemName}</td><td>${itemQty}</td><td>${itemPrice}</td></tr>`;
        $("#itemTable").append(row);
    }
}
function bindEventItemTable() {
    //bind the event after the row was added
    $("#itemTable>tr").off("click");
    $("#itemTable>tr").click(function(){
        let Row=$(this);
        let itemId = $(Row.children().get(0)).text();
        let itemName = $(Row.children().get(1)).text();
        let itemQty = $(Row.children().get(2)).text();
        let itemPrice = $(Row.children().get(3)).text();
        //Assignment
        $("#txtitemid").val(itemId);
        $("#txtitemname").val(itemName);
        $("#txtqty").val(itemQty);
        $("#txtprice").val(itemPrice);
    });
}