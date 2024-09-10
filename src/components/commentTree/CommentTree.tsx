import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IComment } from "../../types.ts";
import axios from "axios";
import "./style.css";

const CommentTree: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [rootComment, setRootComment] = useState<IComment[]>([]);
  const [childComment, setChildComment] = useState<{
    [key: number]: IComment[];
  }>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [visibleComments, setVisibleComments] = useState<{
    [key: number]: boolean;
  }>({});

  const fetchOneComment = async (id: number) => {
    const response = await axios.get<IComment>(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`,
    );
    return response.data;
  };

  const fetchAllComments = useCallback(
    async (ids: number[]): Promise<IComment[]> => {
      const commentsData: IComment[] = [];
      for (const id of ids) {
        const comment = await fetchOneComment(id);
        commentsData.push(comment);
      }
      return commentsData;
    },
    [],
  );

  const loadChildComments = async (parentId: number, childIds: number[]) => {
    if (childComment[parentId]) return;
    const comments = await fetchAllComments(childIds);
    setChildComment((prev) => ({ ...prev, [parentId]: comments }));
  };

  const toggleCommentsVisibility = (commentId: number) => {
    setVisibleComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const loadRootComments = async () => {
    if (!id) return;
    try {
      const response = await axios.get<{ kids: number[] }>(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`,
      );
      const rootKids = response.data.kids;
      if (rootKids) {
        const comments = await fetchAllComments(rootKids);
        setRootComment(comments);
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadRootComments();
  }, [id, fetchAllComments]);

  return (
    <div>
      {isLoading && <h3>Загрузка...</h3>}
      {!rootComment.length && <h3>Комментарии отсутствуют</h3>}
      <>
        <div className="comment-tree-container">
          {rootComment.map((comment) => (
            <div className="comment-tree-card" key={comment.id}>
              <p>{comment.text}</p>
              {comment.kids && (
                <button
                  type="button"
                  className="comment-tree-card-button"
                  onClick={() => {
                    loadChildComments(comment.id, comment.kids!);
                    toggleCommentsVisibility(comment.id);
                  }}
                >
                  {visibleComments[comment.id]
                    ? "Скрыть ответы"
                    : "Показать ответы"}
                </button>
              )}
              {visibleComments[comment.id] && childComment[comment.id] && (
                <div>
                  {childComment[comment.id].map((child) => (
                    <div className="comment-tree-child" key={child.id}>
                      <p>{child.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          className="comment-tree-update-comment-button"
          onClick={loadRootComments}
        >
          Обновить комментарии
        </button>
      </>
    </div>
  );
};

export default CommentTree;
