const container = document.querySelector('.container')
const coinContainer = document.querySelector('.coin-container')
const selectOption = document.querySelector('.select-option')
const searchInput = document.querySelector('#search')



function getCryptoData() {

    function getApiData(id) {
        fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false%27')
            .then(response => response.json())
            .then((response) => {
                console.log(response)
                creatCard(response)
                idDropDown(response)
                search(response)

            })
    }
    getApiData()
}
getCryptoData();

function search(apidata){
    searchInput.addEventListener('input',(e)=>{
        const value = e.target.value;
        const filteredData = apidata.filter((val)=>{
            if(val.name.toLowerCase().includes(value.toLowerCase())){
                return searchInput
            }
        })
        
    console.log(filteredData)
    removeAllChildNodes(coinContainer)
        creatCard(filteredData)
    })

}

function creatCard(apidata) {
    apidata.forEach((val) => {

        const card = document.createElement('div')
        card.classList.add('card')

        const image = document.createElement('img')
        image.src = val.image

        const heading = document.createElement('h2')
        heading.innerHTML = val.name

        const para = document.createElement('p')
        para.innerHTML = val.current_price

        card.appendChild(image)
        card.appendChild(heading)
        card.appendChild(para)

        coinContainer.appendChild(card)

    });
}

function idDropDown(apidata) {

    const selectTag = document.createElement('select')
    selectTag.addEventListener('change', (e) => {
        let selectOption = e.target.value

        var filteredData = apidata.filter((val)=>{
            return  val.name == selectOption
        })

        removeAllChildNodes(coinContainer)
        creatCard(filteredData)
    })

    apidata.forEach((val)=>{
        const  optiontag = document.createElement('option')
        optiontag.innerHTML = val.name

        selectTag.appendChild(optiontag)
    })

    selectOption.appendChild(selectTag)

}

function removeAllChildNodes(coinContainer){
    while(coinContainer.firstChild){
        coinContainer.removeChild(coinContainer.firstChild)
    }
}






