//글, 댓글, 댓글작성기능
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import CommentList from "../list/CommentList";
import { useState } from "react";
import '../../index.css'
import PostWritePage from "./PostWritePage";

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid red;
  padding-top: 20px;
`;

const TextInput = styled.input`
  width: 50%;
  height: 3rem;
  margin: 10px;
`;

const PostViewPage = (props) => {
  const navigate = useNavigate();
  const { data, isPending, error } = props;
  const { postId } = useParams();
  const [value, setValue] = useState("");
  const [isModifyMode, setIsModifyMode] = useState(false)

  //클릭한 글
  const selectedPost = data.find((item) => item.id === parseInt(postId));

  //클릭한 글의 댓글 (배열)
  const selectedComments = data.find(
    (el) => el.id === parseInt(postId)
  ).comments;

  //id 자동 생성이 안돼서 만든 함수
  const [maxNum, setMaxNum] = useState(Math.max(...selectedComments.map(v => {return v.id})) + 1)

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const options = {
      method: "PATCH",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ comments: [...selectedComments, { content: value, id: maxNum} ] })
    };
    fetch(`http://localhost:3001/post/${postId}`, options)
    .then(res => res.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error))
    window.location.reload();
    setMaxNum(Math.max(...selectedComments.map(v => {return v.id})) + 1);
  };

  const deleteEvent = (e) => {
    fetch(`http://localhost:3001/post/${postId}`, {
      method: "DELETE",
    })
    .then((json) => json.text())
    .then(result => console.log(result))
    .catch(err => console.log(err))
    navigate('/')
    window.location.reload();
  }

  const updateEvent = (e) => {
    setIsModifyMode(true)
  }

  return (
    <>
      {isPending ? (
        <>loading</>
      ) : isModifyMode ? (<PostWritePage modifyTitle={selectedPost.title} modifyContent={selectedPost.content}/>) :(
        <>
          <h1 className="post--title">{selectedPost.title}</h1>
          <div className="post--content">{selectedPost.content}</div>
          <CommentList comments={selectedComments} />
          <Form onSubmit={onSubmitHandler}>
            <TextInput
              onChange={(e) => setValue(e.target.value)}
              value={value}
              type="text"
              ></TextInput>
            <button>등록</button>
          </Form>
          <button className="delete-btn" onClick={deleteEvent}>글 삭제하기</button>
          <button className="update-btn" onClick={updateEvent}>글 수정하기</button>
        </>
      )}
    </>
  );
};

export default PostViewPage;
