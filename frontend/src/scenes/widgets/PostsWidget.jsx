import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  
  console.log(posts);
  console.log(typeof posts);

  // const getPosts = async () => {
  //   const response = await fetch("http://localhost:/posts", {
  //     method: "GET",
  //     headers: { Authorization: `Bearer ${token}` },
  //   });
  //   const data = await response.json();
  //   dispatch(setPosts({ posts: data }));
  // };


  const getPosts = async () => {
    try {
      const response = await fetch("http://localhost:7000/posts", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      dispatch(setPosts({ posts: data }));
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:7000/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const handleDelete = async (postId) => {
    const response = await fetch(`http://localhost:7000/posts/${postId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if (data.success) {
      dispatch(setPosts({ posts: data.posts }));
    }
  };



  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {Array.isArray(posts) && [...posts].reverse().map(
        ({
          _id,
          userId,
          name,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
          createdAt,
          report
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={name}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
            createdAt={createdAt}
            report={report}
            onDelete={handleDelete}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
