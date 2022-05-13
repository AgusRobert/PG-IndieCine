import React from "react";
import Footer from "../Footer/Footer.jsx";
import { Link } from "react-router-dom";
import logo from "../Header/LOGO.png";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { AppBar, Divider, Paper } from "@mui/material";
import deco from '../About/deco.png'
import deco2 from '../About/deco2.png'
import { amber, grey } from "@mui/material/colors";

const AppStyle = styled(AppBar)({
  opacity: 0.85,
  backgroundColor: "#b388ff",
  position: "fixed",
  justifyContent: "space-between",
  alignItems: "center"
});

const defaultTheme = createTheme();

const theme = createTheme({
  palette: {
    text: {
      primary: "#FFFFFF"
    }
  }
});

const Texto = styled(Typography)({
 color:grey[300],
//  padding: "1rem",
marginBottom: "1rem",
    
  });
 
const Divisor = styled(Divider)({
  borderColor: amber[500]

});

const BoxStyle = styled(Box)({
  display: "table-row",
  paddingTop: 150,
  justifyContent: "space-between",
  alignItems: "center",
  alignContent: "center",
  padding: "1rem",
  marginBottom: "1rem",
});

const Titulo = styled(Typography)({
  color: "#e0e0e0",
  fontSize: "45px",
  fontFamily: "Koulen"
});

const ImgStyle = styled("img")({
  maxHeight: 200,
  width: "auto"
})

const ContainerS = styled(Paper)({
  maxHeight: 200,
  width: "auto",
  background: 'linear-gradient(50deg,  #424242 40%, #4a148c  90%)',
  paddingLeft: 30
})

const Fondo = styled(Box)({
  background: 'linear-gradient(90deg,  #6200ea 20%,#651fff 40%, #aa00ff 90%)',
  backgroundSize: "cover",

  position: "relative",
})

export default function TyC() {
  return (
    <>
      <AppStyle>
        <Link to={'/'}><img src={logo} alt="img not found" /></Link>
      </AppStyle>

      {/* <Fondo> */}
      <Box style={{ display: "flex", justifyContent: "space-between", paddingTop: 60 }}>

        <ImgStyle src={deco2} alt="deco" />
        <Box
            height={100}
            width={500}
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgcolor="#5e35b1"
            color="#e0e0e0"
            fontSize={24}
            position={"relative"}
            left={0}
            top={50}
            borderRadius={5}
           
          >
            <Titulo variant="bold">TERMINOS Y CONDICIONES</Titulo>
          </Box>
        <ImgStyle src={deco} alt="deco" />
      </Box>
 <BoxStyle style={{padding:40}}>      
 <ContainerS><h3>Condiciones Generales:</h3></ContainerS>

<Texto style={{padding:40,fontSize: '20px', textAlign:'justify'}}>Por favor lea cuidadosamente estas condiciones generales del servicio antes de acceder a la página Web. El acceso a la página Web por parte del usuario del Servicio implica su consentimiento expreso y sin reservas a estos Términos y Condiciones de Uso. Si usted no está de acuerdo con estos por favor no use la Pagina Web. CINDIE se reserva el derecho, a su sola discreción, de cambiar, modificar, adicionar o remover partes de estas Condiciones en cualquier tiempo y sin previo aviso.

          En caso de los niños menores de 12 (doce) años se entenderá que cuentan con el consentimiento de sus padres, representantes legales o tutores asignados, de utilizar esta página Web por lo que el acceso por parte de los menores será bajo estricta responsabilidad de las personas antes mencionadas renunciando a realizar cualquier acción en contra de CINDIE y/o las marcas pertenecientes a la misma anunciadas en esta página Web.

          De las responsabilidades Usted (El Usuario) se compromete a utilizar el Servicio de conformidad con la ley, estas Condiciones Generales, así como de acuerdo con la moral y las buenas costumbres y el orden público. De la misma manera el Usuario se obliga a abstenerse de utilizar el Servicio con fines o efectos ilícitos, contrarios a lo establecido en las Condiciones Generales, lesivos de los derechos e intereses de terceros o que de cualquier forma puedan dañar, inutilizar, sobrecargar o deteriorar el Servicio o impedir la normal utilización o disfrute del Servicio por parte de los Usuarios.</Texto>


 
<Texto style={{padding:40,fontSize: '20px' ,textAlign:'justify'}}>El Usuario se obliga a usar los contenidos de forma diligente, correcta y lícita y, en particular, se compromete a abstenerse de:</Texto>
 
<Texto style={{padding:40,fontSize: '20px',textAlign:'justify'}}>- Utilizar los contenidos de forma, con fines o efectos contrarios a la ley, a la moral y a las buenas costumbres o al orden público;</Texto>
<Divisor variant="inset"  />
<Texto style={{padding:40,fontSize: '20px',textAlign:'justify'}}>- Reproducir o copiar, distribuir, permitir el acceso del público a través de cualquier modalidad de comunicación pública, transformar o modificar los contenidos, a menos que se cuente con la autorización del titular de los correspondientes derechos o ello resulte legalmente permitido;</Texto>
<Divisor variant="inset"  />
<Texto style={{padding:40,fontSize: '20px',textAlign:'justify'}}>- Suprimir, eludir o manipular el "copyright" o derechos de autor y demás datos identificativos de los derechos de Vida de Película o de terceras personas incorporados a los Contenidos.</Texto>
<Divisor variant="inset"  />
<Texto style={{padding:40,fontSize: '20px',textAlign:'justify'}}>- Emplear los Contenidos y, en particular, la información de cualquier clase obtenida a través del Servicio para remitir publicidad, comunicaciones con fines de venta directa o con cualquier otra clase de finalidad comercial, mensajes no solicitados dirigidos a una pluralidad de personas con independencia de su finalidad, así como a abstenerse de comercializar o divulgar de cualquier modo dicha información.</Texto>
<Divisor   />
<Texto style={{padding:40,fontSize: '20px',textAlign:'justify'}}>El Usuario responderá de los daños y perjuicios de cualquier naturaleza que CINDIE o sus marcas puedan sufrir, directa o indirectamente, como consecuencia del incumplimiento de cualquiera de las obligaciones derivadas de los presentes avisos legales o de la ley en relación con la utilización del Servicio.</Texto>

<Texto style={{padding:40,fontSize: '20px',textAlign:'justify'}}>En ningún momento CINDIE se hará responsable por los daños y perjuicios que puedan surgir por la falla o falta de disponibilidad del servicio. Así como su continuidad y el funcionamiento del mismo y en particular a las fallas de acceso a las distintas páginas Web del servicio.</Texto>

<Texto style={{padding:40,fontSize: '20px',textAlign:'justify'}}>CINDIE, y sus colaboradores no serán responsables ante el Usuario por cualquier daño directo, indirecto, incidental, especial y/o punitoria que resultase por cualquiera de las fallas antes mencionadas y de las que se describen a continuación: </Texto>
 
<Texto style={{padding:40,fontSize: '20px',textAlign:'justify'}}>- Errores de software, virus, troyanos o similares que puedan ser transmitidos hacia o mediante nuestro sitio Web por cualquier tercero </Texto>
<Divisor variant="inset"  />
<Texto style={{padding:40,fontSize: '20px',textAlign:'justify'}}>- Error u omisión en cualquier contenido o por cualquier pérdida o daño de cualquier tipo incurrido como resultado del uso de cualquier contenido publicado en esta página Web </Texto>
<Divisor variant="inset"  />
<Texto style={{padding:40,fontSize: '20px',textAlign:'justify'}}>- Adicionalmente CINDIE no tendrá responsabilidad alguna por cualquier pérdida causada por virus que puedan infectar la computadora del Usuario u otra propiedad por razón de usar, ingresar o bajar cualquier material de la página Web, siempre será bajo el propio riesgo del Usuario</Texto>
<Divisor variant="inset"  />
<Texto style={{padding:40,fontSize: '20px',textAlign:'justify'}}>La limitación de responsabilidad antes mencionada se aplicará dentro de los límites máximos autorizados por la ley en la jurisdicción aplicable.</Texto>
<Divisor  />
<ContainerS><h3>De la Información:</h3></ContainerS>
 
<Texto style={{padding:40,fontSize: '20px',textAlign:'justify'}}>Cualquier información que sea introducida por el Usuario en los espacios disponibles al público en general, será propiedad de Vida de Película, por lo que éste podrá utilizarla, reproducirla, modificarla, adaptarla o ponerla a disposición del público, además de estar facultado para utilizar los comentarios, ideas, sugerencias o cualquier información que el Usuario introduzca a este sitio, sin que esto genere alguna compensación en el entendido que esta información se encuentre sujeta a las disposiciones legales en la materia aplicable.</Texto>
 
<Texto style={{padding:40,fontSize: '20px',textAlign:'justify'}}>CINDIE se reserva el derecho a evitar que se publiquen fotos, gráficos, material sonoro o de video que usted introduzca en los espacios disponibles al público en general, que éste sean ilegales, inmorales, o bien, que vayan en contra de sus políticas.</Texto>
 
<Texto style={{padding:40,fontSize: '20px',textAlign:'justify'}}>El Usuario declara expresamente y da su conformidad a lo siguiente.</Texto>
 
<Texto style={{padding:40,fontSize: '20px',textAlign:'justify'}}>- No se creará responsabilidad o garantía alguna por la obtención de información escrita ya sea consejo o de algún otro tipo obtenido desde esta página Web.</Texto>
<Divisor variant="inset"  />
<Texto style={{padding:40,fontSize: '20px',textAlign:'justify'}}>- CINDIE no será responsable por los contenidos en las comunicaciones que intercambien los usuarios del sitio de cualquier manera, ya que la página no es más que un medio que facilita la comunicación electrónica.</Texto>
<Divisor variant="inset"  />
<Texto style={{padding:40,fontSize: '20px',textAlign:'justify'}}>Esta página Web es presentada a los usuarios sobre la base de "como es" y "disponibilidad", por lo consiguiente CINDIE no da garantías de ningún tipo. Nos reservamos el derecho de restringir, suspender o terminar su ingreso a esta página Web o a cualquier parte de la misma en cualquier momento y sin notificar al Usuario.</Texto>
<Divisor  />
<ContainerS><h3>De los productos:</h3></ContainerS>

<Texto style={{padding:40,fontSize: '20px',textAlign:'justify'}}>Los productos físicos, materiales, promociones e información que aparezca en esta página Web están dirigidos a clientes de las marcas de CINDIE.</Texto>

<Texto style={{padding:40,fontSize: '20px',textAlign:'justify'}}>Los productos físicos que aparecen en esta página Web son sólo representaciones visuales y no están en tamaño real, color de embalaje, etc.</Texto>

<Texto style={{padding:40,fontSize: '20px',textAlign:'justify'}}>De la propiedad intelectual e Industrial.</Texto>

<Texto style={{padding:40,fontSize: '20px',textAlign:'justify'}}>Por el acceso a esta página Web el usuario se compromete a no reproducir ni utilizar ningún derecho de propiedad intelectual e industrial propiedad de CINDIE sin la autorización expresa de este.</Texto>
<Divisor  />
<Texto style={{padding:40,fontSize: '20px',textAlign:'justify'}}>El contenido de la página Web incluidos a título enunciativo y no limitativo el texto, software, scripts, gráficos, fotos, sonido, música, videos, características interactivas y similares, marcas comerciales, marcas de servicio, avisos comerciales, frases publicitarias, logos y demás relativos son propiedad de CINDIE y en algunos casos han sido utilizados para su uso no comercial tratándose de propiedad de terceros y están sujetos a las leyes aplicables en materia de propiedad industrial e intelectual.</Texto>

<Texto style={{padding:40,fontSize: '20px',textAlign:'justify'}}>CINDIE no concede licencia o autorización alguna de uso de ninguna clase sobre sus derechos de propiedad industrial e intelectual, o sobre cualquier otra propiedad o derecho relacionado con el uso de los contenidos.</Texto>
 
<Texto style={{padding:40,fontSize: '20px',textAlign:'justify'}}>El Usuario está autorizado a navegar por esta página Web, bajar información al disco duro o con el propósito de distribuir a otros individuos, siempre y cuando se mantenga intacta la información y todos los avisos de derecho de autor y de propiedad industrial e intelectual, que aparezcan en las reproducciones. Queda estrictamente prohibido utilizar, copiar, reproducir, transmitir, exhibir, vender o distribuir con fines de lucro comercial la información que se obtenga de esta página Web ni ser modificada o incorporada en algún otro trabajo o página Web sin el permiso expreso del titular de los derechos.</Texto>
 
<Texto style={{padding:40,fontSize: '20px',textAlign:'justify'}}>En caso de violación de los derechos de autor o propiedad intelectual</Texto>

<Texto style={{padding:40,fontSize: '20px',textAlign:'justify'}}>En el caso de que cualquier Usuario o un tercero consideren que cualquiera de los Contenidos ha sido introducido en la página Web con violación de sus derechos de propiedad intelectual con fines comerciales deberá enviar una notificación a CINDIE en la que se contengan los siguientes datos: </Texto>
 
<Texto style={{padding:40,fontSize: '20px',textAlign:'justify'}}>- Datos personales: nombre, dirección, número de teléfono y dirección de correo electrónico del reclamante.</Texto>
<Divisor variant="inset"  />
<Texto style={{padding:40,fontSize: '20px',textAlign:'justify'}}>- Firma auténtica o equivalente, con los datos personales del titular de los derechos de propiedad intelectual supuestamente infringidos o de la persona autorizada para actuar en nombre y por cuenta del titular de los derechos de propiedad intelectual supuestamente infringidos.</Texto>
<Divisor variant="inset"  />
<Texto style={{padding:40,fontSize: '20px',textAlign:'justify'}}>- Indicación precisa y completa de los Contenidos protegidos mediante los derechos de propiedad intelectual supuestamente infringidos, así como de su localización en la página Web.</Texto>
<Divisor variant="inset"  />
<Texto style={{padding:40,fontSize: '20px',textAlign:'justify'}}>- Declaración expresa y clara de que la utilización de los Contenidos indicados se ha realizado con fines comerciales y sin el consentimiento del titular de los derechos de propiedad intelectual para este fin.</Texto>
<Divisor variant="inset"  />
<Texto style={{padding:40, fontSize: '20px',textAlign:'justify'}}>- Declaración expresa, clara y bajo la responsabilidad del reclamante de que la información proporcionada en la notificación es exacta y de que la utilización de los Contenidos ha sido con fines comerciales y constituye una violación de sus derechos de propiedad intelectual.</Texto>
<Divisor />
</BoxStyle> 

      
      <Footer />
      {/* </Fondo>  */}
    </>
  )
}
