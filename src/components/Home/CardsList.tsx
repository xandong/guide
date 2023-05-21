import React from "react";

import { CardSection } from "../../utils/model/CardSection";
import { subTopicsHome } from "../../utils/datas/subTopicsHome";
import CardSingle from "./CardSingle";

const options: CardSection[] = subTopicsHome;

const CardsList: React.FC = () => {
  return (
    <React.Fragment>
      <div className="w-full flex justify-start">
        <h2 className="text-3xl font-bold text-blue-500">Recomendados</h2>
      </div>
      <section className="h-full grid lg:grid-cols-3 sm:grid-cols-2 grid-cols justify-center items-center">
        {options.map((option: CardSection) => (
          <CardSingle key={option.label} option={option} />
        ))}
      </section>
    </React.Fragment>
  );
};

export default CardsList;
