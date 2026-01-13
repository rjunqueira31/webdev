const form = document.querySelector("#searchForm");
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  var searchInput = form.elements.query.value;
  console.log("search input: " + searchInput);

  if (searchInput === "") {
    searchInput = "chicken";
  }

  try {
    const response = await axios.get(
      "https://api.tvmaze.com/search/shows?q=" + searchInput
    );
    clearOldImages();
    getShows(response.data);
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
});

var colNum = 3;

const getShows = async (shows) => {
  var showCount = 0;
  var showsvec = [];
  var img;
  var name;
  var desc;
  for (let result of shows) {
    if (result.show.name) {
      name = result.show.name;
    } else {
      name = "Unknown Show";
    }

    if (result.show.summary) {
      desc = result.show.summary;
    } else {
      desc = "No description available";
    }

    if (result.show.image && result.show.image.medium) {
      img = result.show.image.medium;
    } else {
      img = "resources/unknownImg.png";
    }
    showsvec.push({ name: name, desc: desc, img: img });

    showCount++;
    if (showCount == colNum) {
      appendImageRow(showsvec);
      showsvec = [];
      showCount = 0;
    }
  }
  if (showsvec.length > 0) {
    appendImageRow(showsvec);
  }
};

const appendImageRow = (shows) => {
  const container = document.querySelector("#searchResults");
  const linediv = document.createElement("div");
  linediv.classList.add("image-row");

  for (let show of shows) {
    const card = document.createElement("div");
    card.classList.add("show-card");

    const img = document.createElement("img");
    img.src = show.img;

    const info = document.createElement("div");
    info.classList.add("show-info");

    const title = document.createElement("h3");
    title.textContent = show.name;

    const description = document.createElement("p");
    description.innerHTML = show.desc;

    info.append(title, description);

    const seeMore = document.createElement("span");
    seeMore.textContent = "See more";
    seeMore.classList.add("see-more");

    seeMore.addEventListener("click", () => {
      openPopup(show.name, show.desc);
    });

    const MAX_CHARS = 800;

    if (show.desc.replace(/<[^>]*>/g, "").length > MAX_CHARS) {
      info.appendChild(seeMore);
    }

    card.append(img, info);
    linediv.appendChild(card);
  }

  container.appendChild(linediv);
};

const clearOldImages = () => {
  const container = document.querySelector("#searchResults");
  container.innerHTML = "";
};


const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popup-title");
const popupText = document.getElementById("popup-text");

const openPopup = (title, text) => {
  popupTitle.textContent = title;
  popupText.innerHTML = text;
  popup.classList.remove("hidden");
};

document.getElementById("closePopup").onclick = () => {
  popup.classList.add("hidden");
};
