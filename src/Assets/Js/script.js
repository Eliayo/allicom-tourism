const heroSection = document.getElementById("hero");
const backgrounds = JSON.parse(heroSection.dataset.background);
let currentIndex = 0;

// Function to change the background image with a fade effect
function changeBackground() {
  heroSection.style.transition = "background-image 1s ease-in-out";
  heroSection.style.backgroundImage = `url('${backgrounds[currentIndex]}')`;

  currentIndex = (currentIndex + 1) % backgrounds.length;
}

// Start the slider
setInterval(changeBackground, 5000); // Change image every 5 seconds

document.getElementById("mobile-menu-btn").addEventListener("click", () => {
  const mobileMenu = document.getElementById("mobile-menu");
  mobileMenu.classList.toggle("hidden");
});

//
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".relative img");
  let currentIndex = 0;

  // Function to show the current image and hide the others
  const showImage = (index) => {
    images.forEach((img, idx) => {
      img.classList.toggle("hidden", idx !== index);
    });
  };

  // Function to move to the next image
  const nextImage = () => {
    currentIndex = (currentIndex + 1) % images.length; // Cycle through images
    showImage(currentIndex);
  };

  // Start the slider with a set interval (e.g., 3 seconds)
  setInterval(nextImage, 3000);

  // Initial display
  showImage(currentIndex);
});

//-----------------------------------------

const API_URL =
  "https://api.allicomtravels.com/tour/get-available-tourism-site/";

let currentPage = 1;

async function fetchTourismSites(page = 1) {
  const destination = document.getElementById("destination").value;
  const date = document.getElementById("date").value;

  if (!destination || !date) {
    alert("Please select a destination and date.");
    return;
  }

  // Split the destination into city and country
  const [city, country] = destination.split(",");
  const dayOfWeek = new Date(date)
    .toLocaleDateString("en-US", {
      weekday: "long",
    })
    .toLowerCase();

  try {
    const response = await fetch(
      `${API_URL}?city=${city}&country=${country}&day_of_week=${dayOfWeek}&page=${page}`,
      {
        headers: { accept: "application/json" },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    displayTourismSites(data.results);
    setupPagination(data.count, page);
  } catch (error) {
    console.error("Error fetching tourism sites:", error);
    document.getElementById(
      "tourism-cards"
    ).innerHTML = `<p class="text-center text-red-600">Error loading tourism sites. Please try again later.</p>`;
  }
}

function displayTourismSites(sites) {
  const container = document.getElementById("tourism-cards");
  container.innerHTML = "";

  if (!sites || sites.length === 0) {
    container.innerHTML = `<p class="text-center text-gray-600">No tourism sites available.</p>`;
    return;
  }

  sites.forEach((site) => {
    const card = `
      <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <img src="${
          site.image || "https://via.placeholder.com/150"
        }" alt="Image of ${site.city}" class="w-full h-48 object-cover">
        <div class="p-4">
          <h3 class="text-lg font-bold">${site.city}, ${site.country}</h3>
          <p class="text-gray-600">${
            site.description || "No description available."
          }</p>
          <p class="text-yellow-600 font-bold">₦${site.price || "N/A"}</p>
        </div>
      </div>
    `;
    container.innerHTML += card;
  });
}

function setupPagination(totalResults, currentPage) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const totalPages = Math.ceil(totalResults / 10);

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.className =
      "px-4 py-2 rounded " +
      (i === currentPage
        ? "bg-blue-600 text-white"
        : "bg-gray-300 hover:bg-gray-400");

    button.addEventListener("click", () => {
      fetchTourismSites(i);
    });

    pagination.appendChild(button);
  }
}

document
  .getElementById("searchButton")
  .addEventListener("click", () => fetchTourismSites(currentPage));

// ---------------------------------------
