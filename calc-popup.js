const myPopup = document.getElementById("calc-banner");

const closePopupBtn = document.querySelectorAll(".popup-close");


// myPopup.addEventListener("click", function(event) {
//   if (event.target === myPopup) myPopup.classList.remove("show")
// });

closePopupBtn.forEach(element => 
  element.addEventListener("click", () => myPopup.classList.remove("show")));

const myOptions = {
    rootMargin: '0px 0px 0px 0px',
    threshold: 0.5,
  }

let showPopup


const myCallback = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
       showPopup = setTimeout(() => {
        myPopup.classList.add("show")
        // bannerShown = true;
      // }, 15000);
    }, 20 * 1000);
      // console.log('Пользователь пришел в калькулятор!');
    } else

    if (!entry.isIntersecting) {
      clearTimeout(showPopup)
    }
  })
}

let calcObserver = new IntersectionObserver(myCallback, myOptions);

let target = document.getElementById("calculator");
calcObserver.observe(target);


console.log(1);

setTimeout(() => console.log(2));

Promise.resolve().then(() => console.log(3));

Promise.resolve().then(() => setTimeout(() => console.log(4)));

Promise.resolve().then(() => console.log(5));

setTimeout(() => console.log(6));

console.log(7);