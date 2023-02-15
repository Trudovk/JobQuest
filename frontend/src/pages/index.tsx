import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { TextImage } from "../components/TextImage";

import clockImage from "../../assets/images/clock.png";
import searchingImage from "../../assets/images/searching.png";

export default function Index() {
  return (
    <>
      <Header />
      <Hero />
      <div className="max-w-6xl mx-auto py-16">
        <TextImage
          title="Для работодателей"
          text="JobQuest предлагает работодателю быстрый и простой способ донести свои вакансии до аудитории соискателей, что позволяет сэкономить время и усилия при подборе сотрудников, быстрее найти квалифицированных кандидатов и повысить узнаваемость своего бренда."
          image={clockImage}
          position="left"
        />
        <TextImage
          title="Для соискателей"
          text="JobQuest предоставляет соискателям быстрый и простой способ поиска вакансий от различных работодателей, экономит ваше время и усилия в поиске работы, позволяет находить новые возможности, быть в курсе последних предложений о работе и повышает ваши шансы найти работу, соответствующую вашим навыкам и опыту."
          image={searchingImage}
          position="right"
        />
      </div>
      <Footer />
    </>
  );
}
