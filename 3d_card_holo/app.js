//Movement Animation to happen
const card = document.querySelectorAll(".card");

  card.forEach(el => {

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
      var py_spark = (50+(py - 50)/7);
      // console.log(px, py, pa, p_opc/100)

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
      el.children[0].style.opacity = p_opc/100;
      // el.children[0].style.background = `linear-gradient( 110deg, hsla(0, 0%, 100%, 0.6) 10%, hsla(0, 0%, 100%, 0.45) 20%, hsla(0, 0%, 0%, 0.3) 90% )`
      const rect = el.children[0].getBoundingClientRect();
      const mouseX = rect.width - (e.clientX - rect.left);
      const mouseY = rect.height -( e.clientY - rect.top);
      const bgPosX = (mouseX / rect.width) * 100;
      const bgPosY = (mouseY / rect.height) * 100;
      el.children[0].style.backgroundPosition = `${bgPosX}% ${bgPosY}%`
      el.children[1].style.backgroundPosition = `${bgPosX}% ${bgPosY}%`

      // el.children[0].style.background = `linear-gradient(110deg,transparent 25%,rgb(0, 231, 255) 48%,rgb(255, 0, 231) 52%, transparent 75%)`
      console.log(bgPosX, bgPosY, p_opc/100)
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
    el.children[0].style.backgroundPosition = `${-100}% ${-100}%`


  });




});
//Animate In


