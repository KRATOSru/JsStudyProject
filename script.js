
'use strict';


let money, time;

function start() {
    money = +prompt("Ваш бюджет на месяц?", '');
    time = prompt('Введите дату в формате YYYY-MM-DD', '');

    //isNaN возвращает tru если не цифры
    while (isNaN(money) || money == "" || money == null) {
        money = +prompt("Ваш бюджет на месяц?", '');
    }
}
start();


let appData = {
    budget: money,
    expenses: {},
    optionalExpenses: {},
    timeData: time,
    income: [],
    savings: true,
};


// фун-я выбора обязательных расходов
function chooseExpense(){
    for (let i = 0; i < 2; i++) {
        let a = prompt ("Введите обязательную статью расходов в этом месяце", ""),
            b = prompt ("Во сколько обойдется?", "");

        //прописываем условия ввода пользователю
        if ( typeof(a)==='string' && typeof(a) != null && typeof(b) != null && a != "" && b != "" && a.length < 50) {
            appData.expenses[a] = b;
        } else {
            i--;
        }
    };
}
chooseExpense();


     //Расчет дневного бюджета
function detectDayBudget(){
    appData.moneyPerDay = (appData.budget/30).toFixed();//округляем до целых
    alert ("Бюджет на 1 день составляет " + appData.moneyPerDay + "руб.");
}
detectDayBudget();


        //Расчет уровня достатка
function detectLevel() {
    if (appData.moneyPerDay < 100){
        console.log("It's a minimal profit");
    }else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 1000){
        console.log("It's a normal profit");
    }else if (appData.moneyPerDay > 1000){
        console.log("It's a hight profit");
    }else {
        console.log("It's finance error");
   }
}
detectLevel();


//фун-я, которая рассчитывает накопления с депозита если он есть
function checkSavings() {
   /* проверяем условие есть ли сбережения и узнаем сумму накоплений и под какой%
     после получения этих данных рассчитываем сколько человек сможет заработать*/
   if (appData.savings == true){
       let save = +prompt("Какая сумма сбережений?"),// + для того чтобы получить цифр знач-е
           percent = +prompt("Какой % ?");

       appData.monthProfit = save/100/12*percent;
       alert("Доход за месяц с вашего депозита : " + appData.monthProfit);
    }
}
checkSavings();


       //Фун-я для определения необязательных расходов
function chooseOptExpenses() {
    for (let i=1; i<=3; i++) {
        let questionOptExpenses = prompt("Статья необязательных расходов ?");
        appData.optionalExpenses[i] = questionOptExpenses;//ответ в объект записываем в формате номер[i] - Ответ
        console.log(appData.optionalExpenses);
    }
}
chooseOptExpenses();
