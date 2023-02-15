import { Link } from "react-router-dom";
import heroImage from "../../assets/images/oficebg.jpg";
import heroBlurredImage from "../../assets/images/oficebg-blur.jpg";

export const Hero: React.FC = () => {
  return (
    <div
      className="hero min-h-[900px]"
      style={{
        // backgroundImage: `url("${heroImage}")`,
        backgroundImage: `url("${heroBlurredImage}")`,
      }}
    >
      <div className="hero-overlay bg-black bg-opacity-60 backdrop-blur-md"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">JobQuest</h1>
          <p className="mb-5">
            Найти работу мечты быстро и удобно вместе с JobQuest. Так же можете
            опубликовать вакансию прямо сейчас за 5 минут!
          </p>
          <Link to="/vacancies" className="btn btn-secondary">
            Вакансии
          </Link>
          <Link to="/registration" className="btn btn-primary ml-8">
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </div>
  );
};
