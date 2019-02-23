const colors = ['#ffe26f', '#6d3580', '#cc4165', '#e4734f'];

let currentColor = 0;

export const getNextColor = () => {
  currentColor += 1;
  if (currentColor == colors.length)
    currentColor = 0;
  return colors[currentColor];
}

export const getPrevColor = () => {
  currentColor -= 1;
  if (currentColor < 0)
    currentColor = colors.length - 1;
  
  return colors[currentColor];
}