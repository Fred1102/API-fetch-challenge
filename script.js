const url = "https://api.punkapi.com/v2/beers?page=";
let nextPage = 1;
const container = document.getElementById('container');
console.log(container);

function getBeers(page) {
    return fetch(`https://api.punkapi.com/v2/beers?page=${page}&per_page=40`)
        .then(resp => resp.json());
}


async function makeBeersCards() {
    const beerArr = await getBeers(nextPage);
    let row = document.createElement('div');
    row.classList.add('row', 'equal');

    for (let i = 1; i <= beerArr.length; ++i) {
        const column = document.createElement('div');
        column.classList.add('col');
        column.innerHTML = `<div class="card" style="width: 18rem;">
    <img src="${beerArr[i-1].image_url}" class="card-img-top" alt="#">
    <div class="card-body">
      <h5 class="card-title">${beerArr[i-1].name}</h5>
      <p class="card-text">${beerArr[i-1].description}</p>
    </div>
    </div>`;
        row.appendChild(column);
        if (i % 5 == 0) {
            container.appendChild(row);
            row = document.createElement('div');
            row.classList.add('row', 'equal');
        }

    }

}
makeBeersCards();