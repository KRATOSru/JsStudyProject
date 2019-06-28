
'use strict';

//  Получаем все блоки в правой части программы через классы
//  (которые имеют класс название-value,
//  начиная с <div class="budget-value"></div> и заканчивая <div class="yearsavings-value"></div>)

let startBtn = document.getElementById("start"),//кнопка начать расчет
    budgetValue = document.getElementsByClassName('budget-value')[0],
    dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
    optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],


    //Получаем поля(input) c обязательными расходами через класс. (class=”expenses-item”)
    expensesItem = document.getElementsByClassName('expenses-item'),

    //  Получаем кнопки “Утвердить” и “Рассчитать” через Tag, каждую в своей переменной.
    expensesBtn = document.getElementsByTagName('button')[0],
    optionalExpensesBtn = document.getElementsByTagName('button')[1],
    countBtn = document.getElementsByTagName('button')[2],

    // Получаем поля для ввода необязательных расходов (optionalexpenses-item) при помощи querySelectorAll
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),

    //Получить оставшиеся поля через querySelector (статьи возможного дохода,сумма, процент, год, месяц, день)
    incomeItem = document.querySelector('.choose-income'),
    checkSavings = document.querySelector('#savings'),
    sumValue = document.querySelector('.choose-sum'),
    percentValue = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');

let money, time;

startBtn.addEventListener('click', function () {
    time = prompt('Введите дату в формате YYYY-MM-DD', '');
    money = +prompt("Ваш бюджет на месяц?", '');

    //isNaN возвращает tru если не цифры
    while (isNaN(money) || money == "" || money == null) {
        money = +prompt("Ваш бюджет на месяц?", '');
    }
    appData.budget = money;//зафиксировали бюджет, который указал пол-ль в наш обЪекте
    appData.timeData = time;//тоже самое со временем
    budgetValue.textContent = money.toFixed();//полученные данные записываем в строку Доход
    //если есть input в html коде, то работаем с value а не с textContent
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();
});

expensesBtn.addEventListener('click', function () {
    //получаем сумму всех ценников
    let sum = 0;

    for (let i = 0; i < expensesItem.length; i++) {
        let a = expensesItem[i].value,
            b = expensesItem[++i].value;

        //прописываем условия ввода пользователю
        if (typeof (a) === 'string' && typeof (a) != null && typeof (b) != null && a != "" && b != "" && a.length < 50) {
            appData.expenses[a] = b;
            sum += +b;
        } else {
            i--;
        }
    }
    expensesValue.textContent = sum;
});

optionalExpensesBtn.addEventListener('click', function () {
    for (let i = 0; i <= optionalExpensesItem.length; i++) {
        let opt = optionalExpensesItem[i].value;
        appData.optionalExpenses[i] = opt;//все что записали в обЪект
        optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';//перейдет и на страницу
    }
});

let appData;
appData = {
    budget: money,
    expenses: {},
    optionalExpenses: {},
    timeData: time,
    income: [],
    savings: true,
    // chooseExpense: function () { // фун-я выбора обязательных расходов
    //
    // },
    detectDayBudget: function () {   //Расчет дневного бюджета
        appData.moneyPerDay = (appData.budget / 30).toFixed();//округляем до целых
        alert("Бюджет на 1 день составляет " + appData.moneyPerDay + "руб.");
    },
    detectLevel: function () {     //Расчет уровня достатка
        if (appData.moneyPerDay < 100) {
            console.log("It's a minimal profit");
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 1000) {
            console.log("It's a normal profit");
        } else if (appData.moneyPerDay > 1000) {
            console.log("It's a hight profit");
        } else {
            console.log("It's finance error");
        }
    },
    checkSavings: function () {  //фун-я, которая рассчитывает накопления с депозита если он есть
        /* проверяем условие есть ли сбережения и узнаем сумму накоплений и под какой%
         после получения этих данных рассчитываем сколько человек сможет заработать*/
        if (appData.savings == true) {
            let save = +prompt("Какая сумма сбережений?"),// + для того чтобы получить цифр знач-е
                percent = +prompt("Какой % ?");

            appData.monthProfit = save / 100 / 12 * percent;// заменена appData.monthIncome
            alert("Доход за месяц с вашего депозита : " + appData.monthProfit);
        }
    },
    // chooseOptExpenses: function () {   //Фун-я для определения необязательных расходов
    //
    // },
    chooseIncome: function () {   // фун-я дополнительного дохода

        //спрашиваем у пользователя, что принесет дополнительный доход
        let items = prompt('Что принесет доп profit? (ПЕречислите через запятую)', "");
        //строку данные переводим в массив  команда split

        if (typeof (items) != "string" || items == "" || typeof (items) == null) {
            console.log("Вы ввели некорректные данные или не ввели их вовсе");
        } else {
            appData.income = items.split(', ');
            //добавляем в конец массива с помощью push
            appData.income.push(prompt('Может что-то еще добавить?'));
            //отсортируем по алфавиту
            appData.income.sort();
        }

        appData.income.forEach(function (itemmassive, i) {
            alert("Способы допополнительного заработка: " + (i + 1) + " - " + itemmassive);

        })
    }
};

for (let key in appData) {
    console.log("Наша программа включает в себя данные: " + key + " - " + appData[key]);
}
