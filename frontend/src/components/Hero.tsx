import { Link } from "react-router-dom";
import heroBlurredImage from "../../assets/images/oficebg-blur.jpg";
import jbLogoDark from "../../assets/images/logodark.svg";

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
          <h1 className="mb-10 text-5xl font-bold">
            <img src={jbLogoDark} alt="JobQuest" className="mx-auto" />
          </h1>
          <p className="mb-2">
            JobQuest позволяет соискателям быстро и без особых усилий найти
            идеальные возможности для карьерного роста.
          </p>
          <p className="mb-5">
            Сервис также позволяет работодателям беспрепятственно и удобно
            размещать вакансии всего за несколько минут.
          </p>
          <Link to="/vacancies" className="btn btn-secondary">
            Я соискатель
          </Link>
          <Link to="/registration" className="btn btn-primary ml-8">
            Я работодатель
          </Link>
        </div>
      </div>
    </div>
  );
};
