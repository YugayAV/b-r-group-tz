import axios from "axios";
import { INewsItem } from "../types.ts";

export const fetchNewsItem = async (id: string): Promise<INewsItem | null> => {
  try {
    const response = await axios.get<INewsItem>(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`,
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка при открытии новости", error);
    return null;
  }
};
