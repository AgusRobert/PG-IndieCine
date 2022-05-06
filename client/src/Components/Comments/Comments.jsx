import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { Link, useParams } from "react-router-dom";
import {
  createComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
} from "./api";
import { getComments } from "../../redux/actions";

const Comments = ({ currentUserId, id }) => {

  const [activeComment, setActiveComment] = useState(null);
  const dispatch = useDispatch();
  const comments = useSelector(state => state.comments)
  const [backendComments, setBackendComments] = useState([]);

  
  const addComment = (text, parentId) => {
    createCommentApi(text, parentId).then((comment) => {
      setBackendComments([comment, ...backendComments]);
      setActiveComment(null);
    });
  };
 console.log(backendComments)
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
    dispatch(getComments(id));
    setBackendComments([comments])
  }, []);

  return (
    <div>
      <h3>Comentarios</h3>
      <div>Danos tu opinion aqui</div>
      <CommentForm submitLabel="Write"
      id={id}
      />
      <div>
        {backendComments.length>0&& backendComments.map((backendComment) => (
         <div key={backendComment}>
         <Comment  
            comment={backendComment}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            deleteComment={deleteComment}
            updateComment={updateComment} 
            currentUserId={currentUserId}
          />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;