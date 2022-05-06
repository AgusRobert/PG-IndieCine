import CommentForm from "./CommentForm";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { styled, width } from "@mui/system";
import { deepPurple, grey, amber } from "@mui/material/colors";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { InputBase } from "@mui/material";
import { Paper } from "@mui/material";
import Avatar from "@mui/material/Avatar";


const ButtonStyle = styled(Button)({
  color: "white",
  borderColor: deepPurple[500],
  backgroundColor: deepPurple[700],
  padding:8,
});
const AvatarStyle = styled(Avatar)({
  marginRight: "auto",
  color: amber[200],
  backgroundColor: deepPurple[700],
  height: 30,
  borderRadius: 20,
  border: `2px solid ${amber[400]}`,
  borderRight: "4px solid transparent",
});
const BoxStyle = styled(Box)({
  display: 'flex',   
  justifyContent: 'space-evenly',
  flexDirection: 'column'
})
const PaperStyle = styled(Paper)({
  backgroundColor: grey[800],
  width:600,
  borderRadius: 20,
  
})
const Comment = ({
  comment,
  replies,
  setActiveComment,
  activeComment,
  updateComment,
  deleteComment,
  addComment,
  CommentId = null,
  currentUserId,
  FilmId
}) => {
  const isEditing =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "editing";
  const isReplying =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "replying";
  const fiveMinutes = 300000;
  const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
  const canDelete =
    currentUserId === comment.userId && replies.length === 0 && !timePassed;
  const canReply = Boolean(currentUserId);
  const canEdit = currentUserId === comment.dataValues.userEmail && !timePassed;
  const replyId = CommentId ? CommentId : comment.id;
  const createdAt = new Date(comment.dataValues.createdAt).toLocaleDateString();

  const dispatch = useDispatch();
  
  const {user} = useAuth0()

  /* const {id} = useParams() */

  // useEffect(() => {
  //   dispatch(getComments(id));
  // }, [dispatch]);

  return (
   <Toolbar>
    <PaperStyle key={comment.id}>
      <div>
        <AvatarStyle src={user?.picture}/> {/* icono usuario */}
      </div>
      <div>
        <div>
          <div>{comment.username}</div>
          <div>{createdAt}</div>
        </div>
        {!isEditing && <div>{comment.dataValues.body}</div>}
        {isEditing && (
          <CommentForm
            submitLabel="Actualizar"
            hasCancelButton
            initialText={comment.dataValues.body}
            handleSubmit={(text) => updateComment(text, comment.id)}
            handleCancel={() => {
              setActiveComment(null);
            }}
          />
        )}
        <div>
          {canReply && (
            <ButtonStyle size="small"
              onClick={() =>
                setActiveComment({ id: comment.id, type: "replying" })
              }
            >
              Responder
            </ButtonStyle>
          )}
          {canEdit && (
            <ButtonStyle size="small"
              onClick={() =>
                setActiveComment({ id: comment.id, type: "editing" })
              }
            >
              Editar
            </ButtonStyle>
          )}
          {canDelete && (
            <ButtonStyle size="small"
              onClick={() => deleteComment(comment.id)}
            >
              Borrar
            </ButtonStyle>
          )}
        </div>
        {isReplying && (
          <CommentForm
            submitLabel="Responder"
            handleSubmit={(text) => addComment(text, replyId)}
          />
        )}
        {replies.length > 0 && (
          <div>
            {replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply.id}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                updateComment={updateComment}
                deleteComment={deleteComment}
                addComment={addComment}
                CommentId={comment.id}
                replies={[]}
                currentUserId={currentUserId}
              />
            ))}
          </div>
        )}
      </div>
    </PaperStyle>
    </Toolbar>
  );
};

export default Comment;