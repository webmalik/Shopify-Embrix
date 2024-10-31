class CartRemoveButton extends HTMLElement {
    constructor() {
        super();

        this.addEventListener('click', (event) => {
            event.preventDefault();
            const cartItems = this.closest('cart-items') || this.closest('cart-drawer-items');
            cartItems.updateQuantity(this.dataset.index, 0);
        });
    }
}

customElements.define('cart-remove-button', CartRemoveButton);

class CartDrawerToggle {
    constructor() {
        this.cartWrapper = document.querySelector('.header__cart-wrapper');
        this.overlay = document.getElementById('CartDrawer-Overlay');
        this.closeButton = document.querySelector('.cart__close');

        if (this.cartWrapper && this.overlay && this.closeButton) {
            this.init();
        }
    }

    init() {
        this.overlay.addEventListener('click', () => this.closeCart());
        this.closeButton.addEventListener('click', () => this.closeCart());

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.closeCart();
            }
        });
    }

    openCart() {
        this.cartWrapper.classList.add('active');
    }

    closeCart() {
        this.cartWrapper.classList.remove('active');
    }
}

const cartDrawerToggle = new CartDrawerToggle();
