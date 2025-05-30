document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.reviewForm').forEach(form => {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      const btn = form.querySelector('.submitReviewBtn');
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
        setTimeout(() => {
          btn.style.backgroundColor = '';
          btn.textContent = 'Submit Review';
          btn.disabled = false;
        }, 2000);
      }, 1000); 
    });
  });
});