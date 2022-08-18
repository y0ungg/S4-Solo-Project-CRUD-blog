import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import CommentList from "../list/CommentList";
import { useState } from "react";
import "../../index.css";
import PostWritePage from "./PostWritePage";

const Section = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
  width: 70%;
`;

const TextInput = styled.input`
  width: 50%;
  height: 3rem;
  margin: 10px;
  border: 1px solid #46777c;
  border-radius: 10px;
  &:focus {
    outline: none;
  }
`;

const PostViewPage = ({ data }) => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [value, setValue] = useState("");
  const [isModifyMode, setIsModifyMode] = useState(false);

  const selectedPost = data.find((item) => item.id === parseInt(postId));

  const selectedComments = data.find(
    (el) => el.id === parseInt(postId)
  ).comments;

  const [maxNum, setMaxNum] = useState(
    Math.max(
      ...selectedComments.map((v) => {
        return v.id;
      })
    ) + 1
  );

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const options = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        comments: [...selectedComments, { content: value, id: maxNum }],
      }),
    };
    fetch(`http://localhost:3001/post/${postId}`, options)
      .then((res) => res.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    window.location.reload();
    setMaxNum(
      Math.max(
        ...selectedComments.map((v) => {
          return v.id;
        })
      ) + 1
    );
  };

  const deleteEvent = (e) => {
    fetch(`http://localhost:3001/post/${postId}`, {
      method: "DELETE",
    })
      .then((json) => json.text())
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
    navigate("/");
    window.location.reload();
  };

  const updateEvent = (e) => {
    setIsModifyMode(true);
  };

  return (
    <>
      {isModifyMode ? (
        <PostWritePage
          modifyTitle={selectedPost.title}
          modifyContent={selectedPost.content}
        />
      ) : (
        <Section>
          <div className="post--wrapper">
            <div className="info--btn--container">
              <span className="author">{selectedPost.author}</span>
              <span className="date">{selectedPost.date}</span>
              <button className="update-btn" onClick={updateEvent}>
                수정
              </button>
              <button className="delete-btn" onClick={deleteEvent}>
                삭제
              </button>
            </div>
            <div className="post--title">{selectedPost.title}</div>
            <div className="post--content">{selectedPost.content}</div>
          </div>
          <CommentList comments={selectedComments} post={selectedPost}/>
          <Form onSubmit={onSubmitHandler}>
            <TextInput
              onChange={(e) => setValue(e.target.value)}
              value={value}
              type="text"
            ></TextInput>
            <button>등록</button>
          </Form>
        </Section>
      )}
    </>
  );
};

export default PostViewPage;
