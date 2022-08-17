import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

const PostWritePage = ({modifyTitle, modifyContent}) => {
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  // const [id, setId] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    if(modifyTitle !== undefined && modifyContent !== undefined ) {
      setTitle(modifyTitle)
      setStory(modifyContent)
    }
  }, [])

  const onSubmitInput = (event) => {
    event.preventDefault();
    const newPost = {
      'title': title,
      'content': story,
      'comments': []
    }
    const options = {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost)
    };
    fetch(`http://localhost:3001/post`, options)
    .then(res => res.json())
    // .then(res => {
    //   // setId(res.id)
    //   console.log(res)})
    // .then(result => navigate(`/`))
    .catch(error => console.log('error', error))
    navigate('/')
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
