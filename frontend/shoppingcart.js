// Retrieve shopping cart data from localStorage

let cartArray = JSON.parse(localStorage.getItem("cart")) || [];
if (cartArray.length === 0) {
    alert("Your cart is currently empty!");
}
let cartItems = cartArray.length;

console.log(cartArray);
console.log("items in cart", cartItems);

//Get and create elements for the cart
const main = document.getElementById('shoppingcart');
const cartHeader = document.createElement('h4');
const cartHeader2 = document.createElement('h5');
main.classList.add('text-center')
cartHeader.innerText = 'Your Shopping Cart';
main.appendChild(cartHeader);

cartHeader2.classList.add('col-12', 'py-3');
// cartHeader2.setAttribute('display', 'flex');
// cartHeader2.setAttribute('align-items', 'stretch');
cartHeader2.innerText = 'Selection   -   Varnish   -   Price   -   Quantity   -   Total   -   Remove';

main.appendChild(cartHeader2);

let grandTotal = 0;
displayCart();

//-------------------------------------
// Display shoppingcart items function
// Cart items shown: a pic, name, varnish, unit price, quantity, line total, remove button
// A grand total is generated for all line items

function displayCart() {
    
    //cycle thru cart array to create each line of the cart
    for ( let i = 0 ; i < cartItems ; i++ ) {
    
        //create elements to be added to DOM
        const cartLine = document.createElement('div');
        const imageThumb = document.createElement('img'); 
        const name = document.createElement('p');
        const finish = document.createElement('p');
        const price = document.createElement('p');
        const itemNum = document.createElement('p');
        const total = document.createElement('p');
        const remBtn = document.createElement('button');
        const orderTotal = document.createElement('p');
      
        //add classes and attributes to each element
        cartLine.classList.add('d-flex', 'p-1', 'border', 'border-primary');
        cartLine.setAttribute('data-Id', cartArray[i].id);
        cartLine.setAttribute('data-finish', cartArray[i].varnish);

        imageThumb.setAttribute('src', cartArray[i].imgUrl);
        imageThumb.setAttribute('height', 50);
        imageThumb.classList.add('pt-1', 'col', 'col-sm', 'col-md', 'col-lg' );

        name.classList.add('px-1', 'col-3', 'col-sm-3', 'col-md-3', 'col-lg-3', 'pt-3');
        name.innerText = cartArray[i].name;

        finish.classList.add('px-1', 'col-2', 'col-sm-2', 'col-md-2', 'col-lg-2', 'pt-3');
        finish.innerText = cartArray[i].varnish;

        price.classList.add('px-1', 'col', 'col-sm', 'col-md', 'col-lg', 'pt-3');
        //format price data to show $ & 2 decimal places
        let priceFmt =  (cartArray[i].unitPrice / 100);
        price.innerText = ('$' +  priceFmt.toFixed(2));

        itemNum.classList.add('col-xs-2', 'col', 'col-sm', 'col-md', 'col-lg', 'pt-2')
        itemNum.innerHTML = `<input class="form-control" type="number" size="2" value=${cartArray[i].qty} min="1" max="99">`;

        total.classList.add('px-1', 'col', 'col-sm', 'col-md', 'col-lg', 'pt-3');

        remBtn.setAttribute('type', 'button');
        remBtn.classList.add('col', 'col-sm', 'col-md', 'col-lg', 'd-xs-none', 'clr');
        remBtn.innerText = 'X';
        
        //-------------------------------------------------------------
        // Event Listener for triggering deleting an Item from the Cart

        remBtn.addEventListener('click', delCartLine);
                        
        //--------------------------------------------
        // Event Listener for Item Quantity Change
        
        itemNum.addEventListener('change', (e) => {
            //function recacullates cart total price on quantity change
                       
            let totalFmt = parseInt(cartArray[i].unitPrice / 100); 
            cartArray[i].qty = e.target.value;
            total.innerText = ' $' + (totalFmt * e.target.value).toFixed(2);
            
            syncCart();          // match up cart array & local storage
            updateGrandTotal();  // Calculate new total for whole page
            updateCartQty();     // Calculate new quantity in cart
        } )
        
        let pageLoadTotal = cartArray[i].qty * parseInt(cartArray[i].unitPrice / 100);
        total.innerText = '$' + pageLoadTotal.toFixed(2);
        

        cartLine.appendChild(imageThumb);
        cartLine.appendChild(name);
        cartLine.appendChild(finish);
        cartLine.appendChild(price);
        cartLine.appendChild(itemNum);
        cartLine.appendChild(total);
        cartLine.appendChild(remBtn);
        main.appendChild(cartLine);   

    };

    updateGrandTotal();  // Calculate total for whole page
       
} 

//--------------------------------------------------
// Sync up the cart array and local storage function

function syncCart() {
    //Stringify cart array & push to/replace local storage
    localStorage.setItem('cart', JSON.stringify(cartArray)); 
    //Pull cart string from local storage & parse into cart array object
    cartArray = JSON.parse(localStorage.getItem('cart'));
}

//--------------------------
// Delete cart line function

function delCartLine(ev) {
  console.log(ev);
//   ev.target.parentNode.classList.add('cool');
  //    - get the product ID
  const id = ev.target.parentNode.dataset.id;
  const finish = ev.target.parentNode.dataset.finish;
  console.log(id); 
   
  //use "let index = list.findindex(o => o.id == id);" to retrieve the index of the product to be deleted
  let index = cartArray.findIndex(o => o.id === id && o.varnish === finish);

  console.log(index);

  //use the splice() method to remove the selected cartline from the array
  cartArray.splice(index,1);

  console.log(cartArray);

  //use remove method to remove the selected cartline from the DOM
  ev.target.parentNode.remove();

  syncCart();          // match up cart array & local storage
  updateGrandTotal();  // Calculate new total for whole page
  updateCartQty();     // Calculate new quantity in cart

}

//---------------------------------------------
// Update the grand total of the order Function

function updateGrandTotal() {
    // console.log(cartArray);

    //initalize variable
    let total = 0;
    //Cycle thru cart data to calculate the grand total

    for (let i=0; i < cartArray.length; i++) {
        //Multiply each unit price by the quantity of item
        total = total + cartArray[i].unitPrice * cartArray[i].qty;

        console.log(cartArray[i].unitPrice);
    }
    //grab html ID to append grand total data to
    const orderTotal = document.getElementById('grandtotal');
    //format grand total $ & 2 decimal places - value put in DOM
    orderTotal.innerText = '$' + (total/100).toFixed(2);
    
}

//------------------------------------
// Calculate total line price function

function totatPrice() {
    //Format line price - $ & 2 decimal places, multiply unit price by quantity 
    total.innerText = '$' + ((cartArray[i].unitPrice / 100).toFixed(2) * e.target.value);
};

//--------------------------------------------
// Create a makeOrder() function to send data to the confirmation page

const subOrder = document.getElementById('order');
const formData = document.getElementById('form-group');

// const formData = document.getElementsByClassName('form-control');

// const data = new FormData(formData);
// const values = [...data.entries()];
// const formFirstname = formData.firstName.value;

// console.log('this is the first name', formFirstname);
// console.log('This is the form data', formData);

//--------------------------------------------
// Event Listener for the Make Order Button

subOrder.addEventListener('click', (ev) => {
    const order = {
        contact: {
         firstName: "",
         lastName: "",
         address: "",
         city: "",
         email: ""
       },
       products: []
      }

      // getFormData();
      getOrderData(order);

    ev.preventDefault();
    let productOrder = new XMLHttpRequest();            // create the instance of XMLHttprequest
    const url = "http://localhost:3000/api/furniture";   // create the URL string

    return new Promise((resolve, reject) => {
      
        productOrder.open('POST', url + "/order");             // open a POST api
        
        productOrder.onreadystatechange = () => {
          if (productOrder.readyState === 4) {
            if (productOrder.status === 200 || productOrder.status === 201) {
               resolve(JSON.parse(productOrder.response));    // retrieve the response if successful
            } else {
                reject(JSON.parse(productOrder.response));
            }
            const objOrdArray = JSON.parse(productOrder.response); 
                             
               
          };
        };
        productOrder.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        // productOrder.send((urlEncodedData));
    });

    console.log('');
}); 

function getFormData() {
    
}

//------------------------------------------
// Retrieve order data for the post function

function getOrderData(array) {
    //    - gather cart data (as an array?) to be passed to confirmation page
    for (let i=0; i < cartArray.length; i++) {
        array.products.push(cartArray[i].id)
        
    }
    console.log(array.products);
}
updateCartQty();

//------------------------------------------
// Retrieve form data for the post function

//    - gather order form data (as an object?) to be passed the confirmation page
function getFormData() {
    console.log('Get Form Data function engaged');
}

//------------------------------
// Update Cart Quantity function

function updateCartQty() {

    // Initialize quantity in local storage
    let totalQty = 0
  
    //this will calculate the # of items appearing in the cart
    // console.log('The Update Cart Quantity Function is Engaged!')
  
    const cartIcon = document.getElementsByClassName("cart-qty")[0];
    const storage = JSON.parse(localStorage.getItem('cart'));
    console.log(cartIcon);
    if (storage === []) {
        totalQty = 0;
        
    } else {
        for (let i=0; i<storage.length; i++) {
          totalQty = totalQty + parseInt(storage[i].qty)
        }
    }
  
    localStorage.setItem('qty', JSON.stringify(totalQty));
    cartIcon.innerText = totalQty;
    
    console.log(totalQty);
  
  }

