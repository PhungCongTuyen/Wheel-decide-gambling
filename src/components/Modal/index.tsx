import React from "react";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Modal,
  TextField,
} from "@mui/material";
import { AllInclusive, AssistWalker, DirectionsRun } from "@mui/icons-material";
export enum MODAL_TYPE {
  LOGIN = "LOGIN",
}
type Props = {
  modalType: MODAL_TYPE;
  onClose?: () => void;
  onOk?: () => void;
  isOpen: boolean;
  isLoading?: boolean;
};

const LoginModal: React.FC<Props> = (props) => {
  return (
    <Modal open={props.isOpen}>
      <Card className="absolute top-[50%] left-[50%] w-[400px] translate-x-[-50%] translate-y-[-50%] px-6 pt-6 pb-10">
        <Box component="div" className="text-center">
          <AllInclusive sx={{ fontSize: "120px" }} htmlColor="purple" />
        </Box>
        {props?.isLoading ? (
          <Box className="flex flex-col items-center justify-center py-10 text-center">
            <CircularProgress color="secondary" />
            <Box className="mt-4">I'm checking, please take a sip!</Box>
          </Box>
        ) : (
          <Box
            component="form"
            className="flex flex-col justify-center gap-3"
            onSubmit={props.onOk}
          >
            <TextField name="username" size="small" label="Username" />
            <TextField
              name="password"
              type="password"
              size="small"
              label="Password"
            />
            <Box className="mx-auto gap-3 mt-2 flex">
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                startIcon={<DirectionsRun />}
              >
                Log in
              </Button>
              <Button
                type="button"
                variant="outlined"
                color="secondary"
                startIcon={<AssistWalker />}
                onClick={props.onClose}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        )}
      </Card>
    </Modal>
  );
};

const WelcomeModal: React.FC<Props> = (props) => {
  return <></>;
};

const CustomizeModal: React.FC<Props> = (props) => {
  switch (props.modalType) {
    case MODAL_TYPE.LOGIN:
      return <LoginModal {...props} />;
    default:
      return <WelcomeModal {...props} />;
  }
};

export default CustomizeModal;
