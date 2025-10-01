import PopExit from "../components/Popups/PopExit";
import { useNavigate } from "react-router-dom";

export default function ExitPage() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  return <PopExit onClose={handleClose} />;
}