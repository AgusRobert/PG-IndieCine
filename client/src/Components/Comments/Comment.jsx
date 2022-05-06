import CommentForm from "./CommentForm";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";

const Comment = ({
  comment,
  replies,
  setActiveComment,
  activeComment,
  updateComment,
  deleteComment,
  currentUserId,
}) => {
  const isEditing =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "editing";
  const fiveMinutes = 300000;
  // const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
  const canDelete =
    currentUserId === comment.userId && replies.length === 0 ;
  const canEdit = currentUserId === comment.userId ;
  // const createdAt = new Date(comment.dataValues.createdAt).toLocaleDateString();
  const {user} = useAuth0()
  // && !timePassed
  return (
    <div key={comment.id}>
      <div>
        <img src={comment.picture}/>
      </div>
      <div>
        <div>
          <div>{comment.userEmail}</div>
          {/* <div>{createdAt}</div> */}
        </div>
        {/* {!isEditing && <div>{comment.dataValues.body}</div>} */}
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
          
          {canEdit && (
            <div
              onClick={() =>
                setActiveComment({ id: comment.id, type: "editing" })
              }
            >
              Editar
            </div>
          )}
          {canDelete && (
            <div
              onClick={() => deleteComment(comment.id)}
            >
              Borrar
            </div>
          )}
        </div>
       
      </div>
    </div>
  );
};

export default Comment;