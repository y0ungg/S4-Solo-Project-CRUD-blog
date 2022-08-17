import { useNavigate } from "react-router-dom";
import PostList from "../list/PostList";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const DivBtn = styled.div`
  text-align: center;
  background-color: white;
  box-shadow: 1px 1px 3px 1px #c4c4c4;
  border-radius: 10px;
  width: 250px;
  height: 3rem;
  padding: 0;
  margin: 40px 0 60px 0;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
  }
`;

const MainPage = (props) => {
  const navigate = useNavigate();
  const {data, isPending, error} = props;
  
  const onClickItem = (item) => {
    const idx = data.findIndex((el) => el.title === item.title);
    navigate(`/post/${data[idx].id}`)
  }

  return (
    <Main>
      <DivBtn role="button"  onClick={() => navigate(`/write`)}>
        <FontAwesomeIcon icon={faPen} />
      </DivBtn>
      <PostList post={data} onClickItem={onClickItem}></PostList>
    </Main>
  );
};

export default MainPage;