import Card1Normal from "./card1-normal.png";
import Card2Normal from "./card2-normal.png";
import Card3Normal from "./card3-normal.png";
import Card4Normal from "./card4-normal.png";
import Card5Normal from "./card5-normal.png";
import Card6Normal from "./card6-normal.png";

import Card1Picked1 from "./card1-picked1.png";
import Card1Picked2 from "./card1-picked2.png";
import Card1Picked3 from "./card1-picked3.png";
import Card2Picked1 from "./card2-picked1.png";
import Card2Picked2 from "./card2-picked2.png";
import Card2Picked3 from "./card2-picked3.png";
import Card3Picked1 from "./card3-picked1.png";
import Card3Picked2 from "./card3-picked2.png";
import Card3Picked3 from "./card3-picked3.png";
import Card4Picked1 from "./card4-picked1.png";
import Card4Picked2 from "./card4-picked2.png";
import Card4Picked3 from "./card4-picked3.png";
import Card5Picked1 from "./card5-picked1.png";
import Card5Picked2 from "./card5-picked2.png";
import Card5Picked3 from "./card5-picked3.png";
import Card6Picked1 from "./card6-picked1.png";
import Card6Picked2 from "./card6-picked2.png";
import Card6Picked3 from "./card6-picked3.png";

import CardShadow from "./card-shadow.png";

const cards: Record<
  string,
  {
    normal: string;
    filter: ColorCode;
    picked: Record<string, string>;
  }
> = {
  card1: {
    normal: Card1Normal,
    filter: "#FF5A0D",
    picked: {
      "10cm": Card1Picked1,
      "50cm": Card1Picked2,
      "1m": Card1Picked3,
    },
  },
  card2: {
    normal: Card2Normal,
    filter: "#ECD34E",
    picked: {
      "10cm": Card2Picked1,
      "50cm": Card2Picked2,
      "1m": Card2Picked3,
    },
  },
  card3: {
    normal: Card3Normal,
    filter: "#0DFF7C",
    picked: {
      "10cm": Card3Picked1,
      "50cm": Card3Picked2,
      "1m": Card3Picked3,
    },
  },
  card4: {
    normal: Card4Normal,
    filter: "#7B61FF",
    picked: {
      "10cm": Card4Picked1,
      "50cm": Card4Picked2,
      "1m": Card4Picked3,
    },
  },
  card5: {
    normal: Card5Normal,
    filter: "#EC0DFF",
    picked: {
      "10cm": Card5Picked1,
      "50cm": Card5Picked2,
      "1m": Card5Picked3,
    },
  },
  card6: {
    normal: Card6Normal,
    filter: "#335BE9",
    picked: {
      "10cm": Card6Picked1,
      "50cm": Card6Picked2,
      "1m": Card6Picked3,
    },
  },
};

export default cards;

export const shadow = CardShadow;
