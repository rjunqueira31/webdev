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

const getShows = (shows) => {
  const searchResults = document.querySelector("#searchResults2");

  for (let result of shows) {
    const showDiv = document.createElement("div");
    showDiv.classList.add("show-item");

    // image
    const showImg = document.createElement("img");
    showImg.classList.add("show-image");
    if (result.show.image && result.show.image.medium) {
      showImg.src = result.show.image.medium;
    } else {
      showImg.src = "resources/unknownImg.png";
    }

    // title
    const title = document.createElement("h3");
    title.textContent = result.show.name || "Unknown Show";

    // description
    const description = document.createElement("p");
    description.innerHTML = result.show.summary || "No description available";

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("show-info");
    infoDiv.append(title, description);

    showDiv.append(showImg, infoDiv);
    searchResults.appendChild(showDiv);
  }
};

const clearOldImages = () => {
  document.querySelector("#searchResults2").innerHTML = "";
};
