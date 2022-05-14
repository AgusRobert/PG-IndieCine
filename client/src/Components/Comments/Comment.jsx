import CommentForm from "./CommentForm";
import { deleteComment, updateComment } from "../../redux/actions";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Avatar, Box, Button, Divider, Paper, Typography } from "@mui/material";
import { amber, deepPurple,grey  } from "@material-ui/core/colors";
import { styled } from "@mui/system";
import { maxWidth } from "@mui/system/sizing";


const ButtonStyle = styled(Button)({
  whiteSpace: "nowrap",
  color: deepPurple[200],
  borderBlockColor: deepPurple[200],
  borderInlineStartColor: deepPurple[900],
  borderInlineEndColor: deepPurple[900],
  backgroundColor:deepPurple[400]
});
const AvatarStyle = styled(Avatar)({
  color: amber[200],
  backgroundColor: deepPurple[900],
  height:45,
  width:50,
  borderRadius: 40,
  border: `2px solid ${amber[600]}`,
  borderRight: "4px solid transparent",
});
const BodyStyle = styled(Box)({
  padding: "10px",
  whiteSpace:"pre-line",
  maxWidth:"500px"
});
const BoxStyle = styled(Box)({
  padding: "20px",
});
const NameStyle = styled(Paper)({
  paddingLeft:20,
  paddingRight:20,
  backgroundColor: amber[600],
  borderRadius: 20,
  display:"inline-block",

});
const Pgeneral = styled(Paper)({
  paddingLeft:20,
  paddingRight:20,
  backgroundColor: deepPurple[200],
  borderRadius: 20,
  display:"inline-block",

});
const BoxGeneral = styled(Box)({
  padding: "10px",
  display:"flex",
});
const Comment = ({ comment, id, userId }) => {

  const dispatch = useDispatch()
  const [aux, setAux] = useState(false)
  const handleEdit = () => {
    setAux(!aux)
  }
  /* const isReplying =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "replying"; */
  // const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
  // const canEdit = currentUserId === comment.userId && !timePassed;

  // const canDelete =
  //   currentUserId === comment.userId && replies.length === 0 && !timePassed;
  /* const canReply = Boolean(currentUserId); */
  /*   const replyId = parentId ? parentId : comment.id; */
  const infoUpdate = {
    userId: comment.UserId,
    filmId: comment.FilmId,
    formType: "editar",
    id: id,
  }

  const closeForm = (payload) => {
    setAux(payload)
  }

  const handleDelete = () => {
    dispatch(deleteComment(id))
  }

  return (
    <BoxGeneral>
    <Pgeneral>
   <BoxStyle><BoxGeneral>
      <AvatarStyle src={comment.image} alt={comment.username} />
     <BodyStyle>
      <NameStyle>
        <Typography variant="h7" color={'black'} fontFamily="">{comment.username}</Typography></NameStyle></BodyStyle></BoxGeneral>
      <BodyStyle>{comment.body}</BodyStyle>
      {comment.UserId === userId &&
        <ButtonStyle size="small" variant="outlined"onClick={handleEdit}>{aux ? "Cerrar" : "Editar"}</ButtonStyle>
      }
      {aux && <CommentForm info={infoUpdate} closeFn={closeForm} />}
      {comment.UserId === userId &&
        <ButtonStyle size="small" variant="outlined" onClick={handleDelete}>X</ButtonStyle>
      }
    </BoxStyle>
    <Divider color="#ffb300"/>
   </Pgeneral></BoxGeneral> 
  );
};

export default Comment;
