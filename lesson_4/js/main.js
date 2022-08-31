
const text = "One: 'Hi Mary.' Two: 'Oh, hi.' \
    One: 'How are you doing?' \
    Two: 'I'm doing alright. How about you?'\
        One: 'Not too bad. The weather is great isn't it?'\
        Two: 'Yes. It's absolutely beautiful today.'\
    One: 'I wish it was like this more frequently.'\
    Two: 'Me too.'\
    One: 'So where are you going now?'\
    Two: 'I'm going to meet a friend of mine at the department store.'\
    One: 'Going to do a little shopping?'\
    Two: 'Yeah, I have to buy some presents for my parents.'\
    One: 'What's the occasion?'\
        Two: 'It's their anniversary.'\
    One: 'That's great. Well, you better get going. You don't want to be late.'\
    Two: 'I'll see you next time.'\
    One: 'Sure. Bye.'";

document.querySelector('#original_text').innerHTML = text;


document.querySelector('#button_one').addEventListener('click', () => {
    document.querySelector('#modified_text').innerHTML = replace_one();
});

document.querySelector('#button_two').addEventListener('click', () => {
    document.querySelector('#modified_text').innerHTML = replace_two();
});

function replace_one() {
    const regExp = /'/g; // Ищет все вхождения ';
    return text.replace(regExp, '"');
}

function replace_two() {
    const regExp = /\B'/g; // Замена ' в словах, кроме НЕ границ слов, например (aren't);
    return text.replace(regExp, '"');
}

document.querySelector('.form').addEventListener('submit', e => {
    e.preventDefault();

    let flag = true;

    let name = document.querySelector('#name');
    let phone = document.querySelector('#phone');
    let mail = document.querySelector('#mail');
    let message = document.querySelector('#msg');

    // Удаляем класс красной рамки во всех input
    name.classList.remove('red_border');
    phone.classList.remove('red_border');
    mail.classList.remove('red_border');

    // Регулярные выражения
    var name_regexp = /^[a-zA-Zа-яёА-ЯЁ]+$/; // Только буквы 1 и более, без пробелов
    var mail_regexp = /^[a-zа-я0-9._-]+@[a-z0-9-_]+\.[a-z0-9-_]{2,4}/iu;
    var phone_regexp = /^\+\d\(\d{3}\)\d{3}\-\d{4}$/;


    if (!name_regexp.test(name.value)) {
        name.classList.add('red_border');
        flag = false;
    }
    if (!phone_regexp.test(phone.value)) {
        phone.classList.add('red_border');
        flag = false;
    }
    if (!mail_regexp.test(mail.value)) {
        mail.classList.add('red_border');
        flag = false;
    }

    if (flag) {
        message.innerHTML = 'ОК';
    }
    else {
        message.innerHTML = 'ERROR';
    }
})
