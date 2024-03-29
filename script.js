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
    row.classList.add('row');

    for (let i = 1; i <= beerArr.length; ++i) {
        const column = document.createElement('div');
        column.classList.add('col');
       
        let imageIUrl = beerArr[i - 1].image_url;
        if (beerArr[i - 1].image_url == null) {
            imageIUrl = "https://images.punkapi.com/v2/keg.png";
        }
        column.innerHTML = `
                            <div class="card">
                            <div class="card-hover">
                                <img src="${imageIUrl}" class="card-img-top" alt="#">
                                <div class="card-body">
                                    <h5 class="card-title">${beerArr[i-1].name}</h5>
                                    <p class="card-text">${beerArr[i-1].description}</p>
                                </div>
                            </div>
                            </div>
                            `;
        row.appendChild(column);
        if (i % 5 == 0) {
            container.appendChild(row);
            row = document.createElement('div');
            row.classList.add('row');
        }

    }
    const cards = document.getElementsByClassName('card');
    console.log(cards);
    // for(let i = 0; i< cards.length; ++i){
    //     cards[i].onmouseenter = e =>{
            
    //     }
    //     cards[i].onmouseleave = e =>{
    //         e.target.style.transform = "scale(1)";
    //         e.target.style.transition = "all .2s ease-in-out";
    //     }
    // }

}
const paginationLinks = document.getElementsByClassName('page-link');

for (let i = 0; i < paginationLinks.length; ++i) {
    if (i == 0) {
        paginationLinks[i].onclick = () => {
            --nextPage;
            nextPage = (nextPage == 0) ? 7 : nextPage;
            console.log(nextPage);
            makeBeersCards();
        }
    } else if (i == paginationLinks.length - 1) {
        paginationLinks[i].onclick = () => {
            ++nextPage;
            nextPage = (nextPage == 8) ? 1 : nextPage;
            console.log(nextPage);
            makeBeersCards();
        }
    } else {
        paginationLinks[i].onclick = e => {
            const number = e.target.textContent;
            nextPage = parseInt(number);
            container.innerHTML = "";
            makeBeersCards();
            console.log(nextPage);
        }
    }
}


// function expand(card){
// card.onmouseenter = e =>{
//     e.target.style.transform = "scale(1.5)";
// }
// }