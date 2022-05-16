// // La caja donde se escribe el comentario

import { Box, Button, InputBase, Toolbar } from "@mui/material";
import { amber } from "@mui/material/colors";
import { styled } from "@mui/system";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { addComment, updateComment } from "../../redux/actions";
const ButtonStyle = styled(Button)({
  whiteSpace: "nowrap",
  color: amber[400],
  borderBlockColor: amber[900],
  borderInlineStartColor: amber[200],
  borderInlineEndColor: amber[200],
});
const TextStyle = styled(InputBase)({
  backgroundColor: amber[50],
  borderRadius: 5,
  width: "400px",
  padding: 4,
  height:"50px"
});
const BoxGeneral = styled(Box)({
  padding: "10px",
  display:"flex",
  alignContent:"center",
});

const ButtonBox = styled(Box)({
  backgroundColor: "#f4b942",
  padding: "10px",
  display:"flex",
  alignContent:"center",
  borderRadius: 5,
  marginLeft: 3,
  ":hover":{
    backgroundColor: "#93a8ac"
  }
});

const CommentForm = ({ info, closeFn }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const onSubmit = e => {
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
      };
      console.log("COMMENTDATA", commentData);
      if (info.formType === "postear") {
        dispatch(addComment(commentData));
      } else {
        dispatch(updateComment({ ...commentData, id: info.id }));
        closeFn(false);
      }
      setText("");
    } else {
      Swal.fire({
        title: "Tenes que comentar un mensaje con al menos un carácter! 🙄​",
        width: 600,
        timer: 4000,
        timerProgressBar: true,
        padding: '1em',
        icon: "warning",
        color: '#716add',
        background: 'black',
        backdrop: `
          rgba(0,0,123,0.2)0  `,
        confirmButtonText: 'Entiendo',
      })
    }
  };
  /* console.log("texto", text) */
  return (
    <form onSubmit={onSubmit}>
      <BoxGeneral>
      <TextStyle
        value={text}
        onChange={(e) => setText(e.target.value)}
        // required
      />
      <ButtonBox>
        <ButtonStyle size="large" type="submit" >
          Enviar
        </ButtonStyle>
      </ButtonBox>
    </BoxGeneral>
    </form>
  );
};

export default CommentForm;
