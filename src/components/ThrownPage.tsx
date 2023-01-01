import { FC } from "react";
import { useRouteError } from "react-router-dom";
import { is } from "typia";

type Error = {
  status: number;
  statusText: string;
  internal: boolean;
  data: string;
};

export const ThrownPage: FC = () => {
  const err = useRouteError();
  return (
    <div className="px-5 py-5 space-y-3">
      {is<Error>(err) ? (
        <pre>
          <div>Status: {err.status}</div>
          <div>Status Text: {err.statusText}</div>
          <div>{err.data}</div>
        </pre>
      ) : (
        <pre>{JSON.stringify(err, null, 2)}</pre>
      )}
    </div>
  );
};
