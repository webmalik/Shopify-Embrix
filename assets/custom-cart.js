document.addEventListener('DOMContentLoaded', function () {
    function attachEventListeners() {
        // Cart remove button functionality
        document.querySelectorAll('.cart__item-close').forEach(function (button) {
            button.addEventListener('click', function () {
                updateCartItem(button.dataset.variantId, 0);
            });
        });

        // Quantity change functionality
        document.querySelectorAll('.quantity__button').forEach(function (button) {
            button.addEventListener('click', function () {
                let quantityInput = button.closest('.cart__item-number')?.querySelector('span');
                if (!quantityInput) return;
                let currentQuantity = parseInt(quantityInput.textContent);
                let newQuantity = currentQuantity;

                if (button.name === 'plus') {
                    newQuantity++;
                } else if (button.name === 'minus') {
                    if (currentQuantity > 1) {
                        newQuantity--;
                    } else {
                        // If only one item left and minus button is clicked, remove the item
                        updateCartItem(button.dataset.variantId, 0);
                        return;
                    }
                }

                if (newQuantity !== currentQuantity) {
                    updateCartItem(button.dataset.variantId, newQuantity);
                }
            });
        });
    }

    // Initial event listener attachment
    attachEventListeners();

    // Add to cart functionality with dynamic cart opening
    document.querySelectorAll('form[action="/cart/add"]').forEach(function (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            const formData = new FormData(form);

            fetch('/cart/add.js', {
                method: 'POST',
                body: formData,
            })
                .then(function (response) {
                    if (!response.ok) {
                        throw new Error('Failed to add item to cart');
                    }
                    return response.json();
                })
                .then(function (data) {
                    // Open the cart drawer dynamically after adding the product
                    openCartDrawer();
                    updateCartSummaryAfterAdd();
                })
                .catch(function (error) {
                    console.error('Error adding to cart:', error);
                });
        });
    });

    // Prevent redirect to /cart and handle cart URL by opening the drawer
    handleCartUrl();

    function handleCartUrl() {
        if (window.location.pathname === '/cart') {
            event.preventDefault();
            history.replaceState(null, '', window.location.origin);
            openCartDrawer();
        }
    }

    // Check if cart is empty on page load
    checkIfCartIsEmpty();

    function checkIfCartIsEmpty() {
        fetch('/cart.js', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Failed to fetch cart data');
                }
                return response.json();
            })
            .then(function (cart) {
                if (cart.items.length === 0) {
                    showEmptyCartMessage();
                } else {
                    updateCartShippingMessage(cart);
                }
            })
            .catch(function (error) {
                console.error('Error fetching cart data:', error);
            });
    }

    function updateCartItem(variantId, quantity) {
        fetch('/cart/change.js', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                quantity: quantity,
                id: variantId,
            }),
        })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Failed to update cart');
                }
                return response.json();
            })
            .then(function (cart) {
                // Update cart UI dynamically without reload
                const cartItem = document.querySelector(`[data-variant-id="${variantId}"]`);
                if (quantity === 0) {
                    cartItem?.closest('.cart__item')?.remove();
                    if (cart.items.length === 0) {
                        showEmptyCartMessage();
                    }
                } else {
                    const updatedItem = cart.items.find((item) => item.variant_id == variantId);
                    if (cartItem && updatedItem) {
                        const cartItemElement = cartItem.closest('.cart__item');
                        if (cartItemElement) {
                            cartItemElement.querySelector('.cart__item-number span').textContent =
                                updatedItem.quantity;
                            cartItemElement.querySelector('.cart__item-price').textContent =
                                new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                }).format(updatedItem.final_line_price / 100);
                        }
                    }
                }
                updateCartSummary(cart);
                updateCartItemsAfterAdd(cart);
                updateCartShippingMessage(cart);
            })
            .catch(function (error) {
                console.error('Error updating cart:', error);
            });
    }

    function updateCartSummary(cart) {
        // Update subtotal and any other relevant cart information
        const cartTotalElement = document.querySelector('.cart__total span');
        if (cartTotalElement) {
            cartTotalElement.textContent = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(cart.total_price / 100);
        }
        const cartFooter = document.querySelector('.cart__footer');
        if (cartFooter) {
            cartFooter.style.display = cart.items.length === 0 ? 'none' : 'block';
        }
    }

    function updateCartSummaryAfterAdd() {
        fetch('/cart.js', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Failed to fetch cart summary');
                }
                return response.json();
            })
            .then(function (cart) {
                updateCartSummary(cart);
                updateCartItemsAfterAdd(cart);
                updateCartShippingMessage(cart);
            })
            .catch(function (error) {
                console.error('Error fetching cart summary:', error);
            });
    }

    function openCartDrawer() {
        const cartWrapper = document.querySelector('.header__cart-wrapper');
        if (cartWrapper) {
            cartWrapper.classList.add('active');
        }
    }

    function updateCartItemsAfterAdd(cart) {
        if (cart.items.length === 0) {
            showEmptyCartMessage();
            return;
        }
        const emptyCartMessage = document.querySelector('.cart__empty-message');
        if (emptyCartMessage) {
            emptyCartMessage.remove();
        }
        cart.items.forEach(function (item) {
            let cartItem = document.querySelector(`[data-variant-id="${item.id}"]`);
            if (!cartItem) {
                // If the item is not already in the cart, add it to the DOM
                const cartContainer = document.querySelector('.cart__goods');
                if (cartContainer) {
                    const newCartItem = document.createElement('div');
                    newCartItem.classList.add('cart__item');
                    newCartItem.innerHTML = `
                        <div class="cart__image">
                            <img src="${item.image}" alt="${item.title}">
                        </div>
                        <div class="cart__info">
                            <div class="cart__info-head">
                                <span class="cart__name">${item.product_title}</span>
                                <button class="cart__item-close close-button" data-variant-id="${
                                    item.id
                                }">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="2.28516" y="-0.000488281" width="19.3953" height="3.23255" transform="rotate(45 2.28516 -0.000488281)" fill="black"/>
                                        <rect width="19.3953" height="3.23255" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 2.28516 16)" fill="black"/>
                                    </svg>
                                </button>
                            </div>
                            <div class="cart__item-footer">
                                <div class="cart__item-number">
                                    <button class="quantity__button" name="minus" type="button" data-variant-id="${
                                        item.id
                                    }">&mdash;</button>
                                    <span>${item.quantity}</span>
                                    <button class="quantity__button" name="plus" type="button" data-variant-id="${
                                        item.id
                                    }">+</button>
                                </div>
                                <span class="cart__item-price">${new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                }).format(item.final_line_price / 100)}</span>
                            </div>
                        </div>`;
                    cartContainer.appendChild(newCartItem);
                }
            } else {
                const quantityElement = cartItem
                    .closest('.cart__item')
                    ?.querySelector('.cart__item-number span');
                const priceElement = cartItem
                    .closest('.cart__item')
                    ?.querySelector('.cart__item-price');
                if (quantityElement && priceElement) {
                    quantityElement.textContent = item.quantity;
                    priceElement.textContent = new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    }).format(item.final_line_price / 100);
                }
            }
        });
        attachEventListeners();
    }

    function showEmptyCartMessage() {
        const cartContainer = document.querySelector('.cart__goods');
        if (cartContainer) {
            cartContainer.innerHTML =
                '<p class="cart__empty-message">Your cart is currently empty.</p>';
        }
        const cartFooter = document.querySelector('.cart__footer');
        if (cartFooter) {
            cartFooter.style.display = 'none';
        }
        updateCartShippingMessage({ total_price: 0 });
    }

    function updateCartShippingMessage(cart) {
        const shippingThreshold = 5000; // 50 dollars in cents
        const cartTotal = cart.total_price;
        const cartShippingElement = document.querySelector('.cart__shipping');
        const progressLineElement = document.querySelector('.progress__line');

        if (cartShippingElement) {
            if (cartTotal >= shippingThreshold) {
                cartShippingElement.textContent = 'Free U.S. shipping received!';
            } else {
                const amountRemaining = (shippingThreshold - cartTotal) / 100;
                cartShippingElement.textContent = `Add $${amountRemaining.toFixed(
                    2,
                )} more to receive free U.S. shipping!`;
            }
        }

        if (progressLineElement) {
            const progressPercentage = Math.min((cartTotal / shippingThreshold) * 100, 100);
            progressLineElement.style.width = `${progressPercentage}%`;
        }
    }
});
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('cart-remove-button').forEach(function (button) {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const cartItems = button.closest('cart-items') || button.closest('cart-drawer-items');
            if (cartItems) {
                cartItems.updateQuantity(button.dataset.index, 0);
            }
        });
    });

    const cartWrapper = document.querySelector('.header__cart-wrapper');
    const openButton = document.querySelector('.cart__open');
    const cartBg = document.querySelector('.cart__bg');
    const closeButton = document.querySelector('.cart__close');

    setTimeout(() => {
        cartWrapper.style.opacity = 1;
    }, 300);

    function closeCart() {
        if (cartWrapper) {
            cartWrapper.classList.remove('active');
        }
    }

    function openCart() {
        if (cartWrapper) {
            cartWrapper.classList.add('active');
        }
    }

    if (cartWrapper && closeButton && openButton && cartBg) {
        openButton.addEventListener('click', openCart);
        closeButton.addEventListener('click', closeCart);
        cartBg.addEventListener('click', closeCart);

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                closeCart();
            }
        });
    }
});
