const basicPaintingPrice = 10000; // Базовая цена покраски
const basicRepairPrice = 1500; // Базовая цена ремонта

let myArray = [];
let myDetail;
let checkedCount = 0;
const fullRepair = document.getElementById("full-body-addRepair-check");
const fullRepairLabel = document.getElementById("full-price-label");
const fullPriceLabel = document.getElementById("full-price");
const instruction = document.getElementById("calc-instruction");
const checkAllDetailsBtn = document.querySelector(".checkAllDetailsBtn");
const clearAllDetailsBtn = document.querySelector(".clearAllDetailsBtn");
const onHoverColor = "#66bb6a";
const lightingColor = "#ddd654";
let bumperProectionL;
let bumperProectionF;
let bumperProectionR;
const itemList = document.getElementById("calc-item");
let itemLi;
let textItem;
const itemPriceList = document.getElementById("calc-item-price");
let itemPrice;
let itemCheckbox;
let itemCheckboxLabel;
let itemSlider;
let itemLabel;
let itemSpan;
const myCounter = document.querySelector(".counter");
const myDetails = document.querySelectorAll(".calc-detail");
const myLightingFilter = "drop-shadow(0px 0px 16px " + lightingColor.slice(0) + ")";

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
      document.getElementById(myDetail.id.substr(0, 9) + "l").classList.toggle("selected");
      document.getElementById(myDetail.id.substr(0, 9) + "f").classList.toggle("selected");
      document.getElementById(myDetail.id.substr(0, 9) + "r").classList.toggle("selected");
    } else myDetail.classList.toggle("selected");
    addRemoveItem(myDetail);
    countFullPrice(myArray);
    checkFullRepair(myArray);
    fullRepairActive(myArray);
  });
});

// Добавить/удалить деталь из массива выбранных элементов
function addRemoveItem(myDetail) {
  if (myDetail.classList.contains("selected")) {
    textItem = myDetail.id.substr(2, 6) == "bumper" ? myDetail.id.substr(0, 8) : myDetail.id;
    addItem(textItem);
    myArray.push(textItem);
    return;
  } else {
    removeItem(myDetail);
    myArray.splice(myArray.indexOf(textItem), 1);
    return;
  }
}

// Галочка "+ремонт" на весь список
document.getElementById("full-body-addRepair-check").addEventListener("change", () => changeCheckbox(event.target));

//Добавляем в список
function addItem(textItem) {
  // Функцию переписываю для сокращения кода с 25 строк до 7 по 
  // принципу клонирования блока-образца (здесь пока закомментировано) + 
  // соответствующие изменения в разметке страницы.
  // Прототип на 25 строк тоже рабочий.
  // Актуализирую по готовности
  
  // let clone = mySample.cloneNode(true);
  // clone.children[0].children[0].textContent = "Крыша";
  // clone.children[0].children[1].children[0].setAttribute("for", "roof-addRepair-check");
  // clone.children[0].children[1].children[0].children[0].id = "roof-addRepair-check";
  // clone.children[1].textContent = 15000;
  // clone.classList.remove("invisible");
  // myParent.append(clone);




  
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
  itemPrice.textContent = `${getPaintingPrice(textItem).toLocaleString("ru")} р.`;
  itemPrice.id = textItem + "-price";
  itemPriceList.append(itemPrice);
}

// Удалить деталь
function removeItem(myDetail) {
  textItem = myDetail.id.substr(2, 6) == "bumper" ? myDetail.id.substr(0, 8) : myDetail.id;
  document.getElementById(textItem + "-li").remove();
  document.getElementById(textItem + "-price").remove();
}

//Подсвечиваем все проекции бампера при наведении
myDetails.forEach((detail) => {
  detail.addEventListener("mouseover", function (event) {
    myDetail = event.target;
    if (myDetail.id.substr(2, 6) == "bumper" && myDetail.classList.contains("selected")) {
      document.getElementById(myDetail.id.substr(0, 9) + "l").classList.add("selected-hover");
      document.getElementById(myDetail.id.substr(0, 9) + "f").classList.add("selected-hover");
      document.getElementById(myDetail.id.substr(0, 9) + "r").classList.add("selected-hover");
    }
  });
});

/*Снимаем подсветку со всех проекций бампера при наведении
bumperProection* не переназначаем, т.к. они уже присвоены при наведении*/
myDetails.forEach((detail) => {
  detail.addEventListener("mouseout", function (event) {
    myDetail = event.target;
    if (myDetail.id.substr(2, 6) == "bumper") {
      document.getElementById(myDetail.id.substr(0, 9) + "l").classList.remove("selected-hover");
      document.getElementById(myDetail.id.substr(0, 9) + "f").classList.remove("selected-hover");
      document.getElementById(myDetail.id.substr(0, 9) + "r").classList.remove("selected-hover");
    }
  });
});

// Выбрать весь кузов
checkAllDetailsBtn.addEventListener("click", () => {
  for (i = 0; i < details.length; i++) {
    elem = details[i][0];
    if (elem.substr(2) == "bumper") {
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
    details.map((elem) => (elem[3] = 0));
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
    setDetailColor(myDetail, onHoverColor);
  });
});

// Убрать подсветку при наведении на машинку (отвели курсор)
myDetails.forEach(function (detail) {
  detail.addEventListener("mouseout", () => {
    if (!myDetail.classList.contains("selected")) return;
    setDetailColor(myDetail, "");
  });
});

// Функция для подсветки списка
function setDetailColor(myDetail, myColor) {
  const detailName = myDetail.id.substr(2, 6) == "bumper" ? myDetail.id.substr(0, 8) : myDetail.id;
  document.getElementById(detailName + "-li").style.color = myColor;
  document.getElementById(detailName + "-price").style.color = myColor;
}

// Найти деталь в массиве
function findDetail(myDetail) {
  return details.find((detail) => detail[0] == myDetail)[1];
}

// Цена покраски детали
function getPaintingPrice(myDetail) {
  let paintingFactor = details.find((detail) => detail[0] == myDetail)[2];
  let repairFactor = details.find((detail) => detail[0] == myDetail)[3];
  return basicPaintingPrice * paintingFactor + basicRepairPrice * repairFactor;
}

//Галочка "+ремонт" в списке деталей
function changeCheckbox(myCheckbox) {
  if (myCheckbox != fullRepair) {
    myDetail = details.find((detail) => detail[0] == myCheckbox.id.slice(0, -6));
    myDetail[3] = myCheckbox.checked;
    document.getElementById(myDetail[0] + "-price").textContent = `${getPaintingPrice(myCheckbox.id.slice(0, -6)).toLocaleString("ru")} р.`;
    checkFullRepair(myArray);
    countFullPrice(myArray);
    return;
  }
  myArray.forEach(function (elem) {
    details.find((detail) => detail[0] == elem)[3] = +fullRepair.checked;
    document.getElementById(elem + "-check").checked = fullRepair.checked;
    document.getElementById(elem + "-price").textContent = `${getPaintingPrice(elem).toLocaleString("ru")} р.`;
  });
  countFullPrice(myArray);
}

//Пересчет общей цены ремонта
function countFullPrice(myArray) {
  let res = 0;
  myArray.map((elem) => (res += getPaintingPrice(elem)));
  fullPriceLabel.textContent = `${res.toLocaleString("ru")} р.`;
  myCounter.innerHTML = setCounter();
}

// Счетчик выбранных деталей
function setCounter() {
  if (myArray.length === 1) return `Выбрано: 1 деталь`;
  if (myArray.length > 1 && myArray.length < 5) return `Выбрано: ${myArray.length} детали`;
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
  myArray.forEach((elem) => (checkedCount += details.find((detail) => detail[0] == elem)[3]));
  fullRepair.checked = myArray.length === checkedCount;
}

// Подсветка инструкции п.1
function instructionLightingElement(element, myColor, lightingFilter) {
  document.getElementById(element).style.fill = myColor;
  document.getElementById(element).style.filter = lightingFilter;
  document.getElementById("scheme-instruction__detail").style.color = myColor;
}

// Подсветка инструкции п.2
function instructionLightingAddRepair(myColor, lightingFilter) {
  document.getElementById("full-price-label").style.color = myColor;
  document.getElementById("slider round").style.backgroundColor = myColor;
  document.getElementById("full-price-label").style.filter = lightingFilter;
  document.getElementById("scheme-instruction__add-repair").style.color = myColor;
}

// Подсветка инструкции п.3-4
function instructionLightingButton(btnClass, paragraphID, myColor, borderWidth, lightingFilter) {
  document.querySelector(btnClass).style.color = myColor;
  document.querySelector(btnClass).style.borderWidth = borderWidth;
  document.querySelector(btnClass).style.borderColor = myColor;
  document.querySelector(btnClass).style.filter = lightingFilter;
  document.getElementById(paragraphID).style.color = myColor;
}

// Подсветка инструкции при наведении
document.querySelector(".scheme-instruction").addEventListener("mouseover", function (event) {
  if (event.target.id.includes("scheme-instruction__detail")) {
    instructionLightingElement("rf-fender", lightingColor, myLightingFilter);
    return;
  }
  if (event.target.id.includes("scheme-instruction__add-repair")) {
    instructionLightingAddRepair(lightingColor, myLightingFilter);
    return;
  }
  if (event.target.id.includes("scheme-instruction__choose-all")) {
    instructionLightingButton(".checkAllDetailsBtn", "scheme-instruction__choose-all", lightingColor, "2px", myLightingFilter);
    return;
  }
  if (event.target.id.includes("scheme-instruction__clear-all")) {
    instructionLightingButton(".clearAllDetailsBtn", "scheme-instruction__clear-all", lightingColor, "2px", myLightingFilter);
    return;
  }
});

// Убрать подсветку инструкции
document.querySelector(".scheme-instruction").addEventListener("mouseout", function (event) {
  if (event.target.id.includes("scheme-instruction__detail")) {
    instructionLightingElement("rf-fender", "", "");
    return;
  }
  if (event.target.id.includes("scheme-instruction__add-repair")) {
    instructionLightingAddRepair("", "");
    return;
  }
  if (event.target.id.includes("scheme-instruction__choose-all")) {
    instructionLightingButton(".checkAllDetailsBtn", "scheme-instruction__choose-all", "", "", "");
    return;
  }
  if (event.target.id.includes("scheme-instruction__clear-all")) {
    instructionLightingButton(".clearAllDetailsBtn", "scheme-instruction__clear-all", "", "", "");
    return;
  }
});

// Всплывающее окно
const myPopup = document.getElementById("calc-banner");
const closePopupBtn = document.querySelectorAll(".popup__close");
let showPopup;
const myOptions = {
  rootMargin: "0px 0px 0px 0px",
  threshold: 0.5,
};

closePopupBtn.forEach((element) => element.addEventListener("click", () => myPopup.classList.remove("show")));

const myCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      showPopup = setTimeout(() => {
        myPopup.classList.add("show");
      }, 10 * 1000);
    } else if (!entry.isIntersecting) {
      clearTimeout(showPopup);
    }
  });
};

let calcObserver = new IntersectionObserver(myCallback, myOptions);

let target = document.getElementById("calculator");
calcObserver.observe(target);
