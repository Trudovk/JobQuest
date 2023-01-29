export const Hero: React.FC = () => {
  return (
    <div
      className="hero min-h-[900px]"
      style={{
        backgroundImage: `url("../../assets/images/oficebg.jpg")`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">JobQuest</h1>
          <p className="mb-5">
            Найти работу мечты быстро и удобно вместе с JobQuest. Так же можете
            опубликовать вакансию прямо сейчас за 5 минут!
          </p>
          <button className="btn btn-secondary ">Вакансии</button>
          <button className="btn btn-primary ml-8">Зарегистрироваться</button>
        </div>
      </div>
    </div>
  );
};