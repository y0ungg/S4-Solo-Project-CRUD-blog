import styled from "styled-components";

const Comments = styled.section`
margin: 2em;
`

const Wrapper = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  padding-bottom: 0.3em;
  border-bottom: 1px solid #e2e2e2d4;
`;

const CommentList = ({ comments }) => {

  const deleteEvent = (e) => {
    
  }

  return (
    <Comments>
      {comments.map((v) => {
        return (
          <Wrapper key={v.id}>
            <div>{v.content}</div>
            <button onClick={deleteEvent}>삭제</button>
          </Wrapper>
        );
      })}
    </Comments>
  );
};

export default CommentList;
