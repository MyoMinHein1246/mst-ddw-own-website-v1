const folderPath = "./car-data/";
let carsData;

// Function to fetch JSON data
async function fetchCarsData() {
  // Load the file-list.json to get the list of JSON files
  fetch(folderPath + "data-list.json")
    .then((response) => response.json())
    .then((files) => {
      // Use Promise.all to fetch each JSON file and combine them
      const promises = files.map((file) =>
        fetch(folderPath + file).then((response) => response.json())
      );

      return Promise.all(promises);
    })
    .then((dataArrays) => {
      // Combine the arrays into a single array
      const combinedData = dataArrays.reduce(
        (result, dataArray) => result.concat(dataArray),
        []
      );

      // Now combinedData contains the merged array from all JSON files
      console.log(combinedData);
      carsData = combinedData;
      searchCars(null);
    })
    .catch((error) => console.error("Error loading JSON files:", error));
}

// Call the function to fetch JSON data
fetchCarsData();

function displayResults(results) {
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  if (results.length === 0) {
    resultsContainer.setAttribute("style", "display: block;");
    resultsContainer.innerHTML = "<p>No matching cars found.</p>";
    return;
  }

  resultsContainer.setAttribute("style", "display: grid;");

  results.forEach((car, index) => {
    const carSection = document.createElement("section");
    carSection.innerHTML = `
                    <h1>${car.title}</h1>
                    <figure>
                        <div class="slideshow" id="slideshow${index + 1}">
                            ${car.images
                              .map(
                                (image) =>
                                  `<img class="slide" src="${image.src}" alt="${image.alt}" />`
                              )
                              .join("")}
                            <div class="btn-container">
                                <button class="btn-previous" onclick="changeSlide(-1, 'slideshow${
                                  index + 1
                                }')">&lt;</button>
                                <button class="btn-next" onclick="changeSlide(1, 'slideshow${
                                  index + 1
                                }')">&gt;</button>
                            </div>
                        </div>
                        <figcaption>
                            <h2>Overview</h2>
                            ${car.overview
                              .map((overview) => `<p>${overview}</p>`)
                              .join("")}
                        </figcaption>
                    </figure>
                `;
    resultsContainer.appendChild(carSection);
  });
}

function searchCars(event) {
  if (event) {
    event.preventDefault();
  }

  const searchInput = document.getElementById("txt-search");
  const searchTerm = searchInput.value.toLowerCase();

  const results = carsData.filter((car) =>
    car.title.toLowerCase().includes(searchTerm)
  );

  displayResults(results);
  setUp();
}
