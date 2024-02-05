const cards = document.querySelector(".cards");
console.log(cards);

const url =
  "https://newsapi.org/v2/everything?q=tesla&from=2024-01-05&sortBy=publishedAt&apiKey=f1c80de658354e51bd7853ce2788e274";

async function dataRequest() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data.articles);
    return data;
  } catch (error) {
    console.log(error);
  }
}
const temp = dataRequest(url).then((data) => {
  data.articles.forEach((item) => {
    const { title, description, source, url, urlToImage, publishedAt } = item;
    cards.innerHTML += `
                          <div class="card">
                            <div class="image">
                                <img src="${urlToImage}" alt="${source.name}">
                            </div>
                            <div class="information">
                                <div>
                                    <p class="title">${title}</p>
                                    <p class="description">${description}</p>
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
                        </div>
    
    
    `;
  });
});
