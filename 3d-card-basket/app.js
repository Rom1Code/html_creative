const card = document.querySelectorAll(".card");

  
card.forEach(el => {
    let currentXGlare = 0;
    let currentYGlare = 0;
    let isRotated = false;
    let xAxis, yAxis;
    let isAnimationInProgress = false;

  //Moving Animation Event
  el.addEventListener("mousemove", (e) => {

    if(!isAnimationInProgress){

      let elRect = el.getBoundingClientRect()

      var l = e.offsetX;
      var t = e.offsetY;
      var h = elRect.height;
      var w = elRect.width;
      var px = Math.abs(Math.floor(100 / w * l)-100);
      var py = Math.abs(Math.floor(100 / h * t)-100);
      var pa = (50-px)+(50-py);
      var p_opc = 20+(Math.abs(pa)*1.5);
      var lp = (50+(px - 50)/1.5);
      var tp = (50+(py - 50)/1.5);

      el.style.setProperty('--x', `${lp}%`);
      el.style.setProperty('--y', `${tp}%`);

      if (isRotated) {
        xAxis = ((window.innerHeight / 2 - e.pageX) / 20) * 1.3;
        yAxis = -((window.innerWidth / 2 - e.pageY) / 20) * 1.3;
        currentXGlare = (e.offsetX / elRect.height * 100) * 1.3;
        currentYGlare = (e.offsetY / elRect.width * 100) * 1.3;
        // el.classList.remove("rotate-animation");

      } else {
        xAxis = (window.innerWidth / 2 - e.pageX) / 20;
        yAxis = -(window.innerHeight / 2 - e.pageY) / 20;
        currentXGlare = e.offsetX / elRect.width * 100;
        currentYGlare = e.offsetY / elRect.height * 100;
        el.classList.remove("rotate-animation2");

      }
      el.style.transform = `scale(${isRotated ? 1.3 : 1}) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
      el.children[2].style.background = `radial-gradient(circle at ${currentXGlare}% ${currentYGlare}%, hsla(0, 0%, 100%, 0.6) 10%, hsla(0, 0%, 100%, 0.45) 20%, hsla(0, 0%, 0%, 0.3) 90% )`
    }
  });

  el.addEventListener("mouseenter", (e) => {
    el.style.transition = "none";

    //Popout
  
  });
  //Animate Out
  el.addEventListener("mouseleave", (e) => {

    el.style.transition = "all 1.5s ease";
    el.style.transform = `scale(${isRotated ? 1.3 : 1}) rotateY(0deg) rotateX(0deg)`;

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
    // el.children[2].style.background = `radial-gradient(circle at 50% 50%, hsla(0, 0%, 100%, 0.8) 10%, hsla(0, 0%, 100%, 0.65) 20%, hsla(0, 0%, 0%, 0.5) 90% )`
  });

  el.addEventListener("click", () => {

    if (!isAnimationInProgress) {
      isAnimationInProgress = true;
      if (isRotated == false){
        el.style.transform = `scale(1.3) rotateZ(90deg) rotateY(180deg)`;
        el.classList.add("rotate-animation");
        isRotated = true;
      }
      else{
        el.style.transform = `scale(1) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        el.classList.remove("rotate-animation")
        el.classList.add("rotate-animation2");
        isRotated = false;
      }
      // Attendre la fin de l'animation
      setTimeout(() => {
        isAnimationInProgress = false;
      }, 1000);  
    }
    console.log(el.children)

  });

})
