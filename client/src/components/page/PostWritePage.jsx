import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";

const PostWritePage = ({modifyTitle, modifyContent}) => {
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [id, setId] = useState(null)
  const navigate = useNavigate();
  const { postId } = useParams()

  useEffect(() => {
    if(modifyTitle !== undefined && modifyContent !== undefined ) {
      setTitle(modifyTitle)
      setStory(modifyContent)
      setId(postId)
    }
  }, [])

  const onSubmitInput = (event) => {
    event.preventDefault();
    if(modifyTitle !== undefined && modifyContent !== undefined ) {
      const modifyPost = {
        'title': title,
        'content': story
      }
      const options = {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(modifyPost)
      }
      fetch(`http://localhost:3001/post/${id}`, options)
      .then(res => console.log(res.text()))
      .catch(error => console.log('error', error))
      navigate(`/post/${id}`)
    }
    else {
      const newPost = {
        'title': title,
        'author': '멍멍',
        'content': story,
        'date': new Date().toLocaleDateString(),
        'img': '',
        'comments': []
      }
      const options = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost)
      };
      fetch(`http://localhost:3001/post`, options)
      .then(res => console.log(res.text()))
      .catch(error => console.log('error', error))
      navigate('/')
    }
    window.location.reload()
  }

  return (
    <>
      <form onSubmit={onSubmitInput}>
        <div>
          글제목
          <input
            onChange={event => setTitle(event.target.value)}
            id="title"
            type="text"
            name="title"
            placeholder="제목을 입력해주세요"
            value={title}
          ></input>
        </div>
        <textarea
          onChange={event => setStory(event.target.value)}
          name="story"
          type="text"
          placeholder="내용을 입력해주세요"
          value={story}
        ></textarea>
        <section>
          <input type="submit" value="작성완료"></input>
        </section>
      </form>
    </>
  );
};

export default PostWritePage;
