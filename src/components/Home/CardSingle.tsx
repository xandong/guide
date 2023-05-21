import React from "react";
import { CardSection } from "../../utils/model/CardSection";
import { Link } from "react-router-dom";

interface CardSingleProps {
  option: CardSection;
}

const CardSingle: React.FC<CardSingleProps> = (props: CardSingleProps) => {
  const { option } = props;
  return (
    <React.Fragment>
        <Link
          to={option.path}
          className="relative w-fit sm:h-fit h-32 rounded-lg overflow-hidden shadow-md hover:shadow-xl shadow-zinc-200 hover:shadow-zinc-300 transition-all duration-300 hover:scale-[1.025] sm:m-3 sm:mx-6 m-1 p-px"
          >
          <img
            id={option.label}
            className="sm:w-60 shadow-inner"
            src={option.photo}
            alt={option.label}
            />
          <label
            htmlFor={option.label}
            className="font-bold text-2xl text-white bg-black/10 px-2 py-px rounded-full absolute bottom-3 right-3 group-hover:text-[1.65rem] shadow-xl group-hover:shadow-zinc-500/50 group-hover:bg-black/25 transition-all duration-500"
          >
            {option.label}
          </label>
        </Link>
    </React.Fragment>
  );
};

export default CardSingle;
