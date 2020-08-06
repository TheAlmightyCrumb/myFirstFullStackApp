console.log('Hello World');
let addButton = document.getElementById('addBtn'),
productName = document.getElementById('name'),
whoWantsIt = document.getElementById('author'),
productDescription = document.getElementById('description');
let productList;
addButton.addEventListener('click',getItem);
productName.addEventListener('focus',revertRedText);
let focusedAfterError;
const onLoad = async() =>{
    const {data} = await axios.get('http://localhost:3002/products');
    console.log(data);
    productList = document.createElement('div');
    productList.id= "productContainer";
    document.body.appendChild(productList);
    console.log(data.length);
    addItem(data);
}
function revertRedText(){
    if(!focusedAfterError)
    {
        this.style.color = "rgb(82, 82, 202);";
        this.value ='';
        focusedAfterError = true;
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
        axios.post('http://localhost:3002/product' ,myArr[0]);
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
                myName = document.createElement('div'),
                myAuthor = document.createElement('div'),
                spanProduct = document.createElement('span'),
                spanAuthor = document.createElement('span'),
                spanDescription = document.createElement('span'),
                spanProduct2 = document.createElement('span'),
                spanAuthor2 = document.createElement('span'),
                spanDescription2 = document.createElement('span'),
                myDescription = document.createElement('div');
        
                //adding classes
                productListItem.classList.add('productListItem')
                myCollumn.classList.add('collumn');
                myName.classList.add('inputs');
                myAuthor.classList.add('inputs');
                myDescription.classList.add('inputs');
                spanProduct.classList.add('inputSpan2');
                spanAuthor.classList.add('inputSpan2');
                spanDescription.classList.add('inputSpan2');
                
                //inserting information
                spanProduct.innerText = 'Product: ';
                spanAuthor.innerText = 'For: ';
                spanDescription.innerText = 'Description: ';
                spanProduct2.innerText = product.id;
                spanAuthor2.innerText = product.author;
                spanDescription2.innerText = product.notes;
                
                //appending everything
                myName.appendChild(spanProduct);
                myName.appendChild(spanProduct2);
                myAuthor.appendChild(spanAuthor);
                myAuthor.appendChild(spanAuthor2);
                myDescription.appendChild(spanDescription);
                myDescription.appendChild(spanDescription2);
        
                myCollumn.appendChild(myName);
                myCollumn.appendChild(myAuthor);
                productListItem.appendChild(myCollumn);
                productListItem.appendChild(myDescription);
                productList.appendChild(productListItem);
                console.log(productList);
            }); 
}
onLoad();