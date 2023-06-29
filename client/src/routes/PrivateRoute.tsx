import { useAuth0 } from "@auth0/auth0-react";
import { FC, PropsWithChildren } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateOutlet: FC = ({ children }: PropsWithChildren<any>) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log(isAuthenticated);
  if (isLoading) {
    return <div> Loading ... </div>;
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
