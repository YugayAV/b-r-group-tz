export interface INewsItem {
  id: number;
  title: string;
  by: string;
  score: number;
  url: string;
  time: number;
  descendants: number;
}

export interface IComment {
  id: number;
  text: string;
  kids?: number[];
  parent?: number;
}
