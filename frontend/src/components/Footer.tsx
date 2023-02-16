import { Link } from "react-router-dom";
import mplogo from "../../assets/images/favicon.ico";
import jbLogoLight from "../../assets/images/logolight.svg";

export const Footer: React.FC = () => {
  return (
    <footer className="footer p-10 bg-base-200 text-base-content">
      <div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          <img src={jbLogoLight} alt="JobQuest Logo" className="h-4" />
        </Link>
      </div>
      <div>
        <span className="footer-title">Сделано в 2023г.</span>
        {/* <a className="link link-hover">Branding</a>
        <a className="link link-hover">Design</a>
        <a className="link link-hover">Marketing</a>
        <a className="link link-hover">Advertisement</a> */}
      </div>
      <div>
        <span className="footer-title">поменять перед продом!!!</span>
        {/* <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a> */}
      </div>
      <div>
        {/* <img src={mplogo} className="w-14 h-14 object-fill" /> */}
        {/* <span className="footer-title">Legal</span>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a> */}
      </div>
    </footer>
  );
};
