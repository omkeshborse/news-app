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
  data.articles.forEach((item) => {});
});
