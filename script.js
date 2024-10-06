const apiKey = '0ce00de41754c0f03343c64310b6625b';  // Substitua com sua chave da API do TMDb
const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=`;
const movieList = document.getElementById('movie-list');
const modal = document.getElementById('modal');
const movieDetails = document.getElementById('movie-details');
const closeModal = document.getElementById('close');
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');

// Função para obter filmes populares
async function getMovies(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayMovies(data.results);
    } catch (error) {
        console.error('Erro ao buscar os filmes:', error);
    }
}

// Exibe os filmes na página
function displayMovies(movies) {
    movieList.innerHTML = '';
    movies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');
        movieItem.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
        `;
        movieItem.addEventListener('click', () => showMovieDetails(movie));
        movieList.appendChild(movieItem);
    });
}

// Mostra detalhes do filme no modal e centraliza
function showMovieDetails(movie) {
    movieDetails.innerHTML = `
        <h2>${movie.title}</h2>
        <p>${movie.overview}</p>
        <img src="https://image.tmdb.org/t/p/w500${movie.backdrop_path}" alt="${movie.title}">
    `;
    modal.classList.add('show');  // Adiciona a classe 'show' para ativar o modal
}

// Fecha o modal
closeModal.onclick = function() {
    modal.classList.remove('show');  // Remove a classe 'show' para ocultar o modal
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.classList.remove('show');
    }
}

// Função para buscar filmes
searchButton.addEventListener('click', () => {
    const query = searchInput.value;
    if (query) {
        const searchQueryUrl = `${searchUrl}${encodeURIComponent(query)}`;
        getMovies(searchQueryUrl);
    }
});

// Carrega os filmes populares ao carregar a página
getMovies(apiUrl);

////////////////////////////////////////////////////////

// Seleciona o container do carrossel
const carousel = document.querySelector('.carousel');

// Define a velocidade do carrossel (em milissegundos)
const scrollSpeed = 2000;

// Função para rolar o carrossel automaticamente
function autoScroll() {
  const scrollAmount = carousel.scrollWidth / carousel.childElementCount;
  carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });

  // Se o carrossel chegar ao fim, ele volta ao início
  if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth) {
    carousel.scrollTo({ left: 0, behavior: 'smooth' });
  }
}

// Inicia o carrossel automático
setInterval(autoScroll, scrollSpeed);
