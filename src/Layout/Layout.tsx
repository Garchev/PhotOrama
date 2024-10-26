import { Container } from "@mui/material";

function Layout({ children }) {
  return (
    <Container className='p-0'>
      {children}
    </Container>
  );
}

export default Layout;