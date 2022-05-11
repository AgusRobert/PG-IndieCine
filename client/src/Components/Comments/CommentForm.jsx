// // La caja donde se escribe el comentario

// import { useState } from "react";

// const CommentForm = ({
//   handleSubmit,
//   submitLabel,
//   hasCancelButton = false,
//   handleCancel,
//   initialText = "",
// }) => {
//   const [text, setText] = useState(initialText);
//   const isTextareaDisabled = text.length === 0;

//   ({
//     body,
//     type,
//     status: "ok",
//     numberReport: 0,
//     UserId: userId,
//     CommentId: commentId,
//     FilmId: filmId,
//   });


//   const onSubmit = (event) => {
//     event.preventDefault();
//     handleSubmit(text);
//     setText("");
//   };


//   return (
//     <form onSubmit={onSubmit}>
//       <textarea
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//       />
//       <button disabled={isTextareaDisabled}>
//         {submitLabel}
//       </button>
//       {hasCancelButton && (
//         <button
//           type="button"
//           onClick={handleCancel}
//         >
//           Cancelar
//         </button>
//       )}
//     </form>
//   );
// };

// export default CommentForm;