import React, { useEffect, useState } from "react";
import NewsItem from "../../types.ts";
import axios from "axios";

const NewsList: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  /* создали стейт для хранения массива новостей, типизируем его через дженерик указывая что стейт будет
    массивом и про типизирован как NewsItem, начальное состояние пустой массив */

  const [loading, setLoading] = useState<boolean>(true);
  /* еще одно состояние которое будет использоваться это лоадинг, оно необходимо для того что бы
     что - то показывать в момент ожидания загрузки новостей, и так же типизируется через дженерик как булеан,
     начальное состояние имеет true */

  /* далее мы создаем фетч запрос естественно асинхронный и используем трай кетч что бы с лучае чего отловить ошибку*/
  const fetchNews = async () => {
    try {
      const response = await axios.get<number[]>(
        "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty",
      );
      /*здесь мы делаем запрос и в запросе дженериком указываем какой тип данных нам нужен и в каком виде,
       * то есть нам нужны цифры в виде массива*/
      const topIdNews = response.data.slice(0, 100);
      /*после того как мы получили массив из 500 новостей мы отрезаем первые 100 и кладем в новую переменную */
      const newsPromises = topIdNews.map((id) =>
        axios.get<NewsItem>(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`,
        ),
      );
      /*создаем переменную в которой будем мапить массив с 100 новостями и делаем запрос к АПИ для получения новостей по ID*/
      const newsResponse = await Promise.all(newsPromises);
      /*здесь мы ждем выполнения всех запросов которые отправили по ID*/

      const sortDateNews = newsResponse
        .map((res) => res.data)
        .sort((a, b) => b.time - a.time);
      /* в этой переменной мы мапим и сортируем в порядке убывания по дате */
      setNews(sortDateNews);
      /* кладем в стейт результаты выполнения */
      console.log(sortDateNews);
    } catch (error) {
      console.error("Ошибка получения новостей", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    /* первым делом вызываем функцию которая делает запрос*/
    const interval = setInterval(fetchNews, 60000);
    /*ставим интервал согласно ТЗ и обновляем запрос каждую минуту*/
    return () => clearInterval(interval);
    /*обязательно очищаем интервал при размонтировании компонента*/
  }, []);

  return (
    <div>
      <h1 className="news-banner">Последние новости</h1>
      {loading ? (
        <p className="loading-title">Загружаю новости...</p>
      ) : (
        <ul className="news-list">
          {news.map((item) => (
            <li className="news-card" key={item.id}>
              <a href="/" className="news-title">
                {item.title}
              </a>
              <p className="news-author">Автор: {item.by}</p>
              <p className="news-score">Рейтинг: {item.score}</p>
              <p className="news-comments">Комментарии: {item.descendants}</p>
              <p className="news-date">
                Дата публикации:{" "}
                {new Date(item.time * 1000).toLocaleDateString()};
              </p>
            </li>
          ))}
          <button onClick={fetchNews} type="button" className="update-newsList">
            Обновить новости
          </button>
        </ul>
      )}
    </div>
  );
};

export default NewsList;
