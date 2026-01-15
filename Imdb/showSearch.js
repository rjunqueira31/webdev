const header = document.querySelector('#pageTitle');
header.addEventListener('click', () => {
  window.location.reload();
});



const form = document.querySelector('#searchForm');
form.addEventListener('submit', async function(e) {
  e.preventDefault();
  let searchInput = form.elements.query.value;
  console.log('search input: ' + searchInput);

  if (searchInput === '') {
    searchInput = 'chicken';
  }

  try {
    const response =
        await axios.get('https://api.tvmaze.com/search/shows?q=' + searchInput);
    clearOldImages();
    getShows(response.data);
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
});

const clearOldImages = () => {
  document.querySelector('#searchResults2').innerHTML = '';
};

let colNum = 3;

const getShows = (shows) => {
  const searchResults = document.querySelector('#searchResults2');

  for (let result of shows) {
    const showDiv = document.createElement('div');
    showDiv.classList.add('display-item');

    // image
    const showImg = document.createElement('img');
    showImg.classList.add('display-image');
    if (result.show.image && result.show.image.medium) {
      showImg.src = result.show.image.medium;
    } else {
      showImg.src = 'resources/unknownImg.png';
    }

    const infoDiv = buildInfoDiv(result.show.name, result.show.summary);

    showDiv.append(showImg, infoDiv);
    searchResults.appendChild(showDiv);
  }
};

const trimSummary = (summary) => {
  let finalSummary = summary;
  if (summary && summary.length > 400) {
    finalSummary = summary.substring(0, 400) + '...';
    const seemore = document.createElement('a');
    seemore.classList.add('see-more');
    seemore.textContent = ' See More';
    finalSummary += seemore.outerHTML;
  }

  return finalSummary;
};

const stripHTML = (html) => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || '';
};

const buildInfoDiv = (name, summary) => {
  // title
  const title = document.createElement('h3');
  title.textContent = name || 'Unknown Show';

  // description
  const description = document.createElement('p');

  const fullText = stripHTML(summary || 'No description available');
  description.textContent =
      fullText.length > 400 ? fullText.substring(0, 400) + ' ... ' : fullText;

  description.innerHTML = description.textContent;

  const infoDiv = document.createElement('div');
  infoDiv.classList.add('display-info');
  infoDiv.append(title);

  if (fullText.length > 400) {
    const seeMore = document.createElement('span');
    seeMore.classList.add('see-more');
    seeMore.id = 'see-more';
    seeMore.textContent = 'See more';
    seeMore.addEventListener('click', () => {
      openPopup(title.textContent, fullText);
    });

    description.appendChild(seeMore);
  }

  infoDiv.append(description);

  return infoDiv;
};

const openPopup = (title, fullText) => {
  const popup = document.querySelector('#popup');
  const popupTitle = document.querySelector('#popup-title');
  const popupText = document.querySelector('#popup-text');

  popupTitle.textContent = title;
  popupText.textContent = fullText;

  popup.classList.remove('hidden');

  const closePopupBtn = document.querySelector('#closePopup');
  closePopupBtn.addEventListener('click', () => {
    popup.classList.add('hidden');
  });
};


let FirstPeopleSearch = false;
let searchPeopleResults;

const peopleForm = document.querySelector('#searchPeople');
peopleForm.addEventListener('input', async function(e) {
  let currentPeopleSearch = peopleForm.value;

  if (!FirstPeopleSearch) {
    FirstPeopleSearch = true;
    searchPeopleResults = await PeopleSearchAPI();
  }

  clearOldImages();
  getPeople(searchPeopleResults, currentPeopleSearch);
});

const PeopleSearchAPI =
    async () => {
  try {
    const response = await axios.get('https://api.tvmaze.com/people');
    if (!response.data) {
      return;
    }
    clearOldImages();
    return response.data;
  } catch (error) {
    console.error('Error fetching data: ', error);
    return {};
  }
}

const getPeople = (people, input) => {
  const searchResults = document.querySelector('#searchResults2');

  console.log('Searching people for input: ', input);
  for (let person of people) {
    if (person.name.toLowerCase().includes(input.toLowerCase()) ||
        (person.country && person.country.name &&
         person.country.name.toLowerCase().includes(input.toLowerCase()))) {
      const personDiv = document.createElement('div');
      personDiv.classList.add('display-item');

      // image
      const personImg = document.createElement('img');
      personImg.classList.add('display-image');
      if (person.image && person.image.medium) {
        personImg.src = person.image.medium;
      } else {
        personImg.src = 'resources/unknownImg.png';
      }

      const infoDiv = document.createElement('div');
      infoDiv.classList.add('display-info');

      // name
      const name = document.createElement('h3');
      name.textContent = person.name || 'Unknown Person';

      infoDiv.appendChild(name);
      personDiv.append(personImg, infoDiv);
      searchResults.appendChild(personDiv);
    }
  }
};
