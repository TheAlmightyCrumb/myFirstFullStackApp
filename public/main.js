console.log('Hello World');
let addButton = document.getElementById('addBtn'),
productName = document.getElementById('name'),
whoWantsIt = document.getElementById('author'),
productDescription = document.getElementById('description');
let productList;
addButton.addEventListener('click',getItem);
productName.addEventListener('focus',revertRedText);
let focusedAfterError,inEdit =false;
const onLoad = async() =>{
    const {data} = await axios.get('http://localhost:3002/products');
    console.log(data);
    productList = document.createElement('div');
    productList.id= "productContainer";
    document.body.appendChild(productList);
    console.log(data.length);
    addItem(data);
    // productName.disabled = true;
    // productName.value = 'newValue';
}
function revertRedText(){
    if(!focusedAfterError)
    {
        console.log(productName);
        productName.style.color = "rgb(82, 82, 202)";
        productName.value ='';
        focusedAfterError = true;
        console.log(productName);
    }
}

async function getItem(){
    let myArr = [{}], isOk = true;;
    const {data} = await axios.get('http://localhost:3002/products');
    myArr[0].id = productName.value;
    data.forEach(item => {
        if(item.id === myArr[0].id || myArr[0].id === 'Already Exists'){
            isOk = false;
        }
    });
    if(isOk)
    {
        myArr[0].notes = productDescription.value;
        myArr[0].author = whoWantsIt.value;
        addItem(myArr);
        await axios.post('http://localhost:3002/product' ,myArr[0]);
    }
    else{
        focusedAfterError=false;
        productName.value = 'Already Exists';
        productName.style.color ='rgb(146, 64, 64)';
    }
}
function addItem(arr){

            arr.forEach(product => {
                console.log(product);
                const productListItem = document.createElement('div'),
                myCollumn = document.createElement('div'),
                myCollumn2 = document.createElement('div'),
                mydelButtonOuter = document.createElement('div'),
                mydelButtonInner = document.createElement('div'),
                myEditButtonOuter = document.createElement('div'),
                myEditButtonInner = document.createElement('div'),
                myName = document.createElement('div'),
                myAuthor = document.createElement('div'),
                spanProduct = document.createElement('span'),
                spanAuthor = document.createElement('span'),
                spanDescription = document.createElement('span'),
                spanProduct2 = document.createElement('input'),
                spanAuthor2 = document.createElement('input'),
                spanDescription2 = document.createElement('input'),
                myDescription = document.createElement('div');
                
                //adding classes
                productListItem.classList.add('productListItem')
                productListItem.id =`${product.id}Title`;
                myCollumn.classList.add('collumn');
                myName.classList.add('inputs');
                myAuthor.classList.add('inputs');
                myDescription.classList.add('inputs');
                spanProduct.classList.add('inputSpan2');
                spanAuthor.classList.add('inputSpan2');
                spanDescription.classList.add('inputSpan2');
                myCollumn2.classList.add('collumn');
                mydelButtonOuter.classList.add('area3');
                myEditButtonOuter.classList.add('area4');
                myEditButtonInner.id =`${product.id}Edit`;
                mydelButtonInner.id =`${product.id}`;
                mydelButtonInner.addEventListener('click',itemDelete);
                myEditButtonInner.addEventListener('click', itemEdit);
                
                
                //inserting information
                spanProduct.innerText = 'Product: ';
                spanAuthor.innerText = 'For: ';
                spanDescription.innerText = 'Description: ';
                mydelButtonInner.innerText = 'Delete';
                myEditButtonInner.innerText = 'Edit';
                spanProduct2.value = product.id;
                spanAuthor2.value = product.author;
                spanDescription2.value = product.notes;
                spanProduct2.id = `${product.id}product`;
                spanAuthor2.id = `${product.id}author`;
                spanDescription2.id = `${product.id}description`;
                spanProduct2.disabled = true;
                spanAuthor2.disabled = true;
                spanDescription2.disabled = true;
                spanProduct2.classList.add('innerInputs');
                spanAuthor2.classList.add('innerInputs');
                spanDescription2.classList.add('innerInputs2');
                
                //appending everything by Order
                myName.appendChild(spanProduct);
                myName.appendChild(spanProduct2);
                myAuthor.appendChild(spanAuthor);
                myAuthor.appendChild(spanAuthor2);
                myDescription.appendChild(spanDescription);
                myDescription.appendChild(spanDescription2);
                mydelButtonOuter.appendChild(mydelButtonInner);
                myEditButtonOuter.appendChild(myEditButtonInner);
                myCollumn2.appendChild(mydelButtonOuter);
                myCollumn2.appendChild(myEditButtonOuter);
                
                myCollumn.appendChild(myName);
                myCollumn.appendChild(myAuthor);
                productListItem.appendChild(myCollumn);
                productListItem.appendChild(myDescription);
                productListItem.appendChild(myCollumn2);
                productList.appendChild(productListItem);
                console.log(productList);
            }); 
}
function itemDelete(){
    delId= this.id;
    const myItemDel = document.getElementById(`${delId}Title`);
    productList.removeChild(myItemDel);
    axios.delete(`http://localhost:3002/product/${delId}`);
}
function itemEdit(){
    
    let myProductId = this.id.slice(0,this.id.length-4),
    inputNameId = myProductId +'product',
    inputAuthorId = myProductId +'author',
    inputDescriptionId = myProductId +'description';
    console.log(inputNameId,inputAuthorId,inputDescriptionId);
    let myName,myAuthor,myDesc;
    myName = document.getElementById(inputNameId);
    myAuthor = document.getElementById(inputAuthorId);
    myDesc = document.getElementById(inputDescriptionId);
    if(!inEdit)
    {
        inEdit = true;
    myName.disabled = false;
    myAuthor.disabled = false;
    myDesc.disabled = false;
    myName.style.borderStyle = 'solid';
    myAuthor.style.borderStyle = 'solid';
    myDesc.style.borderStyle = 'solid';
    this.innerText = "Done";
    }
    else{
        inEdit = false;
        myName.disabled = true;
        myAuthor.disabled = true;
        myDesc.disabled = true;
        myName.style.borderStyle = 'none';
        myAuthor.style.borderStyle = 'none';
        myDesc.style.borderStyle = 'none';
        this.innerText = "Edit";
    }
}
onLoad();