//Movement Animation to happen
const card = document.querySelectorAll(".card");

  card.forEach(el => {

    window.addEventListener('load', (e) => {
      el.children[1].classList.remove("front_loading")
    })


    let currentXGlare = 0;
    let currentYGlare = 0;
    let isRotated = false;
    let xAxis, yAxis;
    let isAnimationInProgress = false;

  //Moving Animation Event
  el.addEventListener("mousemove", (e) => {
    // console.log("largeur ecran ", window.innerWidth) // largeur de l'ecran
    // console.log("position sur la largeur de l'ecran ", e.pageX) // position sur la largeur de l'ecran 0 à 1200 px par exemple
    // console.log("position sur la largeur de de l'element ", e.offsetX) // position dans l'element 0 à 350
    if(!isAnimationInProgress){

      let elRect = el.getBoundingClientRect()
      console.log("??? ", elRect.left)
      if (isRotated) {
        // xAxis = ((window.innerWidth / 2 - e.pageX) / 20) * 1.5; //moitié de l'ecran - la position sur X, positif si sur la partie gauche de l'ecran par rapport du milieu et negatif si sur la parti droite de l'ecran
        // yAxis = -((window.innerHeight / 2 - e.pageY) / 20) * 1.5;


        xAxis = ((elRect.width / 2 - e.offsetX) / 20) * 1.5; //moitié de l'ecran - la position sur X, positif si sur la partie gauche de l'ecran par rapport du milieu et negatif si sur la parti droite de l'ecran
        yAxis = -((elRect.height / 2 - e.offsetY) / 20) * 1.5;


        currentXGlare = (e.offsetX / elRect.width * 100) * 1.5;
        currentYGlare = (e.offsetY / elRect.height * 100) * 1.5;
        el.classList.remove("rotate-animation");

      } else {
        // xAxis = (window.innerWidth / 2 - e.pageX) / 20;
        // yAxis = -(window.innerHeight / 2 - e.pageY) / 20;

        xAxis = ((elRect.width / 2 - e.offsetX) / 20) ; //moitié de l'ecran - la position sur X, positif si sur la partie gauche de l'ecran par rapport du milieu et negatif si sur la parti droite de l'ecran
        yAxis = -((elRect.height / 2 - e.offsetY) / 20);

        currentXGlare = e.offsetX / elRect.width * 100;
        // console.log("xAxis",xAxis)
        // console.log("yAxis",yAxis)

        currentYGlare = e.offsetY / elRect.height * 100;
        el.classList.remove("rotate-animation2");

      }

     
      el.style.transform = `scale(${isRotated ? 1.5 : 1}) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
      el.children[2].style.background = `radial-gradient(circle at ${currentXGlare}% ${currentYGlare}%, hsla(0, 0%, 100%, 0.6) 10%, hsla(0, 0%, 100%, 0.45) 20%, hsla(0, 0%, 0%, 0.3) 90% )`
    }
  });

  el.addEventListener("mouseenter", (e) => {
    // el.style.transition = "all 0.1s ease-out";
    el.style.transition = "none";


    //Popout
  
  });
  //Animate Out
  el.addEventListener("mouseleave", (e) => {


    el.style.transition = "all 1.5s ease";
    el.style.transform = `scale(${isRotated ? 1.5 : 1}) rotateY(0deg) rotateX(0deg)`;


    const transitionStartTime = Date.now();
    const transitionDuration = 1500; // Durée de transition en millisecondes
    const transitionInterval = setInterval(() => {
      const elapsedTime = Date.now() - transitionStartTime;
      const transitionProgress = Math.min(elapsedTime / transitionDuration, 1); // Progression de la transition (0 à 1)
  
      const glareOpacity1 = (1 - transitionProgress) * 0.6; // Opacité du halo ajustée pendant la transition
      const glareOpacity2 = (1 - transitionProgress) * 0.45; // Opacité du halo ajustée pendant la transition
      const glareOpacity3 = (1 - transitionProgress) * 0.3; // Opacité du halo ajustée pendant la transition
      
      el.children[2].style.background = `radial-gradient(circle at ${currentXGlare}% ${currentYGlare}%, hsla(0, 0%, 100%, ${glareOpacity1}) 10%, hsla(0, 0%, 100%, ${glareOpacity2}) 20%, hsla(0, 0%, 0%, ${glareOpacity3}) 90% )`;
  
      if (transitionProgress === 1) {
        clearInterval(transitionInterval);
        el.children[2].style.background = 'none';
      }
    }, 16);
    // el.children[0].style.background = `radial-gradient(circle at 50% 50%, hsla(0, 0%, 100%, 0.8) 10%, hsla(0, 0%, 100%, 0.65) 20%, hsla(0, 0%, 0%, 0.5) 90% )`
  });

  el.addEventListener("click", () => {

    el.children[0].classList.remove("back_loading")
    if (!isAnimationInProgress) {
      isAnimationInProgress = true;
      if (isRotated == false){
        el.style.transform = `scale(1.5) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        el.style.position = 'fixed';
        el.style.top = '0%';
        el.style.left = '30%';
        el.style.zIndex = '999'
        el.classList.add("rotate-animation");
        isRotated = true;
      }
      else{
        el.style.transform = `scale(1) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        el.style.position = 'relative';
        el.style.top = '0%';
        el.style.left = '0%';
        el.style.zIndex = '0'

        el.classList.add("rotate-animation2");
        isRotated = false;
      }
      // Attendre la fin de l'animation
      setTimeout(() => {
        isAnimationInProgress = false;
      }, 1000);  
    }
  });


});
//Animate In


