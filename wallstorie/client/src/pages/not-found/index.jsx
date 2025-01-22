import Homebutton from "@/components/common/home";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/storie/home");
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-5xl p-5">404 Page Not Found</h1>
      <p className="p-3">Redirect to the home page</p>
      <Homebutton />
    </div>
  );
}
