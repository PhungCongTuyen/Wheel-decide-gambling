import React from "react";
import { Box, Button } from "@mui/material";
import { ACTION_TYPE, useProfile, useProfileDispatch } from "../../context";

const HomePage = () => {
  const profileContext = useProfile();

  const dispatch = useProfileDispatch();

  return (
    <Box>
      <Button
        onClick={() => {
          !!profileContext &&
            dispatch({
              type: ACTION_TYPE.INCREASE_WIN,
            });
        }}
      >
        Coong
      </Button>
      {profileContext?.stats?.win}
    </Box>
  );
};

export default HomePage;
