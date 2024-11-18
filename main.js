const movieContainer = document.getElementById('movie-container');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const sortOrder = document.getElementById('sortOrder');
const searchButton = document.getElementById('searchButton');

function displayMovies(movies) {
  movieContainer.innerHTML = '';

  movies.forEach(movie => {
    const card = document.createElement('div');
    card.classList.add('movie-card');

    const img = document.createElement('img');
    img.src = movie.ImageURL;
    img.alt = movie.Title;
    card.appendChild(img);

    const title = document.createElement('h2');
    title.classList.add('movie-title');
    title.textContent = movie.Title;
    card.appendChild(title);

    const category = document.createElement('p');
    category.classList.add('movie-category');
    category.textContent = `Category: ${movie.Categories}`;
    card.appendChild(category);

    const rating = document.createElement('p');
    rating.classList.add('movie-rating');
    rating.textContent = `IMDb Rating: ${movie.imdb_rating}`;
    card.appendChild(rating);

    movieContainer.appendChild(card);
  });
}

function populateCategoryFilter() {
  const categories = new Set();

  movies.forEach(movie => {
    movie.Categories.split('|').forEach(category => categories.add(category));
  });

  categoryFilter.innerHTML = '<option value="all">All</option>';

  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    categoryFilter.appendChild(option);
  });
}


function filterAndDisplayMovies() {
  let filteredMovies = movies;

  const searchInpu = searchInput.value.toLowerCase();
  if (searchInpu) {
    filteredMovies = filteredMovies.filter(movie =>
      movie.Title.toLowerCase().includes(searchInpu)
    );
  }

  const selectedCategory = categoryFilter.value;
  if (selectedCategory !== 'all') {
    filteredMovies = filteredMovies.filter(movie =>
      movie.Categories.split('|').map(cat => cat.trim().toLowerCase()).includes(selectedCategory.toLowerCase())
    );
  }



  if (sortOrder.value === 'a-z') {
    filteredMovies.sort((a, b) => a.Title.localeCompare(b.Title));
  } else if (sortOrder.value === 'z-a') {
    filteredMovies.sort((a, b) => b.Title.localeCompare(a.Title));
  }

  if (sortOrder.value === 'rating-asc') {
    filteredMovies.sort((a, b) => a.imdb_rating - b.imdb_rating);
  } else if (sortOrder.value === 'rating-desc') {
    filteredMovies.sort((a, b) => b.imdb_rating - a.imdb_rating);
  }
  if (sortOrder.value === 'none') {
    filteredMovies = [...filteredMovies];
  }

  displayMovies(filteredMovies);
}

searchButton.addEventListener('click', filterAndDisplayMovies);
categoryFilter.addEventListener('change', filterAndDisplayMovies);
sortOrder.addEventListener('change', filterAndDisplayMovies);

populateCategoryFilter();
displayMovies(movies);
