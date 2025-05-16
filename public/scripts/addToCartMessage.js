document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.addToCartForm').forEach(form => {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      const btn = form.querySelector('.addToCartBtn');
      const formData = new FormData(form);
      btn.disabled = true;
      btn.style.backgroundColor = '#ccc';
      btn.textContent = 'Processing...';

      const res = await fetch(form.action, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      setTimeout(() => {
        if (data.success) {
          btn.style.backgroundColor = 'green';
          btn.textContent = data.message;
        } else {
          btn.style.backgroundColor = 'red';
          btn.textContent = data.message;
        }
        const cartCountSpan = document.getElementById('cartCount');
        if (cartCountSpan){
            cartCountSpan.textContent = data.cartCount;
            cartCountSpan.style.display = "inline-block";
        } 
        setTimeout(() => {
          btn.style.backgroundColor = '';
          btn.textContent = 'Add to Cart';
          btn.disabled = false;
        }, 2000);
      }, 1000); 
    });
  });
});