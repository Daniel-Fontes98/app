import { sintoms } from "./sintoms";

export const getColourCode = (sintomsList: string[]) => {
  const colourCount = {
    red: 0,
    orange: 0,
    yellow: 0,
    green: 0,
  };

  sintomsList.map((sintom) => {
    const colour = sintoms.find((s) => s.name === sintom)?.code;
    if (
      colour === "red" ||
      colour === "orange" ||
      colour === "yellow" ||
      colour === "green"
    )
      colourCount[colour]++;
  });

  if (colourCount.red > 0) return "red";
  if (colourCount.orange > 0) return "orange";
  if (colourCount.green > colourCount.yellow) return "green";
  if (colourCount.yellow > 0) return "yellow";
  return "green";
};
