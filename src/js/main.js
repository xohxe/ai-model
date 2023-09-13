import * as tf from "@tensorflow/tfjs";
import * as tmImage from "@teachablemachine/image";

const URL = "https://teachablemachine.withgoogle.com/models/_gMZKvnj2/";

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
  const prediction = await model.predict(image, false);
  for (let i = 0; i < maxPredictions; i++) {
    const classPrediction =
      prediction[i].className + ": " + prediction[i].probability.toFixed(2);
    labelContainer.childNodes[i].innerHTML = classPrediction;
  }
};

const btn2 = document.querySelector("#takePhoto");
const btn3 = document.querySelector("#uploadPhoto");
btn2.addEventListener("click", () => {
  document.querySelector(".top-header").style.display = "none";
  document
    .querySelector(".cont-3")
    .scrollIntoView({ behavior: "smooth", inline: "nearest" });

  init();
});

btn3.addEventListener("click", () => {
  document.querySelector(".top-header").style.display = "none";
  document
    .querySelector(".cont-3")
    .scrollIntoView({ behavior: "smooth", inline: "nearest" });

  init();
});

const faceImage = document.querySelector("#predict-btn");
faceImage.addEventListener("click", () => {
  predict();
});
