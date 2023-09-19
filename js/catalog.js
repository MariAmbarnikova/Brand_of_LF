async function fetchData() {
    try {
        const response = await fetch('catalog-cart.json');
        if (!response.ok) {
            throw new Error('Не удалось получить данные с data.JSON')
        }
        const data = await response.json()
        const productBox = document.querySelector('.catalog');

        data.forEach(({ name, image, description, price }) => {
            const product = ` 
            <div class="product__card">
            <button class="card-img__link"><img src="${image}" alt=""></button>
            <div class="card__cont">
                <p class="card__title">${name}</p>
                <p class="card__subtitle">${description}</p>
                <p class="card__price">$${price}</p>
            </div>
            `
            productBox.insertAdjacentHTML('beforeend', product)
        });

        const btns = document.querySelectorAll('.btn__del');
        btns.forEach((element) => {
            element.addEventListener('click', () => {
                const productBtn = element.closest('.product');
                productBtn.remove()
            });
        })
    } catch (error) {
        console.error(error);
    }
}
fetchData();