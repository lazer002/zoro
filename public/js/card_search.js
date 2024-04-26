document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementsByClassName('searchInput');
  
    if (searchInput) {
      searchInput.addEventListener('input', function() {
        const searchTerm = this.value.trim().toLowerCase();
  
        document.querySelectorAll('.pcard').forEach(card => {
          const productName = card.querySelector('.card-body p.card-text:first-child').textContent.toLowerCase();
  
          if (productName.includes(searchTerm)) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    } else {
      console.error("Search input element not found.");
    }
  });
  