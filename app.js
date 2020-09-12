const fileSystem = require('fs');
const items = [
    '🍇 Grapes',
    '🍈 Melon',
    '🍉 Watermelon',
    '🍊 Tangerine',
    '🍋 Lemon',
    '🍌 Banana',
    '🍍 Pineapple',
    '🥭 Mango',
    '🍎 Red Apple',
    '🍏 Green Apple',
    '🍐 Pear',
    '🍑 Peach',
    '🍒 Cherries',
    '🍓 Strawberry',
    '🥝 Kiwi Fruit',
    '🍅 Tomato',
    '🥥 Coconut',
    '🥑 Avocado',
    '🍆 Eggplant',
    '🥔 Potato',
    '🥕 Carrot',
    '🌽 Corn',
    '🌶 Hot Pepper',
    '🥒 Cucumber',
    '🥬 Leafy Green',
    '🥦 Broccoli',
    '🧄 Garlic',
    '🧅 Onion',
    '🍄 Mushroom',
    '🥜 Peanuts',
    '🍞 Bread',
    '🥐 Croissant',
    '🥖 Baguette Bread',
    '🥨 Pretzel',
    '🥯 Bagel',
    '🥞 Pancakes',
    '🧇 Waffle',
    '🧀 Cheese',
    '🍖 Meat',
    '🍗 Chicken Leg',
    '🥩 Meat',
    '🥓 Bacon',
    '🍔 Hamburger',
    '🍟 French Fries',
    '🍕 Pizza',
    '🌭 Hot Dog',
    '🥪 Sandwich',
    '🌮 Taco',
    '🌯 Burrito',
    '🥚 Egg',
    '🍿 Popcorn',
    '🧈 Butter',
    '🧂 Salt',
    '🍚 Rice',
    '🍝 Spaghetti',
    '🍢 Oden',
    '🍣 Sushi',
    '🍤 Shrimp',
    '🥠 Fortune Cookie',
    '🍦 Ice Cream',
    '🍧 Shaved Ice',
    '🍨 Ice Cream',
    '🍩 Doughnut',
    '🍪 Cookie',
    '🎂 Birthday Cake',
    '🧁 Cupcake',
    '🥧 Pie',
    '🍫 Chocolate Bar',
    '🍬 Candy',
    '🍭 Lollipop',
    '🌡 Thermometer',
    '⛱ Umbrella',
    '🧨 Firecracker',
    '🎈 Balloon',
    '🎉 Party',
    '🐒 Monkey',
    '🦍 Gorilla',
    '🐕 Dog',
    '🐺 Wolf',
    '🦊 Fox',
    '🦝 Raccoon',
    '🐈 Cat',
    '🦁 Lion',
    '🦃 Turkey',
    '🐔 Chicken',
    '🐓 Rooster',
    '🐣 Chick',
    '🐊 Crocodile',
    '🐢 Turtle',
    '🦎 Lizard',
    '🐍 Snake',
    '🌹 Rose',
    '🥀 Wilted Flower',
    '🌻 Sunflower',
    '🌲 Tree',
    '🌳 Tree',
    '🌴 Palm Tree',
    '🌵 Cactus',
    '🌧 Cloud with Rain',
    '🔥 Fire',
    '💧 Droplet',
    '🔑 Key'
];

const questions = [];
const generateQuestions = () => {

    for (let index = 0; index < items.length; index++) {

        const shuffled = items
        .sort(() => 0.4 - Math.random())
        .slice(0, 4);

        const emoji = shuffled[0].replace(shuffled[0].substring(3), '');
        const word = shuffled[0].substring(3);

        questions.push({
            question: `${emoji}${emoji}${emoji}${emoji}`,
            correct_answer: word,
            incorrect_answers: [
                shuffled[1].substring(3),
                shuffled[2].substring(3),
                // shuffled[3].substring(3),
            ]
        });
    }
}

generateQuestions();

fileSystem.writeFile("questions.json", JSON.stringify(questions), function(err, result) {
    if(err) console.log('error', err);
});
