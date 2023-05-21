import { CardSection } from "../model/CardSection";
import eventPic from "../../assets/event.png"
import tourismPic from "../../assets/tourism.png"
import servicePic from "../../assets/service.png"

export const subTopicsHome: CardSection[] = [
  { label: "Eventos", photo: eventPic, path: "/events" },
  { label: "Turismo", photo: tourismPic, path: "/tourism" },
  { label: "Serviços", photo: servicePic, path: "/services" },
];