
const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  const phones = data.data;
  // console.log(phones)
  displayPhones(phones, isShowAll);

}

// loadPhone()
const displayPhones = (phones, isShowAll) => {
  const phoneContinar = document.getElementById('phone-conteinar');
  phoneContinar.textContent = '';

  //display show all btn 
  const showAllcaitinar = document.getElementById('show-all')
  if (phones.length > 12 && !isShowAll) {
    showAllcaitinar.classList.remove('hidden')
  }
  else {
    showAllcaitinar.classList.add('hidden')
  }
  console.log('is Show all', isShowAll);

  // phone show all not
  if (!isShowAll) {
    phones = phones.slice(0, 12)
  }

  phones.forEach(phone => {
    // console.log(phone)
    const phoneCard = document.createElement('div');
    phoneCard.classList = `card  bg-base-100 p-4 shadow-xl`
    phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center">
            <button onclick = "showAllaDetalis('${phone.slug}');"class="btn btn-primary">Show details</button>
          </div>
        </div>
        `
    phoneContinar.appendChild(phoneCard)
    loggingSpinar(false);
  })

}

//showall detelis

const showAllaDetalis = async (id) => {
  console.log('show all deteles', id)
  //data load
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const data = await res.json();
  const phone = data.data
  showPhoneDetelis(phone)
}

// show phone diteles
const showPhoneDetelis = (phone) => {
  console.log(phone)
  const phoneName = document.getElementById('phone-name');
  phoneName.innerText = phone.name
  const showDetsileContainar = document.getElementById('show-detsile-containar');
  showDetsileContainar.innerHTML = `
  <img src="${phone.image}" alt="">
  <p><span>Storage : </span>${phone.mainFeatures.storage}</p>
  <p><span>DisplaySaize : </span>${phone?.mainFeatures?.displaySize}</p>
  <p><span>DisplaySaize : </span>${phone?.others?.GPS || "NO GPS"}</p>
  <p><span>releaseDate: </span>${phone.releaseDate}</p>
  `
  show_deteles_modal.showModal();
}

const hendelSache = (isShowAll) => {
  loggingSpinar(true);
  const SearchFIled = document.getElementById('Search-input');
  const searchText = SearchFIled.value;
  loadPhone(searchText, isShowAll)
}
const loggingSpinar = (isLoding) => {
  const lodspinar = document.getElementById('loading-spinner')
  if (isLoding) {
    lodspinar.classList.remove('hidden')
  }
  else {
    lodspinar.classList.add('hidden')
  }
}
// handel showAll
const handelShowAll = () => {
  hendelSache(true)
}