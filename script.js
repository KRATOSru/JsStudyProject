
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


countBtn.addEventListener('click', function () {
    if (appData.budget != undefined){
        //определяем бюджет на день и записываем его в глобальный обЬект
        appData.moneyPerDay = (appData.budget / 30).toFixed();//округляем до целых
        dayBudgetValue.textContent = appData.moneyPerDay;//выводим его на страницу

        if (appData.moneyPerDay < 100) { //расчет ур-ня достатка
            levelValue.textContent = 'Its a minimal profit';
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 1000) {
            levelValue.textContent = 'Its a normal profit';
        } else if (appData.moneyPerDay > 1000) {
            levelValue.textContent = 'Its a hight profit';
        } else {
            levelValue.textContent = 'Its finance error';
        }
    } else {
        dayBudgetValue.textContent = 'An error has occurred';
    }
});


incomeItem.addEventListener('input', function () {  //дополнительный доход
    let items = incomeItem.value;
    appData.income = items.split(', ');//записываем в виде массива через ,
    incomeValue.textContent = appData.income; //чтобы значения появлялись  сразу при вводе в поле доп-е доходы
});

                    //checkbox
checkSavings.addEventListener('click', function () {
    //если app.Data true то выключаем его false
    if (appData.savings == true){
        appData.savings = false;
    }else { // или кликаем его еще раз и включаем
        appData.savings = true;
    }
});


sumValue.addEventListener('input', function () {
    if (appData.savings == true){
        //то что пол-ль вводит в поле сумма то запис-ся в переменную sum
        let sum = +sumValue.value,
            percent = +percentValue.value;//аналогично с процентами

        appData.monthProfit = sum / 100 / 12 * percent;//месяц
        appData.yearProfit = sum / 100 * percent;//год

        //выводим на экран
        monthSavingsValue.textContent = appData.monthProfit.toFixed(1);//округляем
        yearSavingsValue.textContent = appData.yearProfit.toFixed(1);//округляем
    }
});


percentValue.addEventListener('input', function () {
    if (appData.savings == true){
            let sum = +sumValue.value,
                percent = +percentValue.value;//аналогично с процентами

            appData.monthProfit = sum / 100 / 12 * percent;//месяц
            appData.yearProfit = sum / 100 * percent;//год

            //выводим на экран
            monthSavingsValue.textContent = appData.monthProfit.toFixed(1);//округляем
            yearSavingsValue.textContent = appData.yearProfit.toFixed(1);//округляем
        }
});


let appData;
appData = {
    budget: money,
    expenses: {},
    optionalExpenses: {},
    timeData: time,
    income: [],
    savings: false,
};

