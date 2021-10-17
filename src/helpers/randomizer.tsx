export const randomNumberInRange = (max: number, min: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const shuffle = (array: any[]) => {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
