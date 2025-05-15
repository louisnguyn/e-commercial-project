document.addEventListener('DOMContentLoaded', () => {
  const imageInput = document.getElementById('image');
  const imagePreview = document.getElementById('imagePreview');

  imageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreview.src = e.target.result; // Update the image preview
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  });
});