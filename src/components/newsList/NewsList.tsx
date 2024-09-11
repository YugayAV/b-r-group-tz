import React, { useCallback, useEffect, useState } from "react";
import { INewsItem } from "../../types.ts";
import { fetchNews } from "../../utils/fetchNews.tsx";
import "./style.css";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button.tsx";

const NewsList: React.FC = () => {
  const [news, setNews] = useState<INewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadNews = useCallback(async () => {
    setLoading(true);
    const newsData = await fetchNews();
    setNews(newsData);
    setLoading(false);
  }, []);

  const navigate = useNavigate();
  const handelCardClick = (id: number) => {
    navigate(`/news/${id}`);
  };

  useEffect(() => {
    loadNews();
    const interval = setInterval(loadNews, 60000);
    return () => clearInterval(interval);
  }, [loadNews]);

  return (
    <div className="news-list-container">
      <div className="news-list-header">
        <h1 className="news-list-banner">Fresh Hacker's News</h1>
        <Button
          onClick={loadNews}
          type="button"
          className="news-list-button-update"
        >
          Refresh news list
        </Button>
      </div>
      {loading && (
        <div className="news-list-loading-title">Загружаю новости...</div>
      )}
      <div className="news-list">
        {news.map((item) => (
          <div
            className="news-list-card"
            key={item.id}
            onClick={() => handelCardClick(item.id)}
          >
            <div className="news-list-card-title">{item.title}</div>
            <div className="news-list-card-author">Автор: {item.by}</div>
            <div className="news-list-card-score">Рейтинг: {item.score}</div>
            <div className="news-list-card-comments">
              Комментарии: {item.descendants}
            </div>
            <div className="news-list-card-date">
              Дата публикации: {new Date(item.time * 1000).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsList;
