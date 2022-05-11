import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import {  styled } from "@mui/system";
import {  deepPurple } from "@mui/material/colors";

const StyledLink = styled(Link)({
    marginRight: 150,
  justifyContent:'space-between',
  color:deepPurple[50],
  
  padding: 8,
  borderRadius: '6%'
});
const BoxStyle = styled(Box)({
    opacity:0.85 ,
    backgroundColor: "#311b92",
  
})
const navlinks = [
  { name: "Nosotros", href: "http://localhost:3000/about" },
  { name: "Contacto", href: "http://localhost:3000/contact" },
  { name: "TyC", href: "http://localhost:3000/terms" },
];

export default function Footer() {
  //los parametros son los que quiero que aparezcan en la card

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "50vh",
        alignContent: "space-between",
        width:"100%"
      }}
    >
      <BoxStyle
        component="footer"
        sx={{
          py: 1,
          px: 1,
          mt: "auto",
        }}

      >
        <Container maxWidth="sm">
         
            {navlinks.map((navl) => (
              <StyledLink
              sx={{
                ":hover": {
                  bgcolor: deepPurple[200],
                  color: "black",
                },
              }}
                key={navl.name}
                color="textPrimary"
                variant="button"
                underline="none"
                href={navl.href}
              >
                {navl.name}
              </StyledLink>
            ))}
         
        </Container>
      </BoxStyle>
    </Box>
  );
}
