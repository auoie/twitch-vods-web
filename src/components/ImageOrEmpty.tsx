import { FC, useState } from "react";

type Params = Omit<JSX.IntrinsicElements["img"], "onError">;
export const ImageOrEmpty: FC<Params> = ({ ...params }) => {
  const [bad, setBad] = useState(false);
  if (bad) {
    return <div {...params}></div>;
  }
  return (
    <img
      onError={() => {
        setBad(true);
      }}
      {...params}
    />
  );
};
