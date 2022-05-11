// div que contiene al commentform y componentes comment 
import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";

const Comments = (filmId, userId) => {

  // useEffect(() => {
  //   getCommentsApi().then((data) => {
  //     setBackendComments(data);
  //   });
  // }, []);


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

  return (
    <div>
      <h3>Comments lsdglsdkgjslkjslj</h3>
      <div>Write comment skglksdñsksñ</div>
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