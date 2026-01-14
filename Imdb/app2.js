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

    const infoDiv = buildInfoDiv(result.show.name, result.show.summary);

    showDiv.append(showImg, infoDiv);
    searchResults.appendChild(showDiv);
  }
};

const clearOldImages = () => {
  document.querySelector("#searchResults2").innerHTML = "";
};

const trimSummary = (summary) => {
  var finalSummary = summary;
  if (summary && summary.length > 400) {
    finalSummary = summary.substring(0, 400) + "...";
    const seemore = document.createElement("a");
    seemore.classList.add("see-more");
    seemore.textContent = " See More";
    finalSummary += seemore.outerHTML;
  }

  return finalSummary;
};

const stripHTML = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || "";
};

const buildInfoDiv = (name, summary) => {
  // title
  const title = document.createElement("h3");
  title.textContent = name || "Unknown Show";

  // description
  const description = document.createElement("p");

  const fullText = stripHTML(summary || "No description available");
  description.textContent =
    fullText.length > 400 ? fullText.substring(0, 400) + " ... " : fullText;

  description.innerHTML = description.textContent;

  const infoDiv = document.createElement("div");
  infoDiv.classList.add("show-info");
  infoDiv.append(title);

  if (fullText.length > 400) {
    const seeMore = document.createElement("span");
    seeMore.classList.add("see-more");
    seeMore.id = "see-more";
    seeMore.textContent = "See more";
    seeMore.addEventListener("click", () => {
      openPopup(title.textContent, fullText);
    });

    description.appendChild(seeMore);
  }

  infoDiv.append(description);

  return infoDiv;
};

const openPopup = (title, fullText) => {
  const popup = document.querySelector("#popup");
  const popupTitle = document.querySelector("#popup-title");
  const popupText = document.querySelector("#popup-text");

  popupTitle.textContent = title;
  popupText.textContent = fullText;

  popup.classList.remove("hidden");

  const closePopupBtn = document.querySelector("#closePopup");
  closePopupBtn.addEventListener("click", () => {
    popup.classList.add("hidden");
  });
};
