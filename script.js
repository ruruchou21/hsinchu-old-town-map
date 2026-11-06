/* =========================
   Landmark Data
========================= */

const landmarks = [

  {
    id: "city-hall",

    historicalName: "Hsinchu Prefectural Government Building",
    presentName: "Hsinchu City Hall",

    mapLabelPresent: "City Hall",
    mapLabelHistorical: "Prefectural Hall",

    address: "No. 120, Zhongzheng Road",

    // 現代地圖上的位置
    presentPosition: {
      x: 52,
      y: 32
    },

    // 日治時期地圖上的位置
    oldPosition: {
      x: 52,
      y: 32
    },

    fact:
      "The Hsinchu Prefectural Government Building served as an important administrative center during the Japanese Colonial Period. Today, the building is used as Hsinchu City Hall.",

    oldPics: [
      "images/state-hall-old-1.jpg",
      "images/state-hall-old-2.jpg",
      "images/state-hall-old-3.jpg"
    ],

    videoUrl: ""
  },


  {
    id: "art-museum",

    historicalName: "Hsinchu City Affair Office",
    presentName: "Hsinchu City Art Museum",

    mapLabelPresent: "Art Museum",
    mapLabelHistorical: "City Office",

    address: "No. 116, Central Road",

    presentPosition: {
      x: 63,
      y: 46
    },

    oldPosition: {
      x: 63,
      y: 46
    },

    fact:
      "The building was formerly used as the Hsinchu City Affair Office. It has since been renovated and reused as the Hsinchu City Art Museum.",

    oldPics: [
      "images/city-affair-old-1.jpg",
      "images/city-affair-old-2.jpg",
      "images/city-affair-old-3.jpg"
    ],

    videoUrl: ""
  },


  {
    id: "living-arts-center",

    historicalName: "Hsinchu Public Hall",
    presentName: "National Hsinchu Living Arts Center",

    mapLabelPresent: "Living Arts Center",
    mapLabelHistorical: "Public Hall",

    address: "No. 110, Wuchang Street",

    presentPosition: {
      x: 35,
      y: 60
    },

    oldPosition: {
      x: 35,
      y: 60
    },

    fact:
      "The Hsinchu Public Hall was once an important public gathering space. Today, the building is used as the National Hsinchu Living Arts Center.",

    oldPics: [
      "images/public-hall-old-1.jpg",
      "images/public-hall-old-2.jpg",
      "images/public-hall-old-3.jpg"
    ],

    videoUrl: ""
  },


  {
    id: "image-museum",

    historicalName: "Youlekan Theatre",
    presentName: "Hsinchu Image Museum",

    mapLabelPresent: "Image Museum",
    mapLabelHistorical: "Youlekan Theatre",

    address: "No. 65, Zhongzheng Road",

    presentPosition: {
      x: 72,
      y: 69
    },

    oldPosition: {
      x: 72,
      y: 69
    },

    fact:
      "The Hsinchu Image Museum was formerly known as Youlekan Theatre. The building has a long history as a place for public entertainment and film culture.",

    oldPics: [
      "images/youlekan-old-1.jpg",
      "images/youlekan-old-2.jpg",
      "images/youlekan-old-3.jpg"
    ],

    videoUrl: ""
  }

];


/* =========================
   Current Period
========================= */

let currentPeriod = "present";


/* =========================
   Render Map Markers
========================= */

function renderMapMarkers() {

  const presentLayer = document.getElementById("present-markers");
  const historicalLayer = document.getElementById("historical-markers");

  presentLayer.innerHTML = "";
  historicalLayer.innerHTML = "";

  landmarks.forEach((landmark, index) => {

    // Present Marker
    const presentMarker = createMarker(
      landmark,
      index,
      landmark.presentPosition,
      landmark.mapLabelPresent,
      "present"
    );

    presentLayer.appendChild(presentMarker);


    // Japanese Colonial Period Marker
    const historicalMarker = createMarker(
      landmark,
      index,
      landmark.oldPosition,
      landmark.mapLabelHistorical,
      "japanese"
    );

    historicalLayer.appendChild(historicalMarker);

  });

}


/* =========================
   Create Individual Marker
========================= */

function createMarker(landmark, index, position, label, period) {

  const button = document.createElement("button");

  button.className = "map-marker";

  button.style.left = position.x + "%";
  button.style.top = position.y + "%";

  button.setAttribute(
    "aria-label",
    "Explore " + label
  );

  button.innerHTML = `
    <span class="marker-number">${index + 1}</span>
    <span class="marker-name">${label}</span>
  `;

  button.addEventListener("click", () => {
    openDetail(landmark.id, period);
  });

  return button;

}


/* =========================
   Change Period
========================= */

function changePeriod(period) {

  currentPeriod = period;

  const presentMap = document.getElementById("present-map");
  const historicalMap = document.getElementById("historical-map");

  const mapTitle = document.getElementById("map-title");
  const mapStatus = document.getElementById("map-status");


  // Switch Map

  if (period === "present") {

    presentMap.classList.remove("hidden");
    historicalMap.classList.add("hidden");

    mapTitle.textContent = "Present";

    mapStatus.textContent =
      "Explore the present-day landmarks of Hsinchu.";

  } else {

    presentMap.classList.add("hidden");
    historicalMap.classList.remove("hidden");

    mapTitle.textContent = "Japanese Colonial Period";

    mapStatus.textContent =
      "Explore the historical landmarks of Hsinchu.";

  }


  // Update Active Button

  document.querySelectorAll(".period-button").forEach(button => {

    button.classList.toggle(
      "active",
      button.dataset.period === period
    );

  });


  // Update Landmark List

  renderLandmarkList();

}


/* =========================
   Landmark List
========================= */

function renderLandmarkList() {

  const list = document.getElementById("landmark-list");

  list.innerHTML = "";

  landmarks.forEach((landmark, index) => {

    const name =
      currentPeriod === "present"
        ? landmark.presentName
        : landmark.historicalName;

    const otherName =
      currentPeriod === "present"
        ? landmark.historicalName
        : landmark.presentName;

    const card = document.createElement("button");

    card.className = "landmark-card";

    card.innerHTML = `
      <span class="card-number">0${index + 1}</span>

      <div class="card-text">
        <h3>${name}</h3>
        <p>${otherName}</p>
      </div>
    `;

    card.addEventListener("click", () => {
      openDetail(landmark.id, currentPeriod);
    });

    list.appendChild(card);

  });

}


/* =========================
   Open Detail Modal
========================= */

function openDetail(id, period) {

  const landmark = landmarks.find(item => item.id === id);

  if (!landmark) return;

  const overlay = document.getElementById("detail-overlay");

  const title = document.getElementById("detail-title");
  const subtitle = document.getElementById("detail-subtitle");

  const name =
    period === "present"
      ? landmark.presentName
      : landmark.historicalName;

  const otherName =
    period === "present"
      ? landmark.historicalName
      : landmark.presentName;


  title.textContent = name;

  subtitle.textContent =
    otherName + " · " + landmark.address;


  // Show Old Pictures

  renderOldPics(landmark);


  // Show Interesting Fact

  document.getElementById("detail-fact").textContent =
    landmark.fact;


  // Show Interview Video

  renderVideo(landmark.videoUrl);


  // Display Modal

  overlay.classList.remove("hidden");

  document.body.style.overflow = "hidden";

}


/* =========================
   Old Pictures
========================= */

function renderOldPics(landmark) {

  const container = document.getElementById("old-pics");

  container.innerHTML = "";

  landmark.oldPics.forEach((imagePath, index) => {

    const img = document.createElement("img");

    img.src = imagePath;

    img.alt = landmark.historicalName + " historical photo " + (index + 1);

    img.onerror = function() {

      this.onerror = null;

      this.src = createPlaceholderImage(
        "Historical Photo " + (index + 1)
      );

    };

    container.appendChild(img);

  });

}


/* =========================
   Placeholder Image
========================= */

function createPlaceholderImage(text) {

  const safeText = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg"
         width="400"
         height="300"
         viewBox="0 0 400 300">

      <rect width="400" height="300" fill="#ded8c9"/>

      <path d="M0 230 L120 120 L210 210 L290 130 L400 230"
            fill="none"
            stroke="#aaa18e"
            stroke-width="3"/>

      <text x="200"
            y="270"
            text-anchor="middle"
            font-size="16"
            fill="#777568"
            font-family="Arial">
        ${safeText}
      </text>

    </svg>
  `;

  return "data:image/svg+xml;charset=UTF-8," +
    encodeURIComponent(svg);

}


/* =========================
   Interview Video
========================= */

function renderVideo(videoUrl) {

  const container = document.getElementById("video-area");

  container.innerHTML = "";

  const embedUrl = getYouTubeEmbedURL(videoUrl);

  if (embedUrl) {

    const iframe = document.createElement("iframe");

    iframe.src = embedUrl;

    iframe.title = "Interview Video";

    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

    iframe.allowFullscreen = true;

    container.appendChild(iframe);

  } else {

    container.innerHTML = `
      <div class="video-placeholder">
        <p>Interview video will be added here.</p>
      </div>
    `;

  }

}


/* =========================
   Convert YouTube URL
========================= */

function getYouTubeEmbedURL(url) {

  if (!url) return "";

  try {

    const parsedUrl = new URL(url);

    let videoId = "";

    if (parsedUrl.hostname.includes("youtu.be")) {

      videoId = parsedUrl.pathname.slice(1);

    } else if (
      parsedUrl.hostname.includes("youtube.com") ||
      parsedUrl.hostname.includes("youtube-nocookie.com")
    ) {

      if (parsedUrl.pathname === "/watch") {

        videoId = parsedUrl.searchParams.get("v") || "";

      } else if (parsedUrl.pathname.startsWith("/embed/")) {

        videoId = parsedUrl.pathname.split("/")[2] || "";

      }

    }

    if (!videoId) return "";

    return "https://www.youtube.com/embed/" + videoId;

  } catch (error) {

    return "";

  }

}


/* =========================
   Close Detail Modal
========================= */

function closeDetail() {

  document
    .getElementById("detail-overlay")
    .classList.add("hidden");

  document.body.style.overflow = "";

}


/* =========================
   Event Listeners
========================= */

// Period Buttons

document.querySelectorAll(".period-button").forEach(button => {

  button.addEventListener("click", () => {

    changePeriod(button.dataset.period);

  });

});


// Close Button

document
  .getElementById("close-modal")
  .addEventListener("click", closeDetail);


// Click Outside Modal

document
  .getElementById("detail-overlay")
  .addEventListener("click", event => {

    if (event.target.id === "detail-overlay") {

      closeDetail();

    }

  });


// Press ESC to Close

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {

    closeDetail();

  }

});


/* =========================
   Initialize Website
========================= */

renderMapMarkers();

renderLandmarkList();

changePeriod("present");