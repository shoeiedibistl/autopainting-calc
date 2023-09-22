const basicPaintingPrice = 10000; // Базовая цена покраски
const basicRepairPrice = 1500; // Базовая цена ремонта

let myArray = [];
let myDetail;
let checkedCount = 0;
let fullRepair = document.getElementById("full-body-addRepair-check");
let fullRepairLabel = document.getElementById("full-price-label");
let fullPriceLabel = document.getElementById("full-price");
const instruction = document.getElementById("calc-instruction");
checkAllDetailsBtn = document.querySelector(".checkAllDetailsBtn");
clearAllDetailsBtn = document.querySelector(".clearAllDetailsBtn");
const onHoverColor = "#66bb6a";
let bumperProectionL;
let bumperProectionF;
let bumperProectionR;
let itemList = document.getElementById("calc-item");
let itemLi;
let textItem;
let itemPriceList = document.getElementById("calc-item-price");
let itemPrice;
let itemCheckbox;
let itemCheckboxLabel;
let itemSlider;
let itemLabel;
let itemSpan;
const myCounter = document.querySelector(".counter");
const myDetails = document.querySelectorAll(".calc-detail");

/*  Массив из деталей и их параметров для расчета и выдачи результата
Структура: 
0 - ID 
1 - название детали 
2 - коэффициент цены покраски
3 - ремонт множитель (множитель = аналог boolean, 0 или 1) */
const details = [
  ["f-bumper", "Бампер передний", 1.1, 0],
  ["hood", "Капот", 1.3, 0, 0],
  ["rf-fender", "Крыло переднее правое", 0.9, 0],
  ["rf-door", "Дверь передняя правая", 0.95, 0],
  ["rr-door", "Дверь задняя правая", 0.9, 0],
  ["rr-fender", "Крыло заднее правое", 0.9, 0],
  ["r-threshold", "Порог правый", 0.9, 0],
  ["r-bumper", "Бампер задний", 1.1, 0],
  ["trunk", "Крышка багажника", 0.95, 0],
  ["lf-fender", "Крыло переднее левое", 0.9, 0],
  ["lf-door", "Дверь левая передняя", 0.95, 0],
  ["lr-door", "Дверь левая задняя", 0.9, 0],
  ["lr-fender", "Крыло заднее левое", 0.9, 0],
  ["l-threshold", "Порог левый", 0.9, 0],
  ["roof", "Крыша", 1.75, 0],
];

// Раскрашиваем деталь
myDetails.forEach((detail) => {
  detail.addEventListener("click", function (event) {
    myDetail = event.target;
    if (myDetail.id.substr(2, 6) == "bumper") {
      bumperProectionL = document.getElementById(
        myDetail.id.substr(0, 9) + "l"
      );
      bumperProectionF = document.getElementById(
        myDetail.id.substr(0, 9) + "f"
      );
      bumperProectionR = document.getElementById(
        myDetail.id.substr(0, 9) + "r"
      );
      bumperProectionL.classList.toggle("selected");
      bumperProectionF.classList.toggle("selected");
      bumperProectionR.classList.toggle("selected");
    } else myDetail.classList.toggle("selected");
    addRemoveItem(myDetail);
    countFullPrice(myArray);
    checkFullRepair(myArray);
    fullRepairActive(myArray);
  });
});

function addRemoveItem(myDetail) {
  if (myDetail.classList.contains("selected")) {
    textItem =
      myDetail.id.substr(2, 6) == "bumper"
        ? myDetail.id.substr(0, 8)
        : myDetail.id;
    addItem(textItem);
    myArray.push(textItem);
    return;
  } else {
    removeItem(myDetail);
    myArray.splice(myArray.indexOf(textItem), 1);
    return;
  }
}

document
  .getElementById("full-body-addRepair-check")
  .addEventListener("change", () => changeCheckbox(event.target));

//Добавляем в список
function addItem(textItem) {
  itemCheckbox = document.createElement("input");
  itemCheckbox.type = "Checkbox";
  itemCheckbox.id = textItem + "-check";
  itemCheckbox.setAttribute("add-repair", "add-repair");

  itemCheckbox.addEventListener("change", () => changeCheckbox(event.target));

  itemCheckboxLabel = document.createElement("label");
  itemCheckboxLabel.setAttribute("for", `${textItem}-check`);
  itemCheckboxLabel.classList.add("switch");

  itemSlider = document.createElement("div");
  itemSlider.classList.add("slider", "round");

  itemSpan = document.createElement("span");
  itemSpan.textContent = " + ремонт";

  itemCheckboxLabel.append(itemCheckbox, itemSlider);

  itemLabel = document.createElement("label");
  itemLabel.append(itemCheckboxLabel, itemSpan);

  itemLi = document.createElement("li");
  itemLi.textContent = findDetail(textItem);
  itemLi.id = textItem + "-li";
  itemLi.append(itemLabel);
  itemLi.setAttribute("item-list", "item-list");

  itemList.append(itemLi);

  for (i = 0; i < details.length; i++) {
    if (details[i][0] === textItem) {
      itemCheckbox.checked = details[i][3];
      break;
    }
  }

  itemPrice = document.createElement("li");
  itemPrice.textContent = `${getPaintingPrice(textItem).toLocaleString(
    "ru"
  )} р.`;
  itemPrice.id = textItem + "-price";
  itemPriceList.append(itemPrice);
}

function removeItem(myDetail) {
  textItem =
    myDetail.id.substr(2, 6) == "bumper"
      ? myDetail.id.substr(0, 8)
      : myDetail.id;
  document.getElementById(textItem + "-li").remove();
  document.getElementById(textItem + "-price").remove();
}

//Подсвечиваем все проекции бампера при наведении
myDetails.forEach((detail) => {
  detail.addEventListener("mouseover", function (event) {
    myDetail = event.target;
    if (myDetail.id.substr(2, 6) == "bumper") {
      bumperProectionL = document.getElementById(
        myDetail.id.substr(0, 9) + "l"
      );
      bumperProectionF = document.getElementById(
        myDetail.id.substr(0, 9) + "f"
      );
      bumperProectionR = document.getElementById(
        myDetail.id.substr(0, 9) + "r"
      );
      if (myDetail.classList.contains("selected")) {
        bumperProectionL.classList.add("selected-hover");
        bumperProectionF.classList.add("selected-hover");
        bumperProectionR.classList.add("selected-hover");
      }
    }
  });
});

/*Снимаем подсветку со всех проекций бампера при наведении
bumperProection* не переназначаем, т.к. они уже присвоены при наведении*/
myDetails.forEach((detail) => {
  detail.addEventListener("mouseout", function (event) {
    myDetail = event.target;
    if (myDetail.id.substr(2, 6) == "bumper") {
      bumperProectionL.classList.remove("selected-hover");
      bumperProectionF.classList.remove("selected-hover");
      bumperProectionR.classList.remove("selected-hover");
    }
  });
});

// Выбрать весь кузов
checkAllDetailsBtn.addEventListener("click", () => {
  for (i = 0; i < details.length; i++) {
    elem = details[i][0];

    if (elem == "f-bumper" || elem == "r-bumper") {
      myDetail = document.getElementById(elem + "-f");
      if (!myDetail.classList.contains("selected")) {
        document.getElementById(elem + "-l").classList.add("selected");
        document.getElementById(elem + "-f").classList.add("selected");
        document.getElementById(elem + "-r").classList.add("selected");
        addRemoveItem(myDetail);
      }
    } else {
      myDetail = document.getElementById(elem);
      if (!myDetail.classList.contains("selected")) {
        myDetail.classList.add("selected");
        addRemoveItem(myDetail);
      }
    }
  }
  countFullPrice(myArray);
  fullRepairActive(myArray);
  checkFullRepair(myArray);
});

// Очистить весь кузов
clearAllDetailsBtn.addEventListener("click", () => {
  myArray.forEach(function (elem) {
    if (elem.substr(2, 6) == "bumper") {
      myDetail = document.getElementById(elem + "-f");
      document.getElementById(elem + "-l").classList.remove("selected");
      document.getElementById(elem + "-f").classList.remove("selected");
      document.getElementById(elem + "-r").classList.remove("selected");
    } else {
      myDetail = document.getElementById(elem);
      myDetail.classList.remove("selected");
    }
    details.forEach(function (elem) {
      if (elem[3] == 1) elem[3] = 0;
    });
    removeItem(myDetail);
  });
  myArray = [];
  countFullPrice(myArray);
  fullRepairActive(myArray);
});

// Подсветка списка при наведении на машинку
myDetails.forEach(function (detail) {
  detail.addEventListener("mouseover", function (event) {
    myDetail = event.target;
    if (!myDetail.classList.contains("selected")) {
      myDetail = "";
      return;
    }
    if (myDetail.id.substr(2, 6) != "bumper") {
      document.getElementById(myDetail.id + "-li").style.color = onHoverColor;
      document.getElementById(myDetail.id + "-price").style.color =
        onHoverColor;
      return;
    }
    document.getElementById(myDetail.id.substr(0, 8) + "-li").style.color =
      onHoverColor;
    document.getElementById(myDetail.id.substr(0, 8) + "-price").style.color =
      onHoverColor;
  });
});

// Убрать подсветку при наведении на машинку (отвели курсор)
myDetails.forEach(function (detail) {
  detail.addEventListener("mouseout", () => {
    if (!myDetail.classList.contains("selected")) return;
    if (myDetail.id.substr(2, 6) != "bumper") {
      document.getElementById(myDetail.id + "-li").style.color = "";
      document.getElementById(myDetail.id + "-price").style.color = "";
      return;
    }
    document.getElementById(myDetail.id.substr(0, 8) + "-li").style.color = "";
    document.getElementById(myDetail.id.substr(0, 8) + "-price").style.color =
      "";
  });
});

// Найти деталь в массиве
function findDetail(myDetail) {
  let detailName;
  for (i = 0; i < details.length; i++) {
    if (details[i][0] === myDetail) {
      detailName = details[i][1];
      break;
    }
  }
  return detailName;
}

// Цена покраски детали
function getPaintingPrice(myDetail) {
  let paintingFactor;
  let repairFactor;
  for (i = 0; i < details.length; i++) {
    if (details[i][0] === myDetail) {
      paintingFactor = details[i][2];
      repairFactor = details[i][3];
      break;
    }
  }
  return basicPaintingPrice * paintingFactor + basicRepairPrice * repairFactor;
}

//Галочка "+ремонт" в списке деталей
function changeCheckbox(myCheckbox) {
  if (myCheckbox != fullRepair) {
    for (i = 0; i < details.length; i++) {
      if (details[i][0] === myCheckbox.id.slice(0, -6)) {
        details[i][3] = myCheckbox.checked;
        document.getElementById(
          details[i][0] + "-price"
        ).textContent = `${getPaintingPrice(
          myCheckbox.id.slice(0, -6)
        ).toLocaleString("ru")} р.`;
        break;
      }
    }
    checkFullRepair(myArray);
    countFullPrice(myArray);
    return;
  }

  myArray.forEach(function (elem) {
    for (i = 0; i < details.length; i++) {
      if (details[i][0] === elem) {
        details[i][3] = Number(fullRepair.checked);
        document.getElementById(elem + "-check").checked = fullRepair.checked;
        document.getElementById(
          elem + "-price"
        ).textContent = `${getPaintingPrice(elem).toLocaleString("ru")} р.`;
      }
    }
  });
  countFullPrice(myArray);
}

//Пересчет общей цены ремонта
function countFullPrice(myArray) {
  let res = 0;
  myArray.forEach(function (elem) {
    res = res + getPaintingPrice(elem);
  });
  fullPriceLabel.textContent = `${res.toLocaleString("ru")} р.`;
  myCounter.innerHTML = setCounter();
}

// Счетчик выбранных деталей
function setCounter() {
  if (myArray.length === 1) return `Выбрано: 1 деталь`;
  if (myArray.length > 1 && myArray.length < 5)
    return `Выбрано: ${myArray.length} детали`;
  return `Выбрано: ${myArray.length} деталей`;
}

//Проверка на пустой массив
function isEmptyArr(myArray) {
  return myArray.length == 0 ? true : false;
}

//Активация || деактивация чекбокса "+ ремонт" в общей сумме ремонта (функция "выбрать все")
function fullRepairActive(myArray) {
  fullRepair.disabled = isEmptyArr(myArray);
  if (isEmptyArr(myArray)) {
    fullRepair.checked = false;
    fullRepairLabel.style.color = "#eee";
    fullRepairLabel.style.cursor = "auto";
    instruction.style.left = "0";
  } else {
    fullRepairLabel.style.color = "#ccc";
    fullRepairLabel.style.cursor = "pointer";
    instruction.style.left = "2000px";
  }
}

//Проверяем галочку общий "+ ремонт" full-repair
function checkFullRepair(myArray) {
  checkedCount = 0;
  myArray.forEach(function (elem) {
    for (i = 0; i < details.length; i++) {
      if (details[i][0] === elem) {
        checkedCount += details[i][3];
        break;
      }
    }
  });
  fullRepair.checked = myArray.length === checkedCount;
}

document
  .querySelector(".scheme-instruction")
  .addEventListener("mouseover", function (event) {
    if (
      event.target.id === "scheme-instruction__detail" ||
      event.target.id === "scheme-instruction__detail-img"
    ) {
      document.getElementById("rf-fender").style.fill = "#ddd654";
      document.getElementById("rf-fender").style.filter =
        "drop-shadow(0px 0px 16px #ddd654)";
      document.getElementById("scheme-instruction__detail").style.color =
        "#ddd654";
      return;
    }
    if (
      event.target.id === "scheme-instruction__add-repair" ||
      event.target.id === "scheme-instruction__add-repair-img"
    ) {
      document.getElementById("full-price-label").style.color = "#ddd654";
      document.getElementById("slider round").style.backgroundColor = "#ddd654";
      document.getElementById("full-price-label").style.filter =
        "drop-shadow(0px 0px 16px #ddd654)";
      document.getElementById("scheme-instruction__add-repair").style.color =
        "#ddd654";
      return;
    }
    if (
      event.target.id === "scheme-instruction__choose-all" ||
      event.target.id === "scheme-instruction__choose-all-img"
    ) {
      checkAllDetailsBtn.style.color = "#ddd654";
      checkAllDetailsBtn.style.borderWidth = "2px";
      checkAllDetailsBtn.style.borderColor = "#ddd654";
      checkAllDetailsBtn.style.filter = "drop-shadow(0px 0px 16px #ddd654)";
      document.getElementById("scheme-instruction__choose-all").style.color =
        "#ddd654";
      return;
    }
    if (
      event.target.id === "scheme-instruction__clear-all" ||
      event.target.id === "scheme-instruction__clear-all-img"
    ) {
      clearAllDetailsBtn.style.color = "#ddd654";
      clearAllDetailsBtn.style.borderWidth = "2px";
      clearAllDetailsBtn.style.borderColor = "#ddd654";
      clearAllDetailsBtn.style.filter = "drop-shadow(0px 0px 16px #ddd654)";
      document.getElementById("scheme-instruction__clear-all").style.color =
        "#ddd654";
      return;
    }
  });

document
  .querySelector(".scheme-instruction")
  .addEventListener("mouseout", function (event) {
    if (
      event.target.id === "scheme-instruction__detail" ||
      event.target.id === "scheme-instruction__detail-img"
    ) {
      document.getElementById("rf-fender").style.fill = "";
      document.getElementById("rf-fender").style.filter = "";
      document.getElementById("scheme-instruction__detail").style.color = "";
      return;
    }
    if (
      event.target.id === "scheme-instruction__add-repair" ||
      event.target.id === "scheme-instruction__add-repair-img"
    ) {
      document.getElementById("full-price-label").style.color = "";
      document.getElementById("slider round").style.backgroundColor = "";
      document.getElementById("full-price-label").style.filter = "";
      document.getElementById("scheme-instruction__add-repair").style.color =
        "";
      return;
    }
    if (
      event.target.id === "scheme-instruction__choose-all" ||
      event.target.id === "scheme-instruction__choose-all-img"
    ) {
      checkAllDetailsBtn.style.color = "";
      checkAllDetailsBtn.style.borderColor = "";
      checkAllDetailsBtn.style.borderWidth = "";
      checkAllDetailsBtn.style.filter = "";
      document.getElementById("scheme-instruction__choose-all").style.color =
        "";
      return;
    }
    if (
      event.target.id === "scheme-instruction__clear-all" ||
      event.target.id === "scheme-instruction__clear-all-img"
    ) {
      clearAllDetailsBtn.style.color = "";
      clearAllDetailsBtn.style.borderColor = "";
      clearAllDetailsBtn.style.borderWidth = "";
      clearAllDetailsBtn.style.filter = "";
      document.getElementById("scheme-instruction__clear-all").style.color = "";
      return;
    }
  });

const myPopup = document.getElementById("calc-banner");

const closePopupBtn = document.querySelectorAll(".popup__close");

closePopupBtn.forEach((element) =>
  element.addEventListener("click", () => myPopup.classList.remove("show"))
);

const myOptions = {
  rootMargin: "0px 0px 0px 0px",
  threshold: 0.5,
};

let showPopup;

const myCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      showPopup = setTimeout(() => {
        myPopup.classList.add("show");
      }, 1000 * 1000);
    } else if (!entry.isIntersecting) {
      clearTimeout(showPopup);
    }
  });
};

let calcObserver = new IntersectionObserver(myCallback, myOptions);

let target = document.getElementById("calculator");
calcObserver.observe(target);
