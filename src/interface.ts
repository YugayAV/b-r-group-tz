interface NewsItem {
    id: number,
    title: string,
    by: string,
    score: number,
    url: string,
    time: number,
    descendants: number,
}

export default NewsItem;
