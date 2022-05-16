// div que contiene al commentform y componentes comment
import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../../redux/actions";
import { Box, Paper, styled, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import "./comments.modules.css"
const Titulo = styled(Typography)({
  color: "black ",
  fontSize: "30px",
  fontFamily: "Koulen"
});
const BoxStyle = styled(Box)({
  padding: "5px",
});
const NameStyle = styled(Paper)({
  paddingLeft:20,
  paddingRight:20,
  backgroundColor: "transparent",
  opacity: "90%",
  borderRadius: 20,
  display:"inline-block",
  paddingTop:20,
  paddingBottom:20,
  overflow: 'auto',
  maxHeight: 520,
  width: "100%",
  marginLeft: "20px"
});

const Comments = ({ filmId, userId, username, image }) => {

  const dispatch = useDispatch();
  const allComments = useSelector(state => state.comments);

  useEffect(() => {
    dispatch(getComments(filmId))
  }, [dispatch])

  /* console.log("ALL COMMENTS", allComments) */


  // autho -> email -> profileinfo -> userId
  // moviedetail -> idPeli

  // ({
  //   body,
  //   type: "comments"
  //   status: "ok",
  //   numberReport: 0, (botón que sume el contador)
  //   UserId: userId,
  //   CommentId: commentId, (1)
  //   FilmId: filmId,
  // });
  const infoPost = {
    userId: userId,
    filmId: filmId,
    formType: "postear",
    username,
    image,
  };
  return (
    <NameStyle>
      {/* <Titulo variant="bold">Comentarios</Titulo> */}
      <CommentForm info={infoPost} />
      {allComments ? allComments?.map(p => <BoxStyle><Comment comment={p} id={p.id} userId={userId} /></BoxStyle>) : "0"}
    </NameStyle>
  );
};

export default Comments;
