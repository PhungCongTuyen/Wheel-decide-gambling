import React from "react";
import { Avatar, Box, Button } from "@mui/material";
import { AllInclusive } from "@mui/icons-material";
import { randomColor } from "../../utils";
import { ACTION_TYPE, useProfile, useProfileDispatch } from "../../context";
import useAuth from "../../hooks/useAuth";
import CustomizeModal, { MODAL_TYPE } from "../../components/Modal";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const profileContext = useProfile();

  const dispatch = useProfileDispatch();

  const { token, setToken } = useAuth();

  const color = randomColor();

  const handleSignin = () => {
    //call api sign in
    //response
    const resToken = "ádasdasdhbasdbasdbakjbdkj";
    const profile = {
      username: "Tuyền",
      stats: {
        win: 1,
        lose: 2,
      },
    };
    setIsLoading(true);
    dispatch({ type: ACTION_TYPE.INIT, payload: profile });
    setToken({ token: resToken });
    setIsOpen(false);
  };

  return (
    <Box className="h-20 shadow-lg flex justify-between items-center px-10 bg-white">
      <Box
        component="div"
        className="text-3xl font-bold flex justify-between items-center"
      >
        <Box component="div">
          <AllInclusive sx={{ fontSize: "40px" }} htmlColor="purple" />
        </Box>
      </Box>
      {token ? (
        <Box component="div" className="flex justify-between items-center">
          <Box component="div" className="mr-2">
            Welcome
            <Box
              component="span"
              className="font-bold"
              sx={{ color: `#${color}` }}
            >
              {profileContext?.username &&
                ", " + profileContext?.username + "!"}
            </Box>
          </Box>
          <Avatar sx={{ backgroundColor: `#${color}` }} variant="rounded">
            {profileContext?.username?.charAt(0)}
          </Avatar>
        </Box>
      ) : (
        <Button
          onClick={() => {
            setIsOpen(true);
          }}
          variant="contained"
          color="secondary"
          type="button"
        >
          Sign In
        </Button>
      )}
      <CustomizeModal
        modalType={MODAL_TYPE.LOGIN}
        isOpen={isOpen}
        onOk={handleSignin}
        onClose={() => setIsOpen(false)}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default React.memo(Navbar, () => true);
