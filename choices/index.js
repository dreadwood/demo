/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
'use strict';

const data = [
  {
    name: 'Цвета',
    keywords: ['color', 'wdtnf', 'цвета', 'сщдщк'],
    value: [
      'Красный',
      'Зеленый',
      'Оранжевый',
      'Синий',
      'Пурпурный',
    ],
  },
  {
    name: 'Фигуры',
    keywords: ['фигуры', 'геометрия', 'abuehs', 'utjvtnhbz'],
    value: [
      'Квадрат',
      'Треугольник',
      'Круг',
      'Овал',
    ],
  },
  {
    name: 'Геометрия',
    keywords: ['геометрия', 'utjvtnhbz'],
    value: [
      'Косинус',
      'Синус',
      'Тангенс',
    ],
  },
];

const dataChoices = getChoices(data);

const element = document.querySelector('#select-custom');
const choices = new Choices(element, {
  allowHTML: true,
  placeholder: false,
  placeholderValue: 'Необходимо выбрать значение',
  searchPlaceholderValue: 'Что ищем?',
  searchResultLimit: 5,
  position: 'bottom',
  itemSelectText: 'Выбери меня',
  shouldSort: false, // сортировка
  noResultsText: 'К сожалению, с вашим запросом что-то не то.',
  // fuseOptions: { // точность поиска
  //   includeScore: false,
  // },
  searchFields: ['label', 'value', 'customProperties.keywords'],
  choices: dataChoices,
  classNames: {
    containerInner: 'field',
    listSingle: null,
    listDropdown: 'dropdown',
  },
});

// const form = document.querySelector('.form');
// const result = document.querySelector('.result');
// const resultOutput = result.querySelector('pre');
// form.addEventListener('submit', (evt) => {
//   evt.preventDefault();

//   result.removeAttribute('hidden');
//   resultOutput.innerHTML = JSON.stringify(collectData(form), null, 2);

// });

function getChoices(valueData) {
  return valueData.flatMap((item) => item.value.map((it) => ({
    value: it.toLowerCase(),
    label: it,
    customProperties: {
      keywords: item.keywords.join(' '),
    },
  })));
}

function collectData(formobj) {
  const jsonObject = {};
  for (let field of formobj.elements) {
    const n = field.name;
    if (n) {
      if (field.type === 'checkbox' || field.type === 'radio') {
        if (field.checked) {
          if (n.startsWith('jsarray_')) {
            jsonObject[n] = jsonObject[n] === null ? [field.value] : [...jsonObject[n], field.value];
          } else {
            jsonObject[n] = field.value;
          }
        }
      } else {
        jsonObject[n] = field.value;
      }
    }
  }
  return jsonObject;
}
