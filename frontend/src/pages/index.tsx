import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";

export default function Index() {
  return (
    <>
      <Link to="/login">Login</Link>
      <Footer />
    </>
  );
}
