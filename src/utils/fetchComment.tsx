import axios from "axios";
import { IComment } from "../types.ts";

export const fetchOneComment = async (id: number) => {
  const response = await axios.get<IComment>(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`,
  );
  return response.data;
};

export const fetchAllComments = async (ids: number[]): Promise<IComment[]> => {
  const commentsData: IComment[] = [];
  for (const id of ids) {
    const comment = await fetchOneComment(id);
    commentsData.push(comment);
  }
  return commentsData;
};
