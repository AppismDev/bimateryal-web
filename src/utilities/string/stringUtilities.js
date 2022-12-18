export function capitalizeStringFirstLetters(str) {
  str = str.toLowerCase();

  return str.replace(/\b[a-z]/g, function (letter) {
    return letter.toUpperCase();
  });
}

export function decapitalizeStringFirstLetters(str) {
  return str.replace(/\b[a-z]/g, function (letter) {
    return letter.toLowerCase();
  });
}
