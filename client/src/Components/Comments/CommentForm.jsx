import { useState, useEffect } from "react";
import { postComment, getComments } from "../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";

const CommentForm = ({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  handleCancel,
  initialText = "",
}) => {
  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;

  const dispatch = useDispatch();

  /* const [payload, setPayload] = useState({
    name: "",
  description: "",
  released:"",
    rating:"",
    platforms: [],
    genres:[],
  image: "" 
}); */

  function handleSubmit(e) {
    e.preventDefault()
    let paquete = {
      body: text,
    	type: "type",
	    userId: 2,
	    commentId: 5,
	    filmId: 1
    }
    console.log(paquete)
    dispatch(postComment(paquete))
    dispatch(getComments())
    setText("");
  }

  /* useEffect(() => {
    dispatch(getComments());
  }, []); */

  /* const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text);
    setText("");
  }; */
  return (
    <form onSubmit={handleSubmit}>
      <input
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