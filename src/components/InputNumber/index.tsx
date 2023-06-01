import React from "react";
type Props = {
  max?: number;
  min?: number;
  onChange?: (x: number) => void;
  value?: number;
  disabled?: boolean;
};

const InputNumber: React.FC<Props> = (props) => {
  return (
    <input
      className="py-3 px-2 outline-none border-2 rounded-lg min-w-[200px]"
      type="number"
      pattern="[0-9]*"
      {...props}
      value={props?.value}
      onChange={
        props?.onChange
          ? (e) => props?.onChange?.(Number(e.target.value))
          : undefined
      }
    />
  );
};

export default InputNumber;
