import CommentForm from "./CommentForm";
import { deleteComment, updateComment } from "../../redux/actions";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";


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
    <div>
      <img src={comment.image} alt={comment.username} />
      <div>
        <h4>{comment.username}</h4></div>
      <div>{comment.body}</div>
      {comment.UserId === userId &&
        <button onClick={handleEdit}>{aux ? "Cerrar" : "Editar"}</button>
      }
      {aux && <CommentForm info={infoUpdate} closeFn={closeForm} />}
      {comment.UserId === userId &&
        <button onClick={handleDelete}>X</button>
      }
    </div>
    // <div key={comment.id}>
    //   <div>
    //     <img src="/user-icon.png" /> {/* icono usuario */}
    //   </div>
    //   <div>
    //     <div>
    //       <div>{comment.username}</div>
    //       <div>{createdAt}</div>
    //     </div>
    //     {!isEditing && <div>{comment.body}</div>}
    //     {isEditing && (
    //       <CommentForm
    //       />
    //     )}
    //     <div>
    //       {canEdit && (
    //         <div
    //           // onClick={() =>
    //           //   updateComment(idPeli)
    //           // }
    //         >
    //           Editar
    //         </div>
    //       )}
    //       {/* {canDelete && (
    //         <div
    //           onClick={() => deleteComment(comment.id)}
    //         >
    //           Borrar
    //         </div>
    //       )} */}
    //     </div>
    //   </div>
    // </div>
  );
};

export default Comment;
