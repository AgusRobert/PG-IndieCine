import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { fontSize, fontWeight, styled } from "@mui/system";
import { deepPurple } from "@mui/material/colors";

const StyledLink = styled(Link)({
  marginRight: 150,
  justifyContent: "space-between",
  color: "#FFF",
  padding: 8,
  borderRadius: "6%",
  fontWeight: "bolder",
});
const BoxStyle = styled(Box)({
  opacity: 0.85,
  backgroundColor: "#1F271B",
});
const ConStyle = styled(Container)({
  display: "flex",
  justifyContent: "space-between",
  p: 1,
  m: 1,
  alignItems: "center",
});
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
        minHeight: "18vh",
        alignContent: "space-between",
        marginTop: 4
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
        <ConStyle maxWidth="sm">
          {navlinks.map(navl => (
            <StyledLink
              sx={{
                ":hover": {
                  bgcolor: "#FFF",
                  color: "black",
                },
              }}
              key={navl.name}
              color="#FFF"
              variant="button"
              underline="none"
              href={navl.href}
            >
              {navl.name}
            </StyledLink>
          ))}
        </ConStyle>
      </BoxStyle>
    </Box>
  );
}
