const $navigation = document.getElementById("navigation");
const $timer = document.getElementById("timer");
const $lineUp = document.getElementById("lineUp");

function generateNavHTML(navItems) {
  let navHtml = "";
  for (const navitem of navItems) {
    if (navitem.type === "external") {
      navHtml += `<a href="${navitem.link}" target="_blank"><li>${navitem.name}</li></a>`;
    } else {
      navHtml += `<a href="${navitem.link}"><li>${navitem.name}</li></a>`;
    }
  }
  return navHtml;
}

function updateCountdown() {
  const currentTime = new Date().getTime();
  const timeDifference = secondsToNextFestival - currentTime;

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  $timer.innerHTML = `<h1>${days}<span class="highlight">days</span> ${hours}<span class="highlight">h</span> ${minutes}<span class="highlight">m</span> ${seconds}<span class="highlight">s</span></h1><p>till next edition</p>`;
}
function timeCalc(time, isTrue) {
  const startDateTime = new Date(time);
  let startTime;
  if (isTrue == true) {
    const day = String(startDateTime.getDate()).padStart(2, "0");
    const month = String(startDateTime.getMonth() + 1).padStart(2, "0");
    const startHours = String(startDateTime.getHours()).padStart(2, "0");
    const startMinutes = String(startDateTime.getMinutes()).padStart(2, "0");
    startTime = `<span class="highlight">${day}/${month}</span> <span class="spacing"></span> ${startHours}.${startMinutes}`;
  } else if (isTrue == false) {
    const startHours = String(startDateTime.getHours()).padStart(2, "0");
    const startMinutes = String(startDateTime.getMinutes()).padStart(2, "0");
    startTime = `${startHours}.${startMinutes}`;
  }
  return startTime;
}

function generateLineUpHTML() {
  let lineUpHtml = "";

  for (const lineUp of lineUps) {
    const startWithDate = timeCalc(lineUp.from, true);

    const endTime = timeCalc(lineUp.to, false);

    lineUpHtml += `<div class= "descriptionShow grow">
       <img src="${lineUp.artist.image}" alt="${lineUp.artist.name}" title="${lineUp.artist.name}"></img>
       <h2>${lineUp.artist.name}</h2>
       <p>${lineUp.stage} | ${startWithDate} - ${endTime}</p>
       </div>`;
  }
  return lineUpHtml;
}

function clickDescriptionShow() {
  //first methode
   const $descriptionElements =
    document.getElementsByClassName("descriptionShow");
  const $artistInfo = document.getElementById("info");
  const $artistContainer = document.getElementById("container");

  for (let i = 0; i < $descriptionElements.length; i++) {
    $descriptionElements[i].addEventListener("click", function () {
      const artistData = lineUps[i].artist;
      const startTime = timeCalc(lineUps[i].from, true);
      const endTime = timeCalc(lineUps[i].to, false);
      $artistContainer.innerHTML = `
      <div id="info">
      <img src="${artistData.image}" alt="${artistData.name}" title="${artistData.name}">
      <div class="infoContent">
      <span>${lineUps[i].stage} | ${startTime} - ${endTime}</span>
      <h2>${artistData.name}</h2>
      <div class="socials">
      </div>
      <p>${artistData.description}</p>
      </div>
      </div>
      `;

      const $artistSocials = document.querySelector(".socials");

      for (const platform in artistData.socials) {
        const link = document.createElement("a");
        const brand = document.createElement("i");

        link.href = artistData.socials[platform];
        link.target = "_blank";
        link.title = `${platform}`

        brand.classList.add("fa-brands");
        brand.classList.add(`fa-${platform}`);
        brand.classList.add("fa-2xl");

        link.appendChild(brand);
        $artistSocials.appendChild(link);
      }
      
      if ($artistContainer.style.right === "0px") {
        $artistContainer.style.right = "-100%";
        document.body.classList.remove("lock-scroll");
      } else {
        $artistContainer.style.right = "0px";
        document.body.classList.add("lock-scroll");
      }
      $artistInfo.style.display = "block";
    });
  }
}

function buildUI() {
  $navigation.innerHTML = generateNavHTML(navItems);
  $lineUp.innerHTML = generateLineUpHTML();
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

function registerListeners() {
  clickDescriptionShow();
}

function initialize() {
  buildUI();
  registerListeners();
}

initialize();
