console.log('Hello World');
const addButton = document.getElementById('addBtn');
const productName = document.getElementById('name');
const whoWantsIt = document.getElementById('author');
const productDescription = document.getElementById('description');
const onLoad = async() =>{
    const {data} = await axios.get('http://localhost:3002/products');
    console.log(data);
    const productList = document.createElement('div');
    productList.id= "productContainer";
    document.body.appendChild(productList);
    console.log(data.length);
    data.forEach(product => {
        console.log(product);
        const productListItem = document.createElement('div'),
        myCollumn = document.createElement('div'),
        myName = document.createElement('div'),
        myAuthor = document.createElement('div'),
        spanProduct = document.createElement('span'),
        spanAuthor = document.createElement('span'),
        spanDescription = document.createElement('span'),
        spanProduct2 = document.createElement('span'),
        spanAuthor2 = document.createElement('span'),
        spanDescription2 = document.createElement('span'),
        myDescription = document.createElement('div');

        productListItem.classList.add('productListItem')
        myCollumn.classList.add('collumn');
        myName.classList.add('inputs');
        myAuthor.classList.add('inputs');
        myDescription.classList.add('inputs');
        spanProduct.classList.add('inputSpan2');
        spanAuthor.classList.add('inputSpan2');
        spanDescription.classList.add('inputSpan2');

        spanProduct.innerText = 'Product: ';
        spanAuthor.innerText = 'For: ';
        spanDescription.innerText = 'Description: ';
        spanProduct2.innerText = product.id;
        spanAuthor2.innerText = product.author;
        spanDescription2.innerText = product.notes;

        // myName.innerText = product.id;
        // myAuthor.innerText = product.author;
        // myDescription.innerText = product.notes;
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