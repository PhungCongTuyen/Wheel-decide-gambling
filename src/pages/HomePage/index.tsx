import React from "react";
import { Box, ButtonBase, Stack, Typography, styled } from "@mui/material";
import HypedropImage from "../../assets/images/hypedrop.jpg";
import CsgoRollImage from "../../assets/images/csgoroll.png";
import GamdomImage from "../../assets/images/gamdom.jpg";
import { AirplanemodeActive, DoDisturb } from "@mui/icons-material";
import CustomizeModal, { MODAL_TYPE, WebRoutes } from "../../components/Modal";

enum STATUS_WEB {
  ACTIVE = "ACTIVE",
  INCOMING = "INCOMING",
}

enum SELECTED_WEB {
  HYPEDROP = "HYPEDROP",
  CSGOCASE = "CSGOCASE",
  GAMDOM = "GAMDOM",
}

const listWeb = [
  {
    imageUrl: HypedropImage,
    status: STATUS_WEB.ACTIVE,
    web: SELECTED_WEB.HYPEDROP,
  },
  {
    imageUrl: CsgoRollImage,
    status: STATUS_WEB.INCOMING,
    web: SELECTED_WEB.CSGOCASE,
  },
  {
    imageUrl: GamdomImage,
    status: STATUS_WEB.INCOMING,
    web: SELECTED_WEB.GAMDOM,
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  width: 300,
  height: 300,
  boxShadow: "0px 4px 20px #e0c0c0",
  opacity: 0.6,
  transitionDuration: "0.2s",
  alignItems: "start",
  justifyContent: "end",
  borderRadius: "40px",
  "&:hover": {
    opacity: 1,
    transitionDuration: "0.2s",
  },
  "& .MuiTypography-root": {
    opacity: 0,
  },
  [theme.breakpoints.down("sm")]: {
    width: "100% !important", // Overrides inline-style
    height: 100,
  },
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.15,
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
    "& .MuiTypography-root": {
      opacity: 1,
    },
  },
}));

const ImageSrc = styled("span")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center 40%",
});

const listRoute = {
  [SELECTED_WEB.HYPEDROP]: [
    {
      name: "Unboxing",
      route: "/hypedrop/unboxing",
    },
    {
      name: "Battle",
      route: "/hypedrop/battle",
    },
    {
      name: "Deal",
      route: "/hypedrop/deal",
    },
  ],
  [SELECTED_WEB.CSGOCASE]: [] as WebRoutes[],
  [SELECTED_WEB.GAMDOM]: [] as WebRoutes[],
};

const HomePage = () => {
  const [selectedWeb, setSelectedWeb] = React.useState<SELECTED_WEB>();
  return (
    <Box className="p-4 h-full">
      <Stack
        direction="row"
        spacing={2}
        flexWrap="wrap"
        className="rounded-[40px]"
      >
        {listWeb.map((item, index) => {
          return (
            <ImageButton
              key={index}
              onClick={() => {
                if (item.status === STATUS_WEB.INCOMING) return;
                setSelectedWeb(item.web);
              }}
            >
              <ImageSrc
                style={{ backgroundImage: `url(${item.imageUrl})` }}
                className="rounded-[40px]"
              />
              <Typography className="z-0 p-4">
                {item.status !== STATUS_WEB.ACTIVE && (
                  <DoDisturb className="text-red-600" fontSize="large" />
                )}
              </Typography>
            </ImageButton>
          );
        })}
      </Stack>
      <CustomizeModal
        isOpen={!!selectedWeb}
        modalType={MODAL_TYPE.DIRECTION_WEB}
        listRoutes={selectedWeb && listRoute[selectedWeb]}
        sx={{
          backgroundImage: `url(${
            listWeb.find((x) => x.web === selectedWeb)?.imageUrl
          })`,
          backgroundPosition: "center",
        }}
        onClose={() => setSelectedWeb(undefined)}
      />
    </Box>
  );
};

export default HomePage;
