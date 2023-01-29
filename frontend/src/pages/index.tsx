import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { TextImage } from "../components/TextImage";

export default function Index() {
  return (
    <>
      <Header />
      <Hero />
      <div className="max-w-6xl mx-auto py-16">
        <TextImage
          title="Работодатель"
          text="Работодатель может быстро создать свою вакансию, нужно только зарегистрировать аккаунт. Пять минут времени регистрацию и вашу вакансию могут увидить много соискателей!"
          image="../../assets/images/clock.png"
          position="left"
        />
        <TextImage
          title="Соискатель"
          text="Соискатель может быстро найти вакансию по его специальности! Не нужно регестрироваться, ищите работу мечты среди множества вакансий!"
          image="../../assets/images/searching.png"
          position="right"
        />
      </div>
      <Footer />
    </>
  );
}
