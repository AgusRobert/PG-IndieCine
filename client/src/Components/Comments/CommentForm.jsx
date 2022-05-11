// // La caja donde se escribe el comentario

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment, updateComment } from "../../redux/actions";

const CommentForm = ({ info, closeFn }) => {

  const dispatch = useDispatch()
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (text) {
      let commentData = {
        body: text,
        type: "comments",
        userId: info.userId,
        commentId: 1,
        filmId: info.filmId,
        username: info.username,
        image: info.image,
      }
      console.log("COMMENTDATA", commentData)
      if (info.formType === "postear") {
        dispatch(addComment(commentData))
      } else {
        dispatch(updateComment({ ...commentData, id: info.id }))
        closeFn(false)
      }
      setText("")
    } else {
      alert("No puedes dejar el comentario vacio")
    }
  };
  console.log("texto", text)
  return (
    <form onSubmit={onSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <button>
        Enviar
      </button>
    </form>
  );
};

export default CommentForm;