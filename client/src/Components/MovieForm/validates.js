export const validate = (input) => {
  const especiales = ["year"];
  let errs = {block: false};
  // for(const p in input){
  //   console.log("TIPO: ",typeof(input[p])," | valor: ",input[p]);
  //   console.log("TIPO: ",typeof(input[p])," | valor: ",input[p]);
  //   if(especiales.includes(p)){
  //     switch(p){
  //       case "year":
  //         if(input[p] > (new Date()).getFullYear()){
  //           errs.block = true;
  //           errs.year = "La fecha no puede ser a futuro";
  //         }break;
  //     }
  //   }
  //   if(typeof(input[p]) === "string"){
  //     if(input[p] === ""){
  //       errs[p] = `${p} no puede estar vacio`;
  //       errs.block = true;
  //     };
  //   }
  //   if(Array.isArray(input[p]))
  //     if(input.length < 1){
  //       errs.block = true;
  //       errs[p] = `${p} debe completarse`;
  //     }
  // }
  return errs;
};