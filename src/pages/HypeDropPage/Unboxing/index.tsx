import React from "react";
import { Box, Button, Card, Stack, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import { ArrowBackIosNew, HourglassEmpty } from "@mui/icons-material";
import CircularProgressWithLabel from "../../../components/CircularProgressWithLabel";
import InputNumber from "../../../components/InputNumber";
import DataHypedrop from "../../../mock_data/hypedrop";
import Waiting from "../../../assets/images/vQEkPRw.png";

export enum STEP {
  BEFORE_GENERATING = 0,
  GENERATING = 1,
  GENERATED = 2,
}

export type RangePrice = {
  start: number;
  end: number;
};

export type DataType = {
  name: string;
  price: number;
  "odd-win": number;
};

const HypeDropUnboxing = () => {
  const { replace } = useHistory();
  const [progress, setProgress] = React.useState<number>(0);
  const [isGenerating, setIsGenerating] = React.useState<STEP>(
    STEP.BEFORE_GENERATING
  );
  const [rangePrice, setRangePrice] = React.useState<RangePrice>({
    start: 0,
    end: 0,
  });
  const [percent, setPercent] = React.useState<number>(0);
  const [error, setError] = React.useState<string>("");
  const [nameOfCase, setNameOfCase] = React.useState<string>("");

  React.useEffect(() => {
    if (isGenerating === STEP.GENERATING) {
      let counter = 1;
      const timer = setInterval(() => {
        counter = Math.floor(Math.random() * 5);
        setProgress((prevProgress) =>
          prevProgress >= 100 ? 0 : prevProgress + counter
        );
      }, counter * 100);

      return () => {
        clearInterval(timer);
      };
    }
  }, [isGenerating]);

  React.useEffect(() => {
    if (progress >= 100 && isGenerating === STEP.GENERATING) {
      setIsGenerating(STEP.GENERATED);
      setProgress(0);
      return;
    }
  }, [isGenerating, progress]);

  const filterFromRange = (start: number, end: number) => {
    const newData = DataHypedrop.filter(
      (x) => x.price >= start && x.price <= end
    );
    if (!newData) {
      setError(
        "Please fill in the correct information of start price and end price"
      );
      return;
    }
    return newData;
  };

  const filterFromOdd = (data: DataType[]) => {
    const newData = data.filter((x) => 1 - x["odd-win"] >= percent / 100);
    if (!newData) {
      setError(
        "Please fill in the correct information of percent chance to win"
      );
      return;
    }
    return newData;
  };

  const randomCase = (data: DataType[]) => {
    const randomIndex = Math.floor(Math.random() * data.length);
    return data[randomIndex]?.name;
  };

  const handleCalculate = () => {
    if (!rangePrice.end || !rangePrice.start || !percent) {
      setError("Please fill in the correct information !! ");
      return;
    }
    setError("");
    setIsGenerating(STEP.GENERATING);
    const dataFiltered = filterFromRange(rangePrice.start, rangePrice.end);
    if (dataFiltered) {
      const dataWithChance = filterFromOdd(dataFiltered);
      if (dataWithChance) {
        const finalCase = randomCase(dataWithChance);
        setNameOfCase(finalCase);
      }
    }
  };

  return (
    <Box className="p-4 h-full">
      <Button
        onClick={() => replace("/home")}
        variant="contained"
        color="secondary"
        startIcon={<ArrowBackIosNew />}
      >
        Back
      </Button>
      <Stack
        direction="row"
        flexWrap="wrap"
        className="rounded-[16px] items-center justify-center mt-3"
        sx={{ height: "calc(100vh - 220px)" }}
      >
        <Card className="w-[45%] min-w-[400px] p-6 h-full m-2">
          <Box>
            <Typography variant="h4" className="text-center !font-bold">
              Setting
            </Typography>
          </Box>
          <Box className="flex flex-col gap-3 mt-4">
            <Typography className="!font-bold">
              Enter the range of case's price
            </Typography>
            <Box className="flex items-center gap-3">
              <Typography className=" w-[90px]">Start price:</Typography>
              <InputNumber
                min={0}
                value={rangePrice.start}
                onChange={(v) =>
                  setRangePrice((prev) => ({ ...prev, start: v }))
                }
                disabled={isGenerating !== STEP.BEFORE_GENERATING}
              />
              <Typography>(Currency)</Typography>
            </Box>
            <Box className="flex items-center gap-3">
              <Typography className="w-[90px]">End price:</Typography>
              <InputNumber
                min={0}
                value={rangePrice.end}
                onChange={(v) => setRangePrice((prev) => ({ ...prev, end: v }))}
                disabled={isGenerating !== STEP.BEFORE_GENERATING}
              />
              <Typography>(Currency)</Typography>
            </Box>
            <Typography className="!font-bold">
              Enter % chance to get profit with cases
            </Typography>
            <Box className="flex items-center gap-3">
              <Typography className="w-[90px]">Percent win:</Typography>
              <InputNumber
                min={0}
                max={100}
                value={percent}
                disabled={isGenerating !== STEP.BEFORE_GENERATING}
                onChange={(v) => {
                  if (v > 100) {
                    setPercent(100);
                  } else {
                    setPercent(v);
                  }
                }}
              />
              <Typography>%</Typography>
            </Box>
            <Box>
              <Typography className="text-red-700 !font-bold">
                {error}
              </Typography>
            </Box>
            <Button
              className="w-[300px] !m-auto !font-bold"
              onClick={() => {
                handleCalculate();
              }}
              variant="contained"
              color="secondary"
              startIcon={<HourglassEmpty />}
              disabled={isGenerating !== STEP.BEFORE_GENERATING}
            >
              Generate
            </Button>
          </Box>
        </Card>
        <Card className="w-[45%] min-w-[400px] p-6 h-full m-2">
          <Box>
            <Typography variant="h4" className="text-center !font-bold">
              Result
            </Typography>
          </Box>
          <Box className="flex flex-col justify-center items-center mt-4">
            {isGenerating === STEP.GENERATING && (
              <CircularProgressWithLabel
                variant="determinate"
                color="secondary"
                value={progress}
                size={200}
              />
            )}
            {isGenerating === STEP.GENERATED && (
              <Box className="flex flex-col justify-center items-center">
                <Typography
                  variant="h5"
                  className="text-center !font-semibold text-rose-500"
                >
                  {nameOfCase
                    ? nameOfCase
                    : "Nothing fit with this information"}
                </Typography>
                <Box
                  className="w-[200px] h-[200px]"
                  sx={{
                    backgroundImage: `url(${Waiting})`,
                    backgroundPosition: "0 100%",
                    backgroundSize: "150%",
                  }}
                />
                <Button
                  className="!mt-7 w-[300px] !m-auto !font-bold"
                  variant="contained"
                  color="secondary"
                  onClick={() => setIsGenerating(STEP.BEFORE_GENERATING)}
                >
                  Clear
                </Button>
              </Box>
            )}
          </Box>
        </Card>
      </Stack>
    </Box>
  );
};

export default HypeDropUnboxing;
