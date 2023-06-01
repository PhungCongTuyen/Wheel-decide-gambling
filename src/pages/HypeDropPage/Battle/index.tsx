import React from "react";
import { Box, Button, Card, MenuItem, Select, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import { DataType, RangePrice, STEP } from "../Unboxing";
import DataHypedrop from "../../../mock_data/hypedrop";
import { ArrowBackIosNew, HourglassEmpty } from "@mui/icons-material";
import InputNumber from "../../../components/InputNumber";
import CircularProgressWithLabel from "../../../components/CircularProgressWithLabel";
import Waiting from "../../../assets/images/vQEkPRw.png";

const HypeDropBattle = () => {
  const { goBack } = useHistory();
  const [progress, setProgress] = React.useState<number>(0);
  const [isGenerating, setIsGenerating] = React.useState<STEP>(
    STEP.BEFORE_GENERATING
  );
  const [rangePrice, setRangePrice] = React.useState<RangePrice>({
    start: 0,
    end: 0,
  });
  const [totalPrice, setTotalPrice] = React.useState<number>(0);
  const [error, setError] = React.useState<string>("");
  const [nameOfCase, setNameOfCase] = React.useState<string>("");
  const [type, setType] = React.useState<number>(0);
  const [mode, setMode] = React.useState<number>(0);
  const [numberOfBox, setNumberOfBox] = React.useState<number>(0);

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

  const randomCases = (data: DataType[]) => {
    const newArrayCases: DataType[] = [];
    for (let i = 0; i < numberOfBox; i++) {
      const randomIndex = Math.floor(Math.random() * data.length);
      newArrayCases.push(data[randomIndex]);
    }
    return newArrayCases;
  };

  const compactData = (data: DataType[]) => {
    // const casesArray = data.map((x) => x.name);
    // const arrayNames = Object.values(casesArray);
    // if (arrayNames) {
    //   let obj: { [key: string]: number } = {};
    //   for (const i in arrayNames) {
    //     if (i === )
    //   }
    // }
    // console.log(arrayNames);
  };

  const getMode = (mode: number) => {};

  const getType = (type: number) => {};

  const handleCalculate = () => {
    if (!rangePrice.end || !rangePrice.start || !totalPrice) {
      setError("Please fill in the correct information !! ");
      return;
    }
    if (rangePrice.start > rangePrice.end) {
      setError("Invalid range !! ");
      return;
    }
    setError("");
    setIsGenerating(STEP.GENERATING);
    const dataFiltered = filterFromRange(rangePrice.start, rangePrice.end);
    if (dataFiltered) {
      const dataRandommed = randomCases(dataFiltered);
      if (dataRandommed) {
        const cases = compactData(dataRandommed);
        const modeSelected = getMode(mode);
        const typeSelected = getType(type);
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
            Enter the range of case's price
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
          {/* <Box className="flex flex-col justify-center items-center">
            <Typography className="text-center !font-bold">
              Enter total price that you available to spend on this battle
            </Typography>
            <InputNumber
              min={0}
              max={100}
              value={totalPrice}
              onChange={(v) => {
                if (v > 100) {
                  setTotalPrice(100);
                } else {
                  setTotalPrice(v);
                }
              }}
            />
          </Box> */}
          <Box className="flex flex-col justify-center items-center">
            <Typography className="text-center !font-bold">
              Enter the number of boxes you want
            </Typography>
            <InputNumber
              min={0}
              max={100}
              value={numberOfBox}
              onChange={(v) => {
                if (v > 100) {
                  setNumberOfBox(100);
                } else {
                  setNumberOfBox(v);
                }
              }}
            />
          </Box>
          <Box className="flex flex-col justify-center items-center">
            <Typography className="text-center !font-bold">
              Choose the type of battle
            </Typography>
            <Select
              value={type}
              onChange={(e) => {
                setType(Number(e.target.value));
              }}
            >
              <MenuItem value={0}>Auto Generate</MenuItem>
              <MenuItem value={1}>1 vs 1</MenuItem>
              <MenuItem value={2}>1 vs 1 vs 1</MenuItem>
              <MenuItem value={3}>1 vs 1 vs 1 vs 1</MenuItem>
              <MenuItem value={4}>2 vs 2</MenuItem>
            </Select>
          </Box>
          <Box className="flex flex-col justify-center items-center">
            <Typography className="text-center !font-bold">
              Choose the mode of battle
            </Typography>
            <Select
              value={mode}
              onChange={(e) => {
                setMode(Number(e.target.value));
              }}
            >
              <MenuItem value={0}>Auto Generate</MenuItem>
              <MenuItem value={1}>Normal</MenuItem>
              <MenuItem value={2}>Crazy Mode</MenuItem>
            </Select>
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

export default HypeDropBattle;
