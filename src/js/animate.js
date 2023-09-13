const btn1 = document.querySelector("#clickBtn");

btn1.addEventListener("click", () => {
  //  console.log("tt");
  document
    .querySelector(".cool-effect")
    .scrollIntoView({ behavior: "smooth", inline: "nearest" });
  //ClickScroll();
});

window.addEventListener("scroll", () => {
  ClickScroll();
});
const ClickScroll = () => {
  const distance = window.scrollY;
  document.querySelector(".top-header").style.transform = `translateY(${
    distance * 1
  }px)`;
  document.querySelector(".container").style.transform = `translateY(${
    distance * 0.3
  }px)`;
//   setTimeout(() => {
//     document.querySelector("section h3").classList.add("animate-me");
//   }, 400);
};

// window.addEventListener("scroll", function() {
//     const distance = window.scrollY;
//     document.querySelector(".top-header").style.transform = `translateY(${distance *
//       1}px)`;
//     document.querySelector(
//       ".container"
//     ).style.transform = `translateY(${distance * 0.3}px)`;
//     setTimeout(() => {
//       document.querySelector("section h3").classList.add("animate-me");
//     }, 400);
//   });
