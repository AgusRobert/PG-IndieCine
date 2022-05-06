import { useState} from "react";
import { postComment } from "../../redux/actions/index";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";


const CommentForm = ({
  initialText = "",
  id,
}) => {
  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;
  const dispatch = useDispatch();
  const {user} = useAuth0()


  
  function handleSubmit(e) {
    e.preventDefault()
    let paquete = {
      body: text,
    	type: "comment",
	    userEmail: user.email,
	    filmId: id,
      status:"ok",
      numberReport:0,
      CommentId: null,
    }
    dispatch(postComment(paquete))
    setText(initialText);
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button disabled={isTextareaDisabled} type="submit">
        Enviar
      </button>
    </form>
  );
};

export default CommentForm;