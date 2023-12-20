import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Security = (props: {
  children: React.ReactNode;
  isNonSecure?: boolean;
}) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (props.isNonSecure && token) {
      navigate("/dashboard");
    }
    if (props.isNonSecure) {
      return;
    } else if (!token) {
      navigate("/");
    }
  }, [token, navigate, props.isNonSecure]);

  if (token || props.isNonSecure) return <>{props.children}</>;
  return <></>;
};
export default Security;
