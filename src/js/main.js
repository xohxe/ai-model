import * as tf from "@tensorflow/tfjs";
import * as tmImage from "@teachablemachine/image";

// window.addEventListener("scroll", () => {
//   ClickScroll();
// });
// const ClickScroll = () => {
//   const distance = window.scrollY;
//   document.querySelector(".top-header").style.transform = `translateY(${
//     distance * 1
//   }px)`;
//   document.querySelector(".container").style.transform = `translateY(${
//     distance * 0.3
//   }px)`;
// };

// window.addEventListener("DOMContentLoaded", init);

const URL = "https://teachablemachine.withgoogle.com/models/iaHjQD7Wd/";

let model, webcam, labelContainer, maxPredictions;

export const init = async () => {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  //const flip = true;
  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();

  // const prediction = await model.predictTopK(maxPredictions, flip);
  labelContainer = document.getElementById("label-container");
  for (let i = 0; i < maxPredictions; i++) {
    labelContainer.appendChild(document.createElement("div"));
  }
};

export const loop = async () => {
  webcam.update(); // update the webcam frame
  await predict();
  window.requestAnimationFrame(loop);
};

export const predict = async () => {
  var image = document.querySelector("#face-image");
  const labelWrap = document.querySelector("#label-wrap");

  labelWrap.classList.remove("hidden");
  const prediction = await model.predict(image, false);

  for (let i = 0; i < maxPredictions; i++) {
    const classPrediction =
      prediction[i].className + ": " + prediction[i].probability.toFixed(2);
    //labelContainer.childNodes[i].innerHTML = classPrediction;

    //console.log(prediction[i].probability.toFixed(2));
    if (prediction[i].probability.toFixed(2) > 0.7) {
      labelContainer.innerHTML = `${prediction[i].className}`;
    } else {
      labelContainer.innerText = "없네요";
    }
  }
};

//const btn2 = document.querySelector("#takePhoto");
//const btn3 = document.querySelector("#uploadPhoto");
const startBtn = document.querySelector("#clickBtn");

startBtn.addEventListener("click", () => {
  document.querySelector(".top-header").style.zIndex = -1;
  document
    .querySelector(".cont-2")
    .scrollIntoView({ behavior: "smooth", inline: "nearest" });
  init();
});

const predictBtn = document.querySelector("#predict-btn");
const restartBtn = document.querySelector("#restartBtn");

predictBtn.addEventListener("click", () => {
  //document.querySelector(".top-header").style.display = "none";
  document
    .querySelector(".cont-3")
    .scrollIntoView({ behavior: "smooth", inline: "nearest" });

  predict();

  document.querySelector(".top-header").classList.add("hidden");
});
restartBtn.addEventListener("click", () => {
  document
    .querySelector(".cont-2")
    .scrollIntoView({ behavior: "smooth", inline: "nearest" });

  document.querySelector("#label-container").innerHTML = "";
  document.querySelector("#face-image").setAttribute("src", "");
  document.querySelector("#face-image").classList.add("hidden");

  document.querySelector(".file-wrap").classList.remove("hidden");
  document.querySelector("#upload-img").value = "";
});
