import React from "react";
import {
  ReportGmailerrorred,
  Accessibility,
  AccessibilityNew,
  Accessible,
  SentimentSatisfiedAlt,
  LocalAtm,
} from "@mui/icons-material";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  Popover,
  Typography,
} from "@mui/material";
import Image from "../assets/images/qrcodebit.png";
import Marquee from "react-fast-marquee";

type ListReadThis = {
  icon: React.ReactElement;
  text: string;
};

const listReadThis: ListReadThis[] = [
  {
    icon: <Accessibility className="text-purple-700" />,
    text: "I'm not 100% sure it will work",
  },
  {
    icon: <AccessibilityNew className="text-purple-700" />,
    text: "I just rely on the roll number to calculate",
  },
  {
    icon: <Accessible className="text-purple-700" />,
    text: "The website is created for free, so if there is any mistake, please give me your opinion to email pctuyen98tq@gmail.com",
  },
  {
    icon: <SentimentSatisfiedAlt className="text-purple-700" />,
    text: "Thank you for reading, enjoy it !!!",
  },
  {
    icon: <LocalAtm className="text-purple-700" />,
    text: "If you want to support my app, my wallet address is below",
  },
];

const MainLayout = ({ children }: { children: React.ReactElement }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  return (
    <Box className="relative" sx={{ height: "calc(100vh - 140px)" }}>
      {children}
      <Box className="!fixed flex items-center">
        <Marquee className="text-5xl uppercase font-bold overflow-hidden text-purple-200 pointer-events-none select-none">
          If this is the first time join it, please click read this &nbsp;
        </Marquee>
        <Button
          className="!ml-2 w-[150px] !mt-[6px] !mr-2"
          startIcon={<ReportGmailerrorred />}
          onClick={(e) => setAnchorEl(e.currentTarget)}
          variant="contained"
          color="secondary"
        >
          Read this
        </Button>
      </Box>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Box className="w-[500px] p-5 h-[600px]">
          <Typography className="!font-bold uppercase text-xl text-purple-700">
            THIS APPLICATION IS FOR REFERENCES ONLY AND TO GIVE YOU A CHOICE
          </Typography>
          <List component="div">
            {listReadThis.map((item, index) => {
              return (
                <ListItem key={index}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  {item.text}
                </ListItem>
              );
            })}
          </List>
          <img src={Image} alt="bitcoin-address" className="w-[200px] m-auto" />
        </Box>
      </Popover>
    </Box>
  );
};

export default MainLayout;
