import { useAuth0 } from "@auth0/auth0-react";
import { FC, PropsWithChildren } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateOutlet: FC = ({ children }: PropsWithChildren<any>) => {
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return <div> </div>;
  }

  return isAuthenticated ? (
    <>
      {children}
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};
export default PrivateOutlet;
