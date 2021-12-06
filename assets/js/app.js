//send axios to server and get data
// axios.get('http://localhost:3000/api/todos')

async function searchMovie() {

    let movieName = document.getElementById('getMovieName').value;
    if (movieName == '') {
        swal({
            title: "please enter movie name",
            icon: "error",
            confirmButtonText: "ok"
        })
    } else {
        try {
            const { data } = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=9404863a28e8b166388786472738a888&language=en-US&query=${movieName}&page=1&include_adult=false`);
            console.log(data);
            let movie = data.results;
            let output = '';
            if (movie.length > 0) {
                movie.forEach(function (movie) {
                    output += `
              <div
                        class="d-style bgc-white btn btn-brc-tp btn-outline-green btn-h-outline-green btn-a-outline-green w-100 my-2 py-3 shadow-sm border-2">
                        <!-- Pro Plan -->
                        <div class="row align-items-center">
                            <div class="col-12 col-md-4">
                                <h4 class="pt-3 text-170 text-600 text-green-d1 letter-spacing">
                                    ${movie.title}
                                </h4>

                                <div class="text-secondary-d2 text-120">
                                    <div class="text-danger-m3 text-90 mr-1 ml-n4 pos-rel d-inline-block">
                                     <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="w-50">

                                       <span class=" deleted-text   text-150">

                                       </span>
                                        <span>
                                            <span
                                                class="d-block rotate-45 position-l mt-n475 ml-35 fa-2x text-400 border-l-2 h-5 brc-dark-m1">

                                                </span>
                                        </span>
                                    </div>
                                    <span class="align-text-bottom">
                                    </span><span class="text-180">
                                            Points : ${movie.vote_average}

                                    </span>

                                </div>
                            </div>

                            <ul class="list-unstyled mb-0 col-12 col-md-4 text-dark-l1 text-90 text-left my-4 my-md-0">
                                <li>
                                    <span>
                                        <span class="text-110" style=" font-size: 12px;text-align: justify;">${movie.overview}</span>
                                    </span>
                                </li>

                               
                            </ul>

                            <div class="col-12 col-md-4 text-center">
                             <!-- Button trigger modal -->
                                    <button type="button" class="btn btn-outline-success" data-toggle="modal" data-target="#staticModal${movie.id}" onclick="getMovie('${movie.id}')">
                                    more details on ${movie.title}
                                    </button>

                                    <!-- Modal -->
                                    <div class="modal fade" id="staticModal${movie.id}" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                    <div class="modal-dialog  modal-xl" id="content${movie.id}">
                                    <div>
                                    </div>
                                    </div>
                                    </div>
                            </div>
                        </div>

                    </div>

            `;
                });
            } else {
                output = `<h4 class="alert-danger jumbotron text-center text-danger">No Movie Found</h4>`;
            }
            document.getElementById('movies').innerHTML = output;


        }
        catch (error) {
            console.log(error);
        }
    }




}

async function getMovie(id) {
    try {
        const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=9404863a28e8b166388786472738a888&language=en-US`);
        console.log(data);
        let movie = data;
        let movieg = ""

        for (const genre of movie.genres) {
            movieg += `<p class="badge badge-light"> ${genre.name}</p>
            `
        }
        let output = '';
        output += `
          <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="staticBackdropLabel">${movie.title}</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true"></span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <div>
                                                <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="w-100 moviePic position-relative">
                                                <div class="text-secondary-d2 movieTitle text-120 position-absolute">
                                                    ${movie.title}
                                                </div>
                                            </div>
                                            <div>
                                                <h1>original Title : ${movie.original_title}</h1>
                                                <div class="text-left">
                                                        <p class='alert alert-secondary'> points : ${movie.vote_average}</p>
                                                        <p class="jumbotron alert-info">overview : ${movie.overview}</p>
                                                        <p class="alert alert-secondary">budget: ${movie.budget}</p>
                                                        <p class="alert alert-secondary">release date : ${movie.release_date}</p>
                                                        <div class="alert alert-secondary d-flex">genre : ${movieg}</div>
                                                        <p class="alert alert-secondary">status: ${movie.status}</p>
                                                         imdb: <a href="https://www.imdb.com/title/${movie.imdb_id}/">Go to imdb</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer d-flex">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        </div>
                                        </div>`
        document.getElementById(`content${movie.id}`).innerHTML = output;
    }
    catch (error) {
        console.log(error);
    }
}
