console.log('Hello World');
let addButton = document.getElementById('addBtn'),
productName = document.getElementById('name'),
whoWantsIt = document.getElementById('author'),
productDescription = document.getElementById('description');
let productList,finishContainer;
addButton.addEventListener('click',getItem);
productName.addEventListener('focus',revertRedText);
let focusedAfterError,inEdit =false;
const onLoad = async() =>{
    const {data} = await axios.get('http://localhost:3002/products');
    console.log(data);
    productList = document.createElement('div');
    finishContainer = document.createElement('div');
    cartHeader = document.createElement('div');
    cartHeader.innerText ='My Cart';
    cartHeader.id='myCartHeader';
    finishContainer.appendChild(cartHeader);
    finishContainer.id = 'finishContainer';
    finishContainer.style.marginTop = '30px';
    productList.id= "productContainer";
    document.body.appendChild(productList);
    document.body.appendChild(finishContainer);
    console.log(data.length);
    addItem(data);
    // productName.disabled = true;
    // productName.value = 'newValue';
}
function revertRedText(){
    console.log(this);
    if(this.value === '*Insert Name'
    || this.value === '*Already Exists')
    {
        console.log(this);
        this.style.color = "rgb(82, 82, 202)";
        this.value ='';
        focusedAfterError = true;
        console.log(this);
    }
}

async function getItem(){
    let myArr = [{}], isOk = true;;
    const {data} = await axios.get('http://localhost:3002/products');
    myArr[0].id = productName.value;
    data.forEach(item => {
        if(item.id === myArr[0].id || myArr[0].id === '*Already Exists' || myArr[0].id ===''
        || myArr[0].id ==='*Insert Name'){
            isOk = false;
        }
    });
    // if(inEdit){
    //     focusedAfterError=false;
    //     productName.value = 'First Finish Your Edit';
    //     productName.style.color ='rgb(146, 64, 64)';   
    // }
    if(isOk)
    {
        myArr[0].notes = productDescription.value;
        myArr[0].author = whoWantsIt.value;
        addItem(myArr);
        await axios.post('http://localhost:3002/product' ,myArr[0]);
        productDescription.value = '';
        whoWantsIt.value = '';
        productName.value ='';
    }
    else{
        focusedAfterError=false;
        if(productName.value === '' || productName.value === '*Insert Name'
        || productName.value === '*Already Exists'){
            productName.value = '*Insert Name';
        }else{
            productName.value = '*Already Exists';
        }
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
                myDivCont = document.createElement('div'),
                myFinishButtonOuter = document.createElement('div'),
                myFinishButtonInner = document.createElement('div'),
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
                myFinishButtonOuter.classList.add('area4');
                myFinishButtonInner.style.marginLeft = '10px';
                myDivCont.style.display = 'flex';
                myEditButtonInner.id =`${product.id}Edit`;
                myFinishButtonInner.id =`${product.id}Finish`;
                myEditButtonInner.classList.add('myEdits');
                if(inEdit){
                    myEditButtonInner.classList.add('hidden');
                }
                mydelButtonInner.id =`${product.id}`;
                mydelButtonInner.addEventListener('click',itemDelete);
                myEditButtonInner.addEventListener('click', itemEdit);
                myFinishButtonInner.addEventListener('click', itemFinish);
                spanProduct2.addEventListener('focus',revertRedText);
                
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
                
                //appending everything by Order
                myName.appendChild(spanProduct);
                myName.appendChild(spanProduct2);
                myAuthor.appendChild(spanAuthor);
                myAuthor.appendChild(spanAuthor2);
                myDescription.appendChild(spanDescription);
                myDescription.appendChild(spanDescription2);
                mydelButtonOuter.appendChild(mydelButtonInner);
                myEditButtonOuter.appendChild(myEditButtonInner);
                myFinishButtonOuter.appendChild(myFinishButtonInner);
                myDivCont.appendChild(myEditButtonOuter);
                myDivCont.appendChild(myFinishButtonOuter);
                myCollumn2.appendChild(mydelButtonOuter);
                myCollumn2.appendChild(myDivCont);
                
                myCollumn.appendChild(myName);
                myCollumn.appendChild(myAuthor);
                productListItem.appendChild(myCollumn);
                productListItem.appendChild(myDescription);
                productListItem.appendChild(myCollumn2);

                if(product.finished ==='true'){
                    spanProduct2.classList.add('innerInputsF');
                    spanAuthor2.classList.add('innerInputsF');
                    spanDescription2.classList.add('innerInputs2F');
                    productListItem.classList.add('productListItemF');
                    myFinishButtonInner.style.backgroundColor = 'rgb(49, 210, 221)';
                    myFinishButtonInner.innerText = 'Undo';
                    finishContainer.appendChild(productListItem);
                }
                else{
                    spanProduct2.classList.add('innerInputs');
                    spanAuthor2.classList.add('innerInputs');
                    spanDescription2.classList.add('innerInputs2');
                    productListItem.classList.add('productListItem');
                    myFinishButtonInner.style.backgroundColor = 'rgb(221, 221, 49)';
                    myFinishButtonInner.innerText = 'Got It !';
                    productList.appendChild(productListItem);
                }

                console.log(productList);
            }); 
}
function itemDelete(){
    delId= this.id;
    const myItemDel = document.getElementById(`${delId}Title`);
    productList.removeChild(myItemDel);
    axios.delete(`http://localhost:3002/product/${delId}`);
}
function editAction(action,myCurrentEdit){
    const myEditArr = document.getElementsByClassName('myEdits');
    console.log(myEditArr);
    if(action === 'Hide'){
        Array.from(myEditArr).forEach(edit =>{
            if(edit.id !== myCurrentEdit.id)
                {
                    console.log('Hiding');
                    edit.classList.add('hidden');
                }
        })
    }
    else if( action === 'Show'){
        Array.from(myEditArr).forEach(edit =>{
        if(edit.id !== myCurrentEdit.id)
                {
                    console.log('Hiding');
                    edit.classList.remove('hidden');
                }
            });
    }
}
async function itemEdit(){
    let myProductId = this.id.slice(0,this.id.length-4),
    inputNameId = myProductId +'product',
    inputAuthorId = myProductId +'author',
    inputDescriptionId = myProductId +'description';
    console.log(inputNameId,inputAuthorId,inputDescriptionId);
    let myName,myAuthor,myDesc;
    myName = document.getElementById(inputNameId);
    myAuthor = document.getElementById(inputAuthorId);
    myDesc = document.getElementById(inputDescriptionId);
    console.log('mys ->' ,myName, myAuthor, myDesc);
    myActualName = myName.value;
    console.log(myActualName);
    const {data} = await axios.get('http://localhost:3002/products');
    let isOk2 = true; 
    data.forEach(item => {
        if(item.id === myActualName || myActualName === '*Already Exists' 
        || myActualName === '*Insert Name' || myActualName === ''){
            isOk2 = false;
        }
    });
    if(!inEdit)
    {
        editAction('Hide',this);
        this.parentNode.classList.remove('area4');
        this.parentNode.classList.add('area4B');
        inEdit = true;
    myName.disabled = false;
    myAuthor.disabled = false;
    myDesc.disabled = false;
    myName.style.borderStyle = 'solid';
    myAuthor.style.borderStyle = 'solid';
    myDesc.style.borderStyle = 'solid';
    this.innerText = "Done";
    }
    else if(myActualName === myProductId || isOk2){
        inEdit = false;
        myName.disabled = true;
        myAuthor.disabled = true;
        myDesc.disabled = true;
        myName.style.borderStyle = 'none';
        myAuthor.style.borderStyle = 'none';
        myDesc.style.borderStyle = 'none';
        this.innerText = "Edit";
        this.parentNode.classList.remove('area4B');
        this.parentNode.classList.add('area4');
        
            let myObj = {}, newName = myName.value;
            console.log(newName);
            myObj.id = newName;
            myObj.author = myAuthor.value;
            myObj.notes = myDesc.value;
            console.log(myObj);
            axios.put(`http://localhost:3002/product/${myProductId}`,myObj);
            myName.id = newName+'product';
            myAuthor.id = newName+'author';
            myDesc.id = newName+'description';
            this.id = newName+'Edit';
            let myDelete = document.getElementById(myProductId),
            myFinish = document.getElementById(`${myProductId}Finish`);
            const myItemContainer = document.getElementById(`${myProductId}Title`);
            myDelete.id = newName;
            myFinish.id = newName+'Finish';
            myItemContainer.id = newName+'Title'
            console.log(this);
            editAction('Show',this);
    }
    else{
        if(myName.value === '' || myName.value === '*Insert Name'
            || myName.value === '*Already Exists'){
            myName.value = '*Insert Name';
            myName.style.color ='rgb(146, 64, 64)';
        }else{
            myName.value = '*Already Exists';
            myName.style.color ='rgb(146, 64, 64)';
        }
    }
}

function itemFinish(){
    const myProduct = this.id.slice(0,this.id.length-6),
    spanProduct2 = document.getElementById(`${myProduct}product`),
    spanAuthor2 = document.getElementById(`${myProduct}author`),
    spanDescription2 = document.getElementById(`${myProduct}description`);
    
    const myContainer = document.getElementById(`${myProduct}Title`);
    console.log(myContainer);
    if(this.innerText === 'Undo')
    {
        spanProduct2.classList.remove('innerInputsF');
        spanAuthor2.classList.remove('innerInputsF');
        spanDescription2.classList.remove('innerInputs2F');
        myContainer.classList.remove('productListItemF');

        spanProduct2.classList.add('innerInputs');
        spanAuthor2.classList.add('innerInputs');
        spanDescription2.classList.add('innerInputs2');
        myContainer.classList.add('productListItem');

        this.style.backgroundColor = 'rgb(221, 221, 49)';
        this.innerText = 'Got It !';
        axios.put(`http://localhost:3002/product/${myProduct}/false`);
        productList.appendChild(myContainer);
    }else{
        spanProduct2.classList.remove('innerInputs');
        spanAuthor2.classList.remove('innerInputs');
        spanDescription2.classList.remove('innerInputs2');
        myContainer.classList.remove('productListItem');

        spanProduct2.classList.add('innerInputsF');
        spanAuthor2.classList.add('innerInputsF');
        spanDescription2.classList.add('innerInputs2F');
        myContainer.classList.add('productListItemF');

        this.style.backgroundColor = 'rgb(49, 210, 221)';
        this.innerText = 'Undo';
        axios.put(`http://localhost:3002/product/${myProduct}/true`);
        finishContainer.appendChild(myContainer);
    }


}


onLoad();