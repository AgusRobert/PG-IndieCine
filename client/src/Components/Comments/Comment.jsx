import CommentForm from "./CommentForm";

const Comment = ({
  updateComment,
  deleteComment,
}) => {
  const isEditing =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "editing";

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
  
  return (
    <div key={comment.id}>
      <div>
        <img src="/user-icon.png" /> {/* icono usuario */}
      </div>
      <div>
        <div>
          <div>{comment.username}</div>
          <div>{createdAt}</div>
        </div>
        {!isEditing && <div>{comment.body}</div>}
        {isEditing && (
          <CommentForm
            submitLabel="Actualizar"
            hasCancelButton
            initialText={comment.body}
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
