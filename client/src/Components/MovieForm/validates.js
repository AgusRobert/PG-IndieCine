export const validate = (input) => {
  const RegExAlfa = /^[A-Za-z]+$/;
  const RegExNum = /^[0-9]*$/;
  const RegExInt = /^[-+]?[1-9]\d*$/;
  let errs = {block: false};
  for(const p in input){
    console.log("TIPO: ",typeof(input[p])," | valor: ",input[p]);
    if(typeof(input[p]) === "string"){
      if(input[p] === ""){
        errs[p] = `${p} no puede estar vacio`;
        errs.block = true;
      };
    }
    if(Array.isArray(input[p]))
      if(input.length < 1){
        errs.block = true;
        errs[p] = `${p} debe completarse`;
      }
  }
  return errs;
};

//   // title
//   if(!state.title){
//       errors.title = "El campo titulo es obligatorio";
//   } else if(!RegExAlfa.test(state.title)){
//       errors.title = "El campo titulo debe contener solo letras";
//   }

//   // poster
//   if(!state.poster){
//       errors.poster = "El campo poster es obligatorio";
//   }

//   // synopsis
//   if(!state.synopsis){
//       errors.synopsis = "El campo sinopsis es obligatorio";
//   }

//   // genre
//   if(!state.genres){
//       errors.genres = "El campo genero es obligatorio";
//   }

//   // country
//   if(!state.country){
//       errors.country = "El campo país es obligatorio";
//   }

//   // year
//   if(!state.year){
//       errors.year = "El campo año es obligatorio";
//   } 

//   // duration
//   if(!state.duration){
//       errors.duration = "El campo duración es obligatorio";
//   }

//   // director
//   if(!state.director){
//       errors.director = "El campo director es obligatorio";
//   }

//   // mainActors
//   if(!state.mainActors.length){
//       errors.mainActors = "Elenco debe tener al menos un actor";
//   }

//   // url
//   if(!state.url){
//       errors.url = "El campo url es obligatorio";
//   }

//   return errors;
// };