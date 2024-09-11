import axios from "axios";
import { INewsItem } from "../types.ts";

export const fetchNews = async (): Promise<INewsItem[]> => {
  try {
    const response = await axios.get<number[]>(
      "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty",
    );
    const topIdNews = response.data.slice(0, 100);
    const newsPromises = topIdNews.map((id) =>
      axios.get<INewsItem>(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`,
      ),
    );
    const newsResponse = await Promise.all(newsPromises);
    return newsResponse.map((res) => res.data).sort((a, b) => b.time - a.time);
  } catch (error) {
    console.error("Ошибка получения новостей", error);
    return [];
  }
};
