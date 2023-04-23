import styled from "styled-components";

const Logo = styled.h3`
  font-size: 2em;
  color: white;
  font-family: Roboto;
`;
const Background = styled.div`
  background-color: #3b3b3b;
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;
  padding: 2rem;
`;

const Header = () => {
  return (
    <Background>
      <Logo className="ff-serif"> MagicCollector </Logo>
    </Background>
  );
};
// #3b3b3b
export default Header;
