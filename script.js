const url = "https://api.punkapi.com/v2/beers?page=";
let nextPage = 1;
const container = document.getElementById('container');
makeBeersCards();

function getBeers(page) {
    return fetch(`https://api.punkapi.com/v2/beers?page=${page}&per_page=50`)
        .then(resp => resp.json());
}


async function makeBeersCards() {
    const beerArr = await getBeers(nextPage);
    let row = document.createElement('div');
    row.classList.add('row', 'equal');

    for (let i = 1; i <= beerArr.length; ++i) {
        const column = document.createElement('div');
        column.classList.add('col');
        let imageIUrl = beerArr[i - 1].image_url;
        if (beerArr[i - 1].image_url == null) {
            imageIUrl = "https://images.punkapi.com/v2/keg.png";
        }
        column.innerHTML = `<div class="card" style="width: 18rem;">
                                <img src="${imageIUrl}" class="card-img-top" alt="#">
                                <div class="card-body text-center">
                                    <h5 class="card-title">${beerArr[i-1].name}</h5>
                                    <p class="card-text text-justify">${beerArr[i-1].description}</p>
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
const paginationLinks = document.getElementsByClassName('page-link');

for (let i = 0; i < paginationLinks.length; ++i) {
    if(i==0){
        paginationLinks[i].onclick = () => {
            if()
           --nextPage;
           makeBeersCards();
        }
    }
    if(i== paginationLinks.length-1){
        paginationLinks[i].onclick = () => {
            ++nextPage;
            makeBeersCards();
        }
    }
    paginationLinks[i].onclick = e => {
        const number = e.target.textContent;
        nextPage = parseInt(number);
        container.innerHTML = "";
        makeBeersCards();
        console.log(nextPage);
    }
}

console.log(paginationLinks);