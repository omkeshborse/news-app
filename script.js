const cards = document.querySelector(".cards");
const category = document.querySelector(".category");
const categorySpan = document.querySelectorAll(".category span");
const baseUrl = "https://newsapi.org/v2/";
const apiKey = "&apiKey=f1c80de658354e51bd7853ce2788e274";

const India =
  "top-headlines?country=in&language=en&apiKey=f1c80de658354e51bd7853ce2788e274";
const Business = "top-headlines?country=in&category=business&language=en";
const Cryptocurrency = "everything?q=crypto&language=en&sortBy=publishedAt";
const tech = "top-headlines?sources=techcrunch&language=en";

async function dataRequest(url) {
  try {
    const response = await fetch(baseUrl + url + apiKey);
    const data = await response.json(); 
    return data;
  } catch (error) {
    console.log(error);
  }
}
function requestUrl(url) {
  dataRequest(url).then((data) => {
    data.articles.forEach((item) => {
      const { title, description, source, url, urlToImage, publishedAt } = item;
      cards.innerHTML += `
                          <div class="card">
                            <div class="image">
                                <img src="${
                                  urlToImage
                                    ? urlToImage
                                    : "./images/daily-paper-464015_1280.jpg"
                                }" alt="${source.name}">
                            </div>
                            <div class="information">
                                <div>
                                    <p class="title">${title}</p>
                                    <p class="description">${
                                      description ? description : ""
                                    }</p>
                                    <p class="time">
                                        <span>${
                                          publishedAt
                                            .replace("Z", " ")
                                            .split("T")[1]
                                        }</span>
                                        <span>${
                                          publishedAt
                                            .replace("Z", " ")
                                            .split("T")[0]
                                        }</span>
                                    </p>
                                </div>
                                <div class="other">
                                    <span class="source">${source.name}</span>
                                    <a class="url" href="${url}" target="_blank">Read Article <i class="fa-solid fa-arrow-right-long"></i></a>
                                </div>
                            </div>
                        </div>  `;
    });
  });
}

category.addEventListener("click", (e) => {
  if (e.target.tagName === "SPAN") {
    if (e.target.dataset.id === "all") {
      reRenderList(India);
      e.target.classList.add("active");
    } else if (e.target.dataset.id === "business") {
      reRenderList(Business);
      e.target.classList.add("active");
    } else if (e.target.dataset.id === "crypto") {
      reRenderList(Cryptocurrency);
      e.target.classList.add("active");
    } else if (e.target.dataset.id === "technology") {
      reRenderList(tech);
      e.target.classList.add("active");
    }
  }
});
requestUrl(India);

function reRenderList(newsUrl) {
  cards.innerHTML = "";
  requestUrl(newsUrl);
  categorySpan.forEach((item) => {
    item.classList.remove("active");
  });
}
