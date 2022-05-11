// // La caja donde se escribe el comentario

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment, updateComment } from "../../redux/actions";

const CommentForm = ({info, closeFn}) => {

  console.log("INFOOOO", info)
  const dispatch = useDispatch()
  const [text, setText] = useState("");
  
  const onSubmit = (e) => {
    e.preventDefault();
    let commentData = {
      body: text,
      type: "comments",
      userId: info.userId,
      commentId: 1,
      filmId: info.filmId,
    }
    if (info.formType === "postear") {
      dispatch(addComment(commentData))
    }else{
      dispatch(updateComment({...commentData, id: info.id}))
      closeFn(false)
    }
    setText("")
  };
  console.log("texto", text)
  return (
    <form onSubmit={onSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button>
        Enviar
      </button>
    </form>
  );
};

export default CommentForm;