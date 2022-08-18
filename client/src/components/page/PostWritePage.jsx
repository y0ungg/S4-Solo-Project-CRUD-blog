import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media only screen and (min-width: 768px) {
    .title--input,
    .content--input {
      width: 500px;
    }
  }
  @media only screen and (min-width: 1200px) {
    .title--input,
    .content--input {
      width: 700px;
    }
  }
`;

const TextContainer = styled.div`
  width: 100%;
  margin: 2em;
  display: flex;
  font-weight: 700;
`;

const Input = styled.input`
  width: 50vw;
  height: 30px;
  border: none;
  border-bottom: 1px solid green;
  margin: 0 2em;
  &:focus {
    outline: none;
  }
`;

const TextArea = styled.textarea`
width: 50vw;
height: 500px;
border: 1px solid green;
margin: 0 2em;
  &:focus {
    outline: none;
  }
`
const SubmitHolder = styled.div`
text-align: right;
`

const Submit = styled.input`
background-color: #f7d5e3a5;
border: none;
font-size: 1em;
padding: 0.5em;
border-radius: 10px;
font-style: italic;
&:hover {
  cursor: pointer;
}
`

const PostWritePage = ({ modifyTitle, modifyContent }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [id, setId] = useState(null);
  const navigate = useNavigate();
  const { postId } = useParams();

  useEffect(() => {
    if (modifyTitle !== undefined && modifyContent !== undefined) {
      setTitle(modifyTitle);
      setContent(modifyContent);
      setId(postId);
    }
  }, []);

  const onSubmitInput = (event) => {
    event.preventDefault();
    if (modifyTitle !== undefined && modifyContent !== undefined) {
      const modifyPost = {
        title: title,
        content: content,
      };
      const options = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(modifyPost),
      };
      fetch(`http://localhost:3001/post/${id}`, options)
        .then(() => navigate(`/post/${id}`))
        .catch((error) => console.log("error", error));
    } else {
      const newPost = {
        title: title,
        author: "멍멍",
        content: content,
        date: new Date().toLocaleDateString(),
        img: "",
        comments: [],
      };
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      };
      fetch(`http://localhost:3001/post`, options)
        .then((res) => res.text())
        .catch((error) => console.log("error", error));
        navigate("/");
    }
    window.location.reload();
  };

  return (
    <FormContainer>
      <form onSubmit={onSubmitInput}>
        <TextContainer>
          제목
          <Input
          required
            className="title--input"
            onChange={(event) => setTitle(event.target.value)}
            id="title"
            type="text"
            name="title"
            placeholder="제목을 입력해주세요"
            value={title}
          ></Input>
        </TextContainer>
        <TextContainer>
          본문
          <TextArea 
          required
            className="content--input"
            onChange={(event) => setContent(event.target.value)}
            name="content"
            type="text"
            placeholder="내용을 입력해주세요"
            value={content}
          ></TextArea>
        </TextContainer>
        <SubmitHolder>
          <Submit type="submit" value="Submit!"></Submit>
        </SubmitHolder>
      </form>
    </FormContainer>
  );
};

export default PostWritePage;
