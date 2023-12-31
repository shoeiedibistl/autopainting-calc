# autopainting-calc

<b>Онлайн-калькулятор для расчета стоимости кузовного ремонта</b>

Функционал: 
1.	Подсвечивание элементов на странице (целевой path SVG и HTML-блоки) при наведении на соответствующий раздел инструкции;
2.	Создание на странице списка выбранных элементов (добавление/удаление элементов списка при клике на соответствующий элемент на SVG); 
3.	Установка или снятие состояния «выбран» одновременно для 3 элементов изображения при клике на любой из них (бампер передний и бампер задний в 3 проекциях) при добавлении в список выбранных элементов одного элемента (подсвечиваются три проекции бампера, в списке отображается «бампер передний/задний);
4.	Расчет общей цены в зависимости от выбранных элементов и чекбоксов по отдельным элементам списка;
5.	Кастомизированный чекбокс на каждом элементе списка, который увеличивает цену этого элемента и общую цену при значении checked и возвращает исходную цену при снятии состояния checked;
6.	При удалении элемента кузова запоминается состояние чекбокса, и при повторном выборе этого элемента оно возвращается в предыдущее состояние (checked true/false);
7.	Переключение всех элементов checkbox в списке элементов в состояние checked true/false при переключении основного чекбокса на весь кузов;
8.	Слежение основного чекбокса за состоянием переключения остальных чекбоксов (если выбраны все, он автоматически переключается в состояние checked, если выбраны не все, автоматически переводится в состояние checked = false;
9.	Подсветка строки в списке деталей при наведении на соответствующую часть SVG-изображения (деталь кузова) для быстрого поиска нужной детали в списке;
10.	Выбор всех деталей при клике на кнопку «Выбрать весь кузов»;
11.	Очистка всех деталей и сброс выбранных значений при клике на кнопку сброса;
12.	Счетчик количества выбранных деталей с изменяемым окончанием слова;
13.	Всплывающее окно с предложением записаться на осмотр при нахождении пользователя внутри блока с калькулятором в течение заданного времени (в примере - 10 сек). При покидании блока скроллом до истечения времени появления всплывающего окна таймер отменяется, и всплывающее окно не отображается.

<b>Можно разместить свой макет кузова через SVG-код, расставив классы и ID на соответствующие path'ы</b>




<b>Online calculator for calculating the cost of car body repairs.</b>

Functional:
1. Highlighting elements on the page (SVG path and HTML blocks) when you hover over the corresponding section of the instruction;
2. Creating a list of selected elements (adding/removing list elements by clicking on the corresponding element in the image);
3. Setting or removing the “selected” state simultaneously for 3 image elements when you click on any of them (front bumper and rear bumper in 3 projections) when adding one element to the list of selected elements (three projections of the bumper are highlighted, is displayed in the list  “front/rear bumper”);
4. Calculation of the total price depending on the selected elements and checkboxes for each element;
5. A custom checkbox on each list element, which increases the price of an individual list item and the total price when the checked value is set and returns the original price when the checked state is removed;
6. When deleting a body element, the state of the checkbox is remembered, and when this element is subsequently selected, it returns to the previous state (checked true/false);
7. Switching all checkbox elements in the list of elements to the state checked true/false when switching the main checkbox for the entire car body;
8. Monitoring the main checkbox for the switching state of the remaining checkboxes (if all are selected, it automatically switches to the checked state, if not all are selected, it automatically switches to the state checked = false;
9. Highlighting elements of the parts list when hovering over the corresponding part of the SVG image (car body part);
10. Select all parts by clicking on the “Select entire body” button;
11. Clear all parts and reset selected values when you click on the reset button;
12. Counter of selected parts with variable word ending;
13. A popup prompting you to sign up for checkup in service when the user is inside the block with a calculator for a specified time (10 sec in this example). If he leaves the block before the popup timer expires, the timer is canceled and the popup is not shown.
