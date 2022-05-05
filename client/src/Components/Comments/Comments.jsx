import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { Link, useParams } from "react-router-dom";
import {
  getCommentsApi,
  createComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
} from "./api";
import { getComments } from "../../redux/actions";

const Comments = ({ commentsUrl, currentUserId }) => {

  const [activeComment, setActiveComment] = useState(null);
  
  const dispatch = useDispatch();

  const {id} = useParams()
  
  const comments = useSelector(state => state.comments)
  const [backendComments, setBackendComments] = useState(comments);

  let comentariosFiltrados = comments?.filter(data => id === data.filmId)
  
  console.log(comentariosFiltrados)

  const rootComments = comments?.filter(
    (backendComment) => backendComment.parentId === null
  );
  const getReplies = (commentId) =>
  comments?.filter((backendComment) => backendComment.CommentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  const addComment = (text, parentId) => {
    createCommentApi(text, parentId).then((comment) => {
      setBackendComments([comment, ...backendComments]);
      setActiveComment(null);
    });
  };

  const updateComment = (text, commentId) => {
    updateCommentApi(text).then(() => {
      const updatedBackendComments = backendComments.map((backendComment) => {
        if (backendComment.id === commentId) {
          return { ...backendComment, body: text };
        }
        return backendComment;
      });
      setBackendComments(updatedBackendComments);
      setActiveComment(null);
    });
  };
  const deleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to remove comment?")) {
      deleteCommentApi().then(() => {
        const updatedBackendComments = backendComments.filter(
          (backendComment) => backendComment.id !== commentId
        );
        setBackendComments(updatedBackendComments);
      });
    }
  };

  useEffect(() => {
    dispatch(getComments());
  }, [dispatch]);

  return (
    <div>
      <h3>Comments</h3>
      <div>Write comment</div>
      <CommentForm submitLabel="Write" handleSubmit={addComment} />
      <div>
        {comentariosFiltrados?.map((rootComment) => (
          <Comment
            key={rootComment.id}
            comment={rootComment}
            replies={getReplies(rootComment.id)}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            deleteComment={deleteComment}
            updateComment={updateComment}
            currentUserId={currentUserId}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;