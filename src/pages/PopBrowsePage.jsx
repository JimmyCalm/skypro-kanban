import { useParams } from "react-router-dom";
import PopBrowse from "../components/Popups/PopBrowse";

export default function PopBrowsePage() {
  const { id } = useParams();
  return <PopBrowse cardId={id} />;
}
