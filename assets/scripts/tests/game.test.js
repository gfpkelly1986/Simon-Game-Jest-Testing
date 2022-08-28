// Notice the curly braces again!
const {game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn} = require('../game');

jest.spyOn(window, 'alert').mockImplementation(() => { });

//This is the same code for all file imports needed for testing in a mock DOM.
beforeAll(() => {
    let fs = require('fs');
    let fileContents = fs.readFileSync('index.html', 'utf-8');
    document.open();
    document.write(fileContents);
    document.close();
})

describe('game object contains correct keys', () => {
    test('score key exists', () => {
        expect('score' in game).toBe(true);
    });
    test('currentGame key exists', () => {
        expect('currentGame' in game).toBe(true);
    });
    test('playerMoves key exists', () => {
        expect('playerMoves' in game).toBe(true);
    });
    test('choices key exists', () => {
        expect('choices' in game).toBe(true);
    });
    test('turnNumber key exists', () => {
        expect('turnNumber' in game).toBe(true);
    });
    test('lastButton key exists', () => {
        expect('lastButton' in game).toBe(true);
    });
    test('turnInProgress key exists', () => {
        expect('turnInProgress' in game).toBe(true);
    });
    test('turnInProgress key value is false', () => {
        expect('turnInProgress' in game).toBe(true);
    });
    test('choices contain correct ids', () => {
        expect(game.choices).toEqual(['button1', 'button2', 'button3', 'button4']);
    });
});

// New describe block to test a new object.

describe('newGame works correctly', () => {
    beforeAll(() => {
        game.score = 42;
        game.playerMoves = ['one', 'two', 'three'];
        game.currentGame = [52];
        document.getElementById('score').innerText = '42';
        newGame();
    });
    test('should set game score to zero', () => {
        expect(game.score).toEqual(0);
    });
    test('should clear the playerMoves array', () => {
        expect(game.playerMoves).toEqual([]);
    });
    test('should be one move in the computers game array', () => {
        expect(game.currentGame.length).toBe(1);
    });
    test('should clear the game score to 0 for element with id of score', () => {
        expect(document.getElementById('score').innerText).toEqual(0);
    });
    test('expect data listener to be true', () => {
        const elements = document.getElementsByClassName('circle');
        for (let element of elements) {
            expect(element.getAttribute('data-listener')).toEqual('true');
        }
    })
});

// New describe section for the gameplay

describe('gameplay works correctly', () => {
    beforeEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
        addTurn();
    });
    afterEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
    });
    test('addTurn adds a new turn to the game', () => {
        addTurn();
        expect(game.currentGame.length).toBe(2);
    });
    test('should add correct class to light up the buttons', () => {
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain('light');
    });
    test('showTurns should update game.turnNumber', () => {
        game.turnNumber = 42;
        showTurns();
        expect(game.turnNumber).toBe(0);
    });
    test('should increment the score if the turn is correct', () => {
        game.playerMoves.push(game.currentGame[0]);
        playerTurn();
        expect(game.score).toBe(1);
    });
    test('should call an alert if the move is wrong', () => {
        game.playerMoves.push('wrong');
        playerTurn();
        expect(window.alert).toBeCalledWith('Wrong move!');
    });
    test('should toggle trunInProgress to true', () => {
        showTurns();
        expect(game.turnInProgress).toBe(true);
    });
    test('clicking during computer sequence should fail', () => {
        showTurns();
        game.lastButton = '';
        document.getElementById('button2').click();
        expect(game.lastButton).toEqual('');
    })
});
