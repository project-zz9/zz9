import Card1Shadow from "./card1-shadow.png";
import Card1Normal from "./card1-normal.png";
import Card2Shadow from "./card2-shadow.png";
import Card2Normal from "./card2-normal.png";
import Card3Shadow from "./card3-shadow.png";
import Card3Normal from "./card3-normal.png";
import Card4Shadow from "./card4-shadow.png";
import Card4Normal from "./card4-normal.png";
import Card5Shadow from "./card5-shadow.png";
import Card5Normal from "./card5-normal.png";
import Card6Shadow from "./card6-shadow.png";
import Card6Normal from "./card6-normal.png";

const cards: Record<
  string,
  {
    shadow: string;
    normal: string;
  }
> = {
  card1: {
    shadow: Card1Shadow,
    normal: Card1Normal,
  },
  card2: {
    shadow: Card2Shadow,
    normal: Card2Normal,
  },
  card3: {
    shadow: Card3Shadow,
    normal: Card3Normal,
  },
  card4: {
    shadow: Card4Shadow,
    normal: Card4Normal,
  },
  card5: {
    shadow: Card5Shadow,
    normal: Card5Normal,
  },
  card6: {
    shadow: Card6Shadow,
    normal: Card6Normal,
  },
};

export default cards;
