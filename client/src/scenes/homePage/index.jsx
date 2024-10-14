import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import ProblemStatement from "scenes/ProblemStatement/ProblemStatement";
import { useNavigate } from "react-router-dom"; // Add this import

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  const navigate = useNavigate(); // Initialize the navigate function

  const handlePostClick = (postId) => {
    // Navigate to the project page
    navigate(`/project/${postId}`);
  };

  return (
    <Box>
      <Navbar />
      <Box width="100%" padding="2rem 6%">
        <Box mb="2rem">
          <ProblemStatement />
        </Box>
        <Box
          display="flex"
          flexDirection={isNonMobileScreens ? "row" : "column"}
          gap="0.5rem"
        >
          <Box flexBasis="42%">
            <UserWidget userId={_id} picturePath={picturePath} />
          </Box>
          <Box flexBasis="42%">
            <MyPostWidget
              picturePath={picturePath}
              onPostClick={handlePostClick} // Pass the click handler to MyPostWidget
            />
            <PostsWidget userId={_id} />
          </Box>
          {isNonMobileScreens && (
            <Box flexBasis="26%">
              <AdvertWidget />
              <Box m="2rem 0" />
              <FriendListWidget userId={_id} />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
