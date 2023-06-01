import React from "react";
import { Box, Button, Card, Typography } from "@mui/material";
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
  const { goBack } = useHistory();
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
        onClick={() => goBack()}
        variant="contained"
        color="secondary"
        startIcon={<ArrowBackIosNew />}
      >
        Back
      </Button>
      <Card className="max-w-[800px] mx-auto p-6 flex flex-col justify-center items-center gap-5 mt-3">
        <Box className="flex flex-col justify-center items-center gap-5">
          <Typography className="text-center !font-bold">
            Enter the range of total price
          </Typography>
          <Box className="flex">
            <Box>
              <Typography className="text-center !font-bold">Start</Typography>
              <InputNumber
                min={0}
                value={rangePrice.start}
                onChange={(v) =>
                  setRangePrice((prev) => ({ ...prev, start: v }))
                }
              />
            </Box>
            <Box>
              <Typography className="text-center !font-bold">End</Typography>
              <InputNumber
                min={0}
                value={rangePrice.end}
                onChange={(v) => setRangePrice((prev) => ({ ...prev, end: v }))}
              />
            </Box>
          </Box>
          <Box className="flex flex-col justify-center items-center">
            <Typography className="text-center !font-bold">
              Enter % chance to get profit with cases
            </Typography>
            <InputNumber
              min={0}
              max={100}
              value={percent}
              onChange={(v) => {
                if (v > 100) {
                  setPercent(100);
                } else {
                  setPercent(v);
                }
              }}
            />
          </Box>
          <Box>
            <Typography className="text-red-700 !font-bold">{error}</Typography>
          </Box>
          {isGenerating === STEP.BEFORE_GENERATING && (
            <Button
              onClick={() => {
                handleCalculate();
              }}
              variant="contained"
              color="secondary"
              startIcon={<HourglassEmpty />}
            >
              Start Generating
            </Button>
          )}
        </Box>
        <Box className="flex flex-col justify-center items-center">
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
              <Typography className="text-center !font-bold text-rose-500">
                {nameOfCase
                  ? `The case is: ${nameOfCase}`
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
                className="!mt-3"
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
    </Box>
  );
};

export default HypeDropUnboxing;
