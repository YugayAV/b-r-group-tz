import React from "react";

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

export interface IButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export interface INewsItemProps {
  item: INewsItem;
  onItemClick: (item: INewsItem) => void;
}
