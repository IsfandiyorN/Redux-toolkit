import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./components/Home";
import NewPost from "./components/NewPost";
import PostPage from "./components/PostPage";
import About from "./components/About";
import Missing from "./components/Missing";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { format } from "date-fns";
import './App.css';
import { addPost, deletePost, setSearch, setPostTitle, setPostBody, setSearchResults } from "./features/posts/postsSlice";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const posts = useSelector(state => state.posts.posts);
  const search = useSelector(state => state.posts.search);
  const postTitle = useSelector(state => state.posts.postTitle);
  const postBody = useSelector(state => state.posts.postBody);
  const searchResults = useSelector(state => state.posts.searchResults);

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    dispatch(setSearchResults(filteredResults.reverse()));
  }, [posts, search, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody };
    dispatch(addPost(newPost));
    dispatch(setPostTitle(''));
    dispatch(setPostBody(''));
    navigate("/");
  };

  const handleDelete = (id) => {
    dispatch(deletePost(id));
    navigate("/");
  };

  return (
    <div className='App'>
      <Header title='React JS Blog' />
      <Nav search={search} setSearch={(value) => dispatch(setSearch(value))} />
      <Routes>
        <Route path='/' element={<Home posts={searchResults} />} />
        <Route
          path='/post'
          element={
            <NewPost
              handleSubmit={handleSubmit}
              postTitle={postTitle}
              setPostTitle={(value) => dispatch(setPostTitle(value))}
              postBody={postBody}
              setPostBody={(value) => dispatch(setPostBody(value))}
            />
          }
        />
        <Route
          path='/post/:id'
          element={<PostPage posts={posts} handleDelete={handleDelete} />}
        />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
