import styled from "styled-components";

const Footer = styled.footer`
  color: rgb(255, 255, 255);
  text-align: center;
  margin-top: 2rem;
  width: 100%;
  bottom: 0;
`;

export default function SiteFooter() {
  return (
    <Footer>
      <p>© 2023 Showthemovie. All rights reserved.</p>
      <p>
        <span>About Us</span> | <span>Terms of Service</span> |{" "}
        <span>Privacy Policy</span>
      </p>
    </Footer>
  );
}
