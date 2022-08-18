import styled from 'styled-components';
import { Routes, Route, useNavigate } from 'react-router-dom';
import useFetch from "./components/util/useFetch.js";
import { Suspense, lazy } from 'react';

const MainPage = lazy(()=> import("./components/page/MainPage"));
const PostViewPage = lazy(()=> import("./components/page/PostViewPage"));
const PostWritePage = lazy(()=> import("./components/page/PostWritePage"));
const Loading = lazy(() => import("./components/page/Loading"))

// const Nav = styled.nav`
//   padding: 0;
//   margin: 0;
//   box-sizing: border-box;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   list-style: none;
//   flex-wrap: wrap;
// `

const Title = styled.div`
  font-family: sans-serif;
  font-style: italic;
  text-align: center;
  padding: 40px 0px;
  font-size: 4rem;
  font-weight: 100;
  cursor: pointer;
  color: #243D25;
`

const Footer = styled.footer`
  text-align: right;
  margin-top: 50px;
  padding: 10px 10px 30px 0;
  border-top: 1px solid #e1e1e1;
`

function App() {
  const {data, isPending, error} = useFetch('http://localhost:3001/post');
  const navigate = useNavigate();

  const onClickEvent = () => {
    navigate('/');
    window.location.reload();
  }

  return (
    <div className="App">
      <header>
        <Title onClick={onClickEvent}>Mini blog</Title>
      </header>
      <Suspense fallback={ <Loading /> && error } >
        {
          isPending ? <Loading /> :
        (
      <Routes>
        <Route path='/write' element={<PostWritePage />} />
        <Route path="/" element={<MainPage {...{data, isPending, error}}/>} />
        <Route path='/post/:postId' element={<PostViewPage {...{data, isPending, error}}/>} />      
      </Routes>)
      }
    </Suspense>
      <Footer>나의 미니 블로그</Footer>
    </div>
  );
}

export default App;
