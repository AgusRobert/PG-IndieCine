import { useState, useEffect } from "react";
import { postComment, getComments } from "../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";

const CommentForm = ({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  handleCancel,
  initialText = "",
  id
}) => {
  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;

  const dispatch = useDispatch();

  /* const {id} = useParams() */

  const {user} = useAuth0()

  

  function handleSubmit(e) {
    e.preventDefault()
    let paquete = {
      body: text,
    	type: "comment",
	    userEmail: user.email,
	    filmId: id,
      CommentId: null
    }
    dispatch(postComment(paquete))
    setText(initialText);
  }

   useEffect(() => {
    dispatch(getComments());
  }, []); 

  return (
    <form onSubmit={(e)=>handleSubmit(e)}>
      <textarea 
     
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button  disabled={isTextareaDisabled} type="submit">
        Enviar
      </button>
    </form>
  );
};

export default CommentForm;