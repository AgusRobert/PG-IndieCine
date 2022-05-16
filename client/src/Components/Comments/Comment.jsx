import CommentForm from "./CommentForm";
import { deleteComment, updateComment } from "../../redux/actions";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Avatar, Box, Button, Divider, Paper, Typography } from "@mui/material";
import { amber, deepPurple,grey  } from "@material-ui/core/colors";
import { styled } from "@mui/system";
import { maxWidth } from "@mui/system/sizing";
import "./comments.modules.css"


const ButtonStyle = styled(Button)({
  whiteSpace: "nowrap",
  color: "white",
  borderBlockColor: deepPurple[200],
  borderInlineStartColor: deepPurple[900],
  borderInlineEndColor: deepPurple[900],
  backgroundColor:deepPurple[400],
});
const AvatarStyle = styled(Avatar)({
  height:45,
  width:50,
  borderRadius: 40,
  borderRight: "4px solid transparent",
});
const BodyStyle = styled(Box)({
  padding: "10px",
  whiteSpace:"pre-line",
  maxWidth:"500px",
  color: "white"
});
const BoxStyle = styled(Box)({
  padding: "20px",
});
const NameStyle = styled(Paper)({
  paddingLeft:20,
  paddingRight:20,
  backgroundColor: "#f4b942",
  borderRadius: 20,
  display:"inline-block",

});
const Pgeneral = styled(Paper)({
  paddingLeft:5,
  paddingRight:5,
  backgroundColor: "#1f271b",
  borderRadius: 20,
  display:"inline-block",
  width: "100%",
  paddingTop: 0,
  paddingBottom: 0,

});
const BoxGeneral = styled(Box)({
  padding: "5px",
  display:"flex",
});

const ButtonBox = styled(Box)({
  backgroundColor: "#f4b942",
  width: "65px",
  display:"flex",
  padding: 0,
  borderRadius: 5,
  ":hover":{
    backgroundColor: "#93a8ac"
  }
});

const CloseBox = styled(Box)({
  width: "25px"
});

const FooterBox = styled(Box)({
  display:"flex",
  justifyContent: "flex-end",
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
      <FooterBox>
        {comment.UserId === userId &&
          <ButtonBox>
            <ButtonStyle onClick={handleEdit}>{aux ? "Cerrar" : "Editar"}</ButtonStyle>
          </ButtonBox>
        }
        {aux && <CommentForm info={infoUpdate} closeFn={closeForm} />}
        {comment.UserId === userId &&
          <CloseBox>
            <button className="deleteButton" onClick={handleDelete}>X</button>
          </CloseBox>
        }
      </FooterBox>
    </BoxStyle>
    <Divider/>
   </Pgeneral></BoxGeneral> 
  );
};

export default Comment;
