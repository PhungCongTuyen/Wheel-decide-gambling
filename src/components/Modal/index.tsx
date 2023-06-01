import React from "react";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Modal,
  SxProps,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { AllInclusive, AssistWalker, DirectionsRun } from "@mui/icons-material";
import { Link } from "react-router-dom";

export type WebRoutes = {
  name: string;
  route: string;
};

export enum MODAL_TYPE {
  LOGIN = "LOGIN",
  WELCOME = "WELCOME",
  DIRECTION_WEB = "DIRECTION_WEB",
}

type Props = {
  modalType: MODAL_TYPE;
  onClose?: () => void;
  onOk?: () => void;
  isOpen: boolean;
  isLoading?: boolean;
  children?: React.ReactElement;
  listRoutes?: WebRoutes[];
  sx?: SxProps<Theme>;
  title?: string;
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

const DirectionModal: React.FC<Props> = (props) => {
  return (
    <Modal open={props.isOpen} onClose={props.onClose}>
      <Card
        className="absolute top-[50%] left-[50%] w-[400px] translate-x-[-50%] translate-y-[-50%] p-6 min-h-[200px] flex flex-col items-center justify-center gap-4"
        sx={props.sx}
      >
        <Box>
          <Typography className="!font-bold text-violet-500">
            {props?.title}
          </Typography>
        </Box>
        {props?.listRoutes?.map((item, index) => (
          <Link to={item.route} key={index} className="w-full">
            <Button className="!bg-violet-500 w-full text-center h-[40px] rounded-lg !text-white !font-bold leading-[40px]">
              {item.name}
            </Button>
          </Link>
        ))}
      </Card>
    </Modal>
  );
};

const CustomizeModal: React.FC<Props> = (props) => {
  switch (props.modalType) {
    case MODAL_TYPE.LOGIN:
      return <LoginModal {...props} />;
    case MODAL_TYPE.WELCOME:
      return <WelcomeModal {...props} />;
    case MODAL_TYPE.DIRECTION_WEB:
      return <DirectionModal {...props} />;
    default:
      return <Modal open={props.isOpen}>{props.children || <></>}</Modal>;
  }
};

export default CustomizeModal;
