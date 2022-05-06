import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import {  useParams } from "react-router-dom";
import {
  getCommentsApi,
  createComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
} from "./api";
import { getComments } from "../../redux/actions";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/system";
import { deepPurple, grey, amber } from "@mui/material/colors";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { InputBase } from "@mui/material";
import { Paper } from "@mui/material";

const ButtonStyle = styled(Button)({
  color: "white",
  borderColor: deepPurple[500],
  backgroundColor: deepPurple[700],
  padding:8
});
const BoxStyle = styled(Box)({
  display: 'flex',   
  justifyContent: 'space-evenly',
  flexDirection: 'column'
})
const PaperStyle = styled(Paper)({
  lineHeight: '60px',
  borderRadius: 20,
  backgroundColor: grey[900],
})



const Comments = ({ commentsUrl, currentUserId }) => {

  const [activeComment, setActiveComment] = useState(null);
  
  const dispatch = useDispatch();

  const {id} = useParams()
  
  const comments = useSelector(state => state.comments)
  const [backendComments, setBackendComments] = useState(comments);
  
 

   const rootComments = backendComments.filter(
    (backendComment) => backendComment.CommentId === null
  );
  const getReplies = (CommentId) =>
  backendComments?.filter((backendComment) => backendComment.CommentId === CommentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  const addComment = (text, CommentId) => {
    createCommentApi(text, CommentId).then((comment) => {
      setBackendComments([comment, ...backendComments]);
      setActiveComment(null);
    });
  };

  const updateComment = (text, CommentId) => {
    updateCommentApi(text).then(() => {
      const updatedBackendComments = backendComments.map((backendComment) => {
        if (backendComment.id === CommentId) {
          return { ...backendComment, body: text };
        }
        return backendComment;
      });
      setBackendComments(updatedBackendComments);
      setActiveComment(null);
    });
  };
  const deleteComment = (CommentId) => {
    if (window.confirm("Are you sure you want to remove comment?")) {
      deleteCommentApi().then(() => {
        const updatedBackendComments = backendComments.filter(
          (backendComment) => backendComment.id !== CommentId
        );
        setBackendComments(updatedBackendComments);
      });
    }
  };

  useEffect(() => {
    dispatch(getComments(id));
  }, [dispatch]);

  return (
    <div>
      <h3>Comments</h3>
      <div>Write comment</div>
      <CommentForm submitLabel="Write"
      id={id}
      handleSubmit={addComment} />
      <div>
        {comments?.length && comments?.map((rootComment) => (
          <PaperStyle variant="outlined" square >
          <Comment
            key={rootComment.id}
            FilmId={id}
            comment={rootComment}
            replies={getReplies(rootComment.id)}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            deleteComment={deleteComment}
            updateComment={updateComment}
            currentUserId={currentUserId}
          /></PaperStyle>
        ))}
      </div>
    </div>
  );
};

export default Comments;