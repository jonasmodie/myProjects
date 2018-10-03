const url =
  "https://newsapi.org/v2/top-headlines?country=us&apiKey=3b267e282e5e492da0ea7266cb2adc81";

export async function getNews() {
  let result = await fetch(url).then(response => response.json());
  return result.articles;
}