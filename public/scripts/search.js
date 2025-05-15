document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchContent = document.getElementById('searchContent');
    const searchForm = document.getElementById('searchForm');
    let timeout;
    searchInput.addEventListener('input', () => {
        clearTimeout(timeout);
        const query = searchInput.value.trim();
        if (query) {
            timeout = setTimeout(() => {
                fetch(`/products/search?query=${encodeURIComponent(query)}`).then(response => response.json()).then(products => {
                        searchContent.innerHTML = '';
                        if (products.length > 0)
                        {
                            products.forEach(product => {
                                const resultItem = document.createElement('div');
                                resultItem.className = 'searchResultItem';
                                // Add product image
                                const productImage = document.createElement('img');
                                productImage.src = product.image;
                                productImage.alt = product.title;
                                productImage.className = 'searchResultImage';
                                // Add product title
                                const productTitle = document.createElement('p');
                                productTitle.textContent = product.title;
                                productTitle.className = 'searchResultTitle';
                                // Add product price
                                const productPrice = document.createElement('p');
                                productPrice.textContent = `$${product.price}`;
                                productPrice.className = 'searchResultPrice';
                                resultItem.addEventListener('click', () => {
                                    window.location.href = `/products/${product.id}`;
                                });
                                resultItem.appendChild(productImage);
                                resultItem.appendChild(productTitle);
                                resultItem.appendChild(productPrice);
                                searchContent.appendChild(resultItem);
                            });
                        } else {
                            const noResults = document.createElement('div');
                            noResults.className = 'searchResultItem';
                            noResults.textContent = 'No results found';
                            searchContent.appendChild(noResults);
                        }
                        searchContent.style.display = 'block';
                    })
                    .catch(error => console.error('Error fetching search results:', error));
            }, 500);
        } else {
            searchContent.style.display = 'none';
        }
    });
});