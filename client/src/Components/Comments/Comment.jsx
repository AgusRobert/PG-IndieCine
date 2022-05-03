import CommentForm from "./CommentForm";

const Comment = ({
  comment,
  replies,
  setActiveComment,
  activeComment,
  updateComment,
  deleteComment,
  addComment,
  parentId = null,
  currentUserId,
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
  const canEdit = currentUserId === comment.userId && !timePassed;
  const replyId = parentId ? parentId : comment.id;
  const createdAt = new Date(comment.createdAt).toLocaleDateString();
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
          {canReply && (
            <div
              onClick={() =>
                setActiveComment({ id: comment.id, type: "replying" })
              }
            >
              Responder
            </div>
          )}
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
                parentId={comment.id}
                replies={[]}
                currentUserId={currentUserId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;