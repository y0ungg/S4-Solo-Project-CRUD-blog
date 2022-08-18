import styled from "styled-components";

const Comments = styled.section`
margin: 2em;
width: 70%;
display: flex;
justify-content: center;
`

const Wrapper = styled.div`
  margin-top: 10px;
  display: flex;
  padding: 0.3em;
  border-bottom: 1px solid #e1e1e1;
  width: 70%;
  justify-content: space-between;
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
