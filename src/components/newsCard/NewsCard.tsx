import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { INewsItem } from "../../types.ts";
import CommentTree from "../commentTree/CommentTree.tsx";
import "./style.css";
import { fetchNewsItem } from "../../utils/fetchNewsItem.tsx";
import Button from "../common/Button.tsx";

const NewsCard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [newsItem, setNewsItem] = useState<INewsItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const fetchNewsCard = useCallback(async () => {
    const data = await fetchNewsItem(id!);
    setNewsItem(data);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchNewsCard();
  }, [fetchNewsCard]);

  return (
    <div className="news-card-container">
      {loading && (
        <div className="news-card-loading-title"> Загрузка новости...</div>
      )}
      <div>
        <div className="news-card-header">
          <h1 className="news-card-title">{newsItem?.title}</h1>
          <Button
            className="news-card-return-news-list-button"
            onClick={() => navigate("/")}
          >
            Вернуться к списку новостей
          </Button>
        </div>
        <div className="news-card-specifications">
          <div className="news-card-author">Автор: {newsItem?.by}</div>
          <a className="news-card-news-url" href={newsItem?.url || "#"}>
            Страница новости
          </a>
          <div className="news-card-date">
            Дата публикации:{" "}
            {new Date(newsItem?.time * 1000).toLocaleDateString()}
          </div>
          <div className="news-card-comment-score">
            Комментарии: {newsItem?.descendants}
          </div>
        </div>
        <div className="news-card-comment-tree">
          <h2 className="news-card-comment-banner">Комментарии:</h2>
          <CommentTree />
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
