new Vue({
  el: '#profileApp',
  data: {
    cartItemCount: 0,
    profile: {
      name: '',
      address: '',
      phone: '',
      email: ''
    },
    password: {
      current: '',
      new: '',
      confirm: ''
    },
    preferences: {
      postalMail: false,
      phoneCalls: false
    }
  },
  methods: {
    saveProfile() {
      localStorage.setItem('profileData', JSON.stringify(this.profile));
      alert('Profil berhasil disimpan!');
    },
    changePassword() {
      if (this.password.new !== this.password.confirm) {
        alert('Password baru dan konfirmasi tidak cocok!');
        return;
      }
      alert('Password berhasil diubah (simulasi)');
    },
    loadProfile() {
      const saved = localStorage.getItem('profileData');
      if (saved) {
        this.profile = JSON.parse(saved);
      }
    },
    updateCartCount() {
      const user = JSON.parse(localStorage.getItem("loggedInUser"));
      if (user) {
        const cart = JSON.parse(localStorage.getItem("cart")) || {};
        const userCart = cart[user.id] || [];
        this.cartItemCount = userCart.reduce((sum, item) => sum + item.quantity, 0);
      }
    }
  },
  mounted() {
    this.loadProfile();
    this.updateCartCount();
  }
});
