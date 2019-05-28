let money = prompt("Ваш бюджет на месяц?", ''),
    time = prompt('Введите дату в формате YYYY-MM-DD', '');

let appData = {
    budget : money,
    expenses : {},
    optionalExpenses : {},
    timeData : time,
    income : [],
    savings : false,
};

for (let i=0; i<2; i++ ){
    let a = prompt ("Введите обязательную статью расходов в этом месяце", ""),
        b = prompt ("Во сколько обойдется?", "");

    //прописываем условия ввода пользователю
    if ( typeof(a)==='string' && typeof(a) != null && typeof(b) != null
        && a != "" && b != "" && a.length < 50) {

        console.log("done");

        appData.expenses[a] = b;
    }else {
        console.log("not correctly input")
        i--;
    }
};




appData.moneyPerDay = appData.budget/30;


alert ("Бюджет на 1 день составляет " + appData.moneyPerDay + "руб.");