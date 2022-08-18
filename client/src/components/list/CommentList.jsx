import styled from "styled-components";
import { useParams } from 'react-router-dom';

const Comments = styled.section`
margin: 2em;
width: 70%;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`

const Wrapper = styled.div`
  margin-top: 10px;
  display: flex;
  padding: 0.3em;
  border-bottom: 1px solid #e1e1e1;
  width: 70%;
  justify-content: space-between;
`;

const CommentList = ({ comments, post }) => {
  const { postId } = useParams();
  const copiedData = [post];

  const deleteEvent = (e) => {
    const commentDeleted = copiedData[0].comments.filter((v) => {
      return v.id !== parseInt(e.target.value)
    })
    const newData = Object.assign({}, ...copiedData, {comments: commentDeleted})
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    };
    fetch(`http://localhost:3001/post/${postId}`, options)
      .then(() => window.location.reload())
      .catch((error) => console.log("error", error));
  }

  return (
    <Comments>
      {comments.map((v) => {
        return (
          <Wrapper key={v.id}>
            <div>{v.content}</div>
            <button value={v.id} onClick={deleteEvent}>삭제</button>
          </Wrapper>
        );
      })}
    </Comments>
  );
};

export default CommentList;
