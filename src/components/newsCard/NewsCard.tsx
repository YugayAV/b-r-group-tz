import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { INewsItem } from "../../types.ts";
import axios from "axios";

const NewsCard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [newsItem, setNewsItem] = useState<INewsItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const fetchNewsCard = useCallback(async () => {
    try {
      const response = await axios.get<INewsItem>(
        ` https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`,
      );
      setNewsItem(response.data);
      // console.log(newsItem);
    } catch (error) {
      console.error("Ошибка при открытии новости", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchNewsCard();
  }, [fetchNewsCard]);

  return (
    <div>
      {loading ? (
        <p>Загрузка новости...</p>
      ) : (
        <div>
          <h1>{newsItem?.title}</h1>
          <p>Автор: {newsItem?.by}</p>
          <p>
            Дата публикации:{" "}
            {new Date(newsItem?.time * 1000).toLocaleDateString()}
          </p>
          <p>Комментарии: {newsItem?.descendants}</p>
          <button onClick={() => navigate("/")}>
            Вернуться к списку новостей
          </button>
          <h2>Комментарии:</h2>
        </div>
      )}
    </div>
  );
};

export default NewsCard;
