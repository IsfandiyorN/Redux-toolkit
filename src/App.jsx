import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from './features/posts/search/searchSlice';
import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './components/Home';
import NewPost from './components/NewPost';
import PostPage from './components/PostPage';
import About from './components/About';
import Missing from './components/Missing';
import { format } from 'date-fns';

function App() {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts);
  const search = useSelector(state => state.search);

  const handleSearchChange = (e) => {
    dispatch(setSearch(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody };
    // Dispatch action to add new post
    dispatch(addPost(newPost));
    setPostTitle('');
    setPostBody('');
    navigate('/');
  };

  const handleDelete = (id) => {
    // Dispatch action to delete post
    dispatch(deletePost(id));
    navigate('/');
  };

  return (
    <div className='App'>
      <Header title='React JS Blog' />
      <Nav search={search} setSearch={handleSearchChange} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/post'
          element={<NewPost handleSubmit={handleSubmit} />}
        />
        <Route
          path='/post/:id'
          element={<PostPage handleDelete={handleDelete} />}
        />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
