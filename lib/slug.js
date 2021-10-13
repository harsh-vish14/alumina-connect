export const findLinkedInId = (alumina) => {
  if (alumina) {
    const result = alumina.replace("https://www.linkedin.com/in/", "");
    result.split("/")[0];
    return result.split("/")[0];
  }
};

export const slugConverter = (string) => {
  return string.trim().split(" ").join("-").toLowerCase();
};
