// div que contiene al commentform y componentes comment 
import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../../redux/actions";

const Comments = ({ filmId, userId, username, image }) => {
  // useEffect(() => {
  //   getCommentsApi().then((data) => {
  //     setBackendComments(data);
  //   });
  // }, []);

  const dispatch = useDispatch()
  const allComments = useSelector(state => state.comments)

  useEffect(() => {
    dispatch(getComments(filmId))
  }, [dispatch])

  console.log("ALL COMMENTS", allComments)


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
  }
  return (
    <div>
      <h3>Comentarios</h3>
      <CommentForm info={infoPost} />
      {allComments ? allComments?.map(p => <Comment comment={p} id={p.id} userId={userId}/*usernameComment={username} imageComment={image}*/ />) : "0"}
    </div>

    /* <CommentForm filmId= {filmId} userId={userId} /> 
     <div>
      <Comment
        currentUserId={currentUserId}
      />
      {/* {rootComments.map((rootComment) => (
      ))}
    </div> */

  );
};

export default Comments;