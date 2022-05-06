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

  /* const {id} = useParams() */
  
  const comments = useSelector(state => state.comments)
  const [backendComments, setBackendComments] = useState([]);
  const rootComments = backendComments.filter(backendComment => backendComment.CommentId===null)
   console.log(backendComments)

  /* const rootComments = comments?.filter(
    (backendComment) => backendComment?.CommentId === null
  ); */
  /* const getReplies = (commentId) =>
  comments?.filter((backendComment) => backendComment.CommentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      ); */
  const addComment = (text, parentId) => {
    createCommentApi(text, parentId).then((comment) => {
      setBackendComments([comment, ...backendComments]);
      setActiveComment(null);
    });
  };

 /*  const updateComment = (text, commentId) => {
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
  }; */

  useEffect(() => {
    dispatch(getComments(id));
    setBackendComments([comments])
  }, []);

  return (
    <div>
      <h3>Comments</h3>
      <div>Write comment</div>
      <CommentForm submitLabel="Write"
      /* backendComments={backendComments} */
      id={id}
      />
      <div>
        {rootComments.map((rootComment) => (
         <div key={rootComment.id}>
         <Comment
            
            id={id}
            comment={rootComment}
            /* replies={getReplies(rootComment.id)} */
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            /* deleteComment={deleteComment}
            updateComment={updateComment} */
            currentUserId={currentUserId}
          />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;