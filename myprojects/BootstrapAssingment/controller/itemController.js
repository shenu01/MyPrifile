$("#itemSaveOrUpdate").click(function () {
    //gather customer information
    let itemID = $("#txtitemid").val();
    let itemName = $("#txtitemname").val();
    let itemQty= $("#txtqty").val();
    let itemPrice = $("#txtprice").val();
    let nullVal='';
    if(itemID==nullVal||itemName==nullVal||itemQty==nullVal||itemPrice==nullVal){
        alert("warning-Please Input Data Correctly To Continue..");
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

//Search Function Search bar..
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