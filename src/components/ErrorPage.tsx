import { FC } from "react";
import { useLoaderData } from "react-router-dom";

export const ErrorPage: FC = () => {
  const path = useLoaderData() as string;
  return (
    <div className="py-2 space-y-1 overflow-hidden">
      <div className="px-2">
        Path <code>`/{path}`</code> not found.
      </div>
    </div>
  );
};
