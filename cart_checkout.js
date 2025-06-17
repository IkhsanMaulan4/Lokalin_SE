new Vue({
  el: '#cartApp',
  data: {
    cart: [],
    cartItemCount: 0,
    shippingCost: 10000 // ongkir tetap
  },
  computed: {
    subtotal() {
      return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    totalWithShipping() {
      return this.subtotal + this.shippingCost;
    }
  },
  methods: {
    formatCurrency(value) {
      return 'Rp' + value.toLocaleString('id-ID');
    },
    increment(index) {
      this.cart[index].quantity++;
      this.saveCart();
      this.updateCartCount();
    },
    decrement(index) {
      if (this.cart[index].quantity > 1) {
        this.cart[index].quantity--;
        this.saveCart();
        this.updateCartCount();
      }
    },
    removeItem(index) {
      this.cart.splice(index, 1);
      this.saveCart();
      this.updateCartCount();
    },
    checkout() {
      // Generate nomor virtual account (contoh: diawali 88 dan 8 digit acak)
      const vaNumber = '88' + Math.floor(100000000 + Math.random() * 900000000);

      // Tampilkan VA dan konfirmasi untuk lanjut ke halaman terima kasih
      const message = `Silakan lakukan pembayaran ke Virtual Account berikut:\n\n${vaNumber}\n\nSetelah pembayaran, klik OK untuk melanjutkan.`;

      if (confirm(message)) {
        // Kosongkan keranjang
        this.cart = [];
        this.saveCart();
        this.updateCartCount();

        // Redirect ke halaman thankyou
        window.location.href = 'thankyou.html';
      }
    },
    saveCart() {
      const user = JSON.parse(localStorage.getItem("loggedInUser"));
      if (user) {
        let cartData = JSON.parse(localStorage.getItem("cart")) || {};
        cartData[user.id] = this.cart;
        localStorage.setItem("cart", JSON.stringify(cartData));
      }
    },
    loadCart() {
      const user = JSON.parse(localStorage.getItem("loggedInUser"));
      if (user) {
        const cartData = JSON.parse(localStorage.getItem("cart")) || {};
        this.cart = cartData[user.id] || [];
        this.updateCartCount();
      }
    },
    updateCartCount() {
      this.cartItemCount = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    }
  },
  mounted() {
    this.loadCart();
  }
});
