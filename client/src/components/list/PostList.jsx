import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 50%;
`;

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 30px;
  width: 400px;
  height: 270px;
  font-size: 12pt;
  box-shadow: 1px 1px 3px 1px #e9e9e9;
  border-radius: 20px;
  &:hover {
    cursor: pointer;
  }
`;

const Img = styled.img`
  width: 300px;
  height: 150px;
  object-fit: cover; //이미지 비율 그대로 설정한 width, height에 맞게 자른다.
  margin-bottom: 10px;
  border: 1px solid rgb(238, 238, 238);
  box-shadow: 1px 2px 10px 0.5px #efefefd2;
`;

const TitleDiv = styled.div`
  margin-top: 15px;
`

const PostList = (props) => {
  const { post, onClickItem } = props;

  return (
    <StyledDiv >
      {post.reverse().map((item) => {
        return (
          <Wrapper key={'div'+item.id} onClick={() => onClickItem(item)}>
            <Img
              key={'img'+item.id}
              src={
                item.img
                  ? item.img
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
              }
            ></Img>
            <TitleDiv key={item.id} post={item}>
              {item.title}
            </TitleDiv>
          </Wrapper>
        );
      })}
    </StyledDiv>
  );
};

export default PostList;
