import { COLORS } from "./colorList";
import { randomInt } from "../../random/randomInt"

export function randomColorList(length) {
  const colorList = [];

  while (colorList.length < length) {
    const color = COLORS[randomInt(COLORS.length)];
    console.log("randomColorList, color...")
    console.log(color)
    if (!colorList.length || colorList.at(-1).description !== color.description) {
      colorList.push(color);
    }
  }

  return colorList;
}
