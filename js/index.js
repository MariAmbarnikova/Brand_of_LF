let menuBurger = document.querySelector('.menu__right');
let menu = document.querySelector('.burger__menu');

menuBurger.addEventListener('click', function () {
    menu.classList.toggle('active');
}
);



let cartArr = [];

fetchData();

// Функция добавления товара в корзину
function addCartArr(data) {
    const addCarts = document.querySelectorAll('.card-img__link');
    const cartItems = document.querySelector('.items__cart');

    addCarts.forEach((elBtn) => {
        elBtn.addEventListener('click', () => {
            // при добавлении товара в корзину показать блок cartItems
            if (cartItems.classList.contains('item__cart-hidden')) {
                cartItems.classList.remove('item__cart-hidden');
            }

            // добавление товара в массив
            if (cartArr.indexOf(data[elBtn.id]) < 0) {
                cartArr.push(data[elBtn.id]);
                addCart(data[elBtn.id]);
            }
        });
    });
}

function addCart(obj) {
    const cartItems = document.querySelector('.cart__items');
    const cartItemsMain = document.querySelector('.carts');

    const product = `
    <div class="product">
                <button class="btn__del">Удалить</button>
                <div class="content">
                    <img class="product__img" src="${obj.image}" alt="${obj.name}s">
                    <div class="product__desc">
                        <h2 class="product__name">${obj.name}</h2>
                        <p class="product__price-label">Price: <span class="product__price"> $${obj.price}</span></p>
                        <p class="product__color">Color: ${obj.color
        }</p>
                        <p class="product__size">Size: ${obj.size
        }</p>
                        <div class="product__qty">
                            <label for="" class="input__label">Quantity:</label>
                            <input type="text" class="input__quantity" value ="${obj.quantity}"/>
                        </div>
                    </div>
                </div>
            </div>
    `;
    cartItemsMain.insertAdjacentHTML('beforeend', product);

    const btns = document.querySelectorAll('.btn__del');
    btns.forEach((element) => {
        element.addEventListener('click', () => {
            const productBtn = element.closest('.product');
            productBtn.remove()
        });
    })

    //проверка массива. если пустой то скарыть блок с классом cartItems
    if (cartArr.length === 0) {
        cartItems.classList.add('item__cart-hidden');
    }
};


async function fetchData() {
    try {
        const responce = await fetch('data.json');
        if (!responce.ok) {
            throw new Error('Не удалось получить данныес data JSON');
        }

        const data = await responce.json();
        console.log(data);
        const feturedItemsMain = document.querySelector('.products__cards');
        data.forEach(({ name, image, description, price }, index) => {
            const product = `
            <div class="product__card">
            <button class="card-img__link" id="${index}"><img src="${image}" alt=""></button>
            <div class="card__cont">
                <p class="card__title">${name}</p>
                <p class="card__subtitle">${description}</p>
                <p class="card__price">$${price}</p>
            </div>
      `;
            feturedItemsMain.insertAdjacentHTML('beforeend', product);
        });

        addCartArr(data);


    } catch (error) {
        console.log(error);
    }
}
