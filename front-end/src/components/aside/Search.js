import SearchIcon from "@material-ui/icons/Search";
import styled from "styled-components";

const Container = styled.div`
  background-color: rgb(3, 20, 31);
  display: flex;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5);
  color: whitesmoke;
  border-bottom: 1px solid #d8d8d8;
`;
const Input = styled.input`
  border: none;
  outline: none;
  color: whitesmoke;
  flex: 1;
  background-color: rgb(3, 20, 31); ;
`;
const SearchIco = styled(SearchIcon)``;

const Search = () => {
  return (
    <Container className="py-2 container-fluid">
      <Input placeholder="search chat..." type="text" />
      <SearchIco />
    </Container>
  );
};

export default Search;
