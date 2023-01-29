import mplogo from "../../assets/images/favicon.ico";

export const Footer: React.FC = () => {
  return (
    <footer className="footer p-10 bg-base-200 text-base-content">
      <div>
        <a className="btn btn-ghost normal-case text-xl">JobQuest</a>
      </div>
      <div>
        <span className="footer-title">Сделано в 2023г.</span>
        {/* <a className="link link-hover">Branding</a>
        <a className="link link-hover">Design</a>
        <a className="link link-hover">Marketing</a>
        <a className="link link-hover">Advertisement</a> */}
      </div>
      <div>
        <span className="footer-title">
          Спасибо за сервер, Московский Политех!
        </span>
        {/* <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a> */}
      </div>
      <div>
        <img src={mplogo} className="w-14 h-14 object-fill" />
        {/* <span className="footer-title">Legal</span>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a> */}
      </div>
    </footer>
  );
};
