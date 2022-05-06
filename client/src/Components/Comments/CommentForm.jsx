import { useState, useEffect } from "react";
import { postComment, getComments } from "../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";

const CommentForm = ({
  submitLabel,
  hasCancelButton = false,
  handleCancel,
  initialText = "",
  id,
  /* backendComments */
}) => {
  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;

  const dispatch = useDispatch();

  /* const {id} = useParams() */

  const {user} = useAuth0()

  /* console.log(user) */

  function handleSubmit(e) {
    e.preventDefault()
    let paquete = {
      body: text,
    	type: "comment",
	    userEmail: user.email,
	    filmId: id,
      commentId: null
    }
    dispatch(postComment(paquete))
    /* dispatch(getComments(id)) */
    setText("");
  }

  /* useEffect(() => {
    dispatch(getComments());
  }, [dispatch]); */

  /* const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text);
    setText("");
  }; */
  return (
    <form onSubmit={handleSubmit}>
      <textarea
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">
        Enviar
      </button>
      {/* {hasCancelButton && (
        <button
          type="button"
          onClick={handleCancel}
        >
          Cancelar
        </button>
      )} */}
    </form>
  );
};

export default CommentForm;