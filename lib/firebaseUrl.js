const correctPath = (link) => {
  let result = link
    .replace(
      "https://firebasestorage.googleapis.com/v0/b/alumina-connect.appspot.com/o/",
      ""
    )
    .split("?")[0];

  return {
    storage: link.includes("https://firebasestorage.googleapis.com/v"),
    path: result,
  };
};

console.log(correctPath(imageLink));
