window.updateProduct = async function(productId) {
  const name = document.getElementById(`name-${productId}`).value;
  const price = document.getElementById(`price-${productId}`).value;

  try {
    const res = await fetch(`/api/products/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price }),
    });

    const data = await res.json();
    alert('Product updated successfully!');
    window.initAdminPanel?.(); // refresh list
  } catch (err) {
    console.error(err);
    alert('Failed to update product.');
  }
};
