import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  session,
  children,
}: {
  session: any;
  children: React.ReactElement;
}) => {
  if (!session) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
