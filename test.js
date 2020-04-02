const textScore = require('./index')
const assert = require('assert').strict

const testText = `
К. прибув пізнього вечора. Село загрузло в глибокому снігу. Замкової гори не було видно, її поглинули туман і темрява, жоден, навіть слабенький, промінчик світла не виказував існування великого Замку. К. довго стояв на дерев'яному містку, який з'єднував гостинець із Селом, і вдивлявся в те, що здавалося порожнечею.
Потім він вирушив шукати місце для ночівлі. У заїзді ще не спали, і хоча в господаря, розгубленого несподіваним пізнім візитом, не виявилося для гостя вільної кімнати, він запропонував К. нічліг на солом'яній підстилці в загальному залі. К. погодився. Кілька селян ще сиділи за пивом, але прибулий не хотів ні з ким спілкуватися, тому приніс собі солом'яну підстилку з горища і влігся поближче до печі. Було тепло, селяни сиділи тихо, він ще трохи спостерігав за ними втомленим поглядом, а далі заснув.
`

describe('Testing generic functions', () => {
  it('Sentence length', () => {
    assert.strictEqual(textScore.length(testText), 821)
  })
  it('Spaces count', () => {
    assert.strictEqual(textScore.spacesCount(testText), 128)
  })
  it('Letter count', () => {
    assert.strictEqual(textScore.letterCount(testText), 660)
  })
  it('Digit count', () => {
    assert.strictEqual(textScore.digitCount(testText), 0)
  })
  it('Get words array', () => {
    if (!Array.isArray(textScore.getWords(testText))) {
      assert.fail(new TypeError('Result is not an array'))
    }
    assert.strictEqual(textScore.getWords(testText).length, 127)
  })
  it('Word count', () => {
    assert.strictEqual(textScore.wordCount(testText), 127)
  })
  it('Average word length', () => {
    assert.strictEqual(Math.round(textScore.averageWordLength(testText)), 5)
  })
  it('Text syllable count', () => {
    assert.strictEqual(textScore.syllableCount(testText), 254)
  })
  it('Difficult words', () => {
    if (!Array.isArray(textScore.getDifficultWords(testText))) {
      assert.fail(new TypeError('Result is not an array'))
    }
    assert.strictEqual(textScore.getDifficultWords(testText).length, 4)
  })
  it('Difficult words count', () => {
    assert.strictEqual(textScore.difficultWordsCount(testText), 4)
  })
  it('Average syllables per word', () => {
    assert.strictEqual(Math.round(textScore.averageSyllablesPerWord(testText)), 2)
  })
  it('Percentage of difficult words', () => {
    assert.strictEqual(Math.round(textScore.difficultWordsPercentage(testText)), 3)
  })
  it('Get sentences array', () => {
    if (!Array.isArray(textScore.getSentences(testText))) {
      assert.fail(new TypeError('Result is not an array'))
    }
    assert.strictEqual(textScore.getSentences(testText).length, 9)
  })
  it('Sentence count', () => {
    assert.strictEqual(textScore.sentenceCount(testText), 9)
  })
  it('Average sentence length', () => {
    assert.strictEqual(Math.round(textScore.averageSentenceLength(testText)), 89)
  })
  it('Average syllables per sentence', () => {
    assert.strictEqual(Math.round(textScore.averageSyllablesPerSentence(testText)), 28)
  })
  it('Average words per sentence', () => {
    assert.strictEqual(Math.round(textScore.averageWordsPerSentence(testText)), 14)
  })
  it('Gunning Fog Score', () => {
    assert.strictEqual(Math.round(textScore.scoreGunningFog(testText)), 7)
  })
  it('Flesch Kincaid Reading Grade', () => {
    assert.strictEqual(Math.round(textScore.scoreFleschKincaidGrade(testText)), 14)
  })
  it('Flesch Kincaid Reading Ease', () => {
    assert.strictEqual(Math.round(textScore.scoreFleschKincaidEase(testText)), 23)
  })
  it('SMOG Index', () => {
    assert.strictEqual(Math.round(textScore.scoreSMOG(testText)), 3)
  })
  it('Automated Readability Index', () => {
    assert.strictEqual(Math.round(textScore.scoreARI(testText)), 16)
  })
  it('Coleman Liau Index', () => {
    assert.strictEqual(Math.round(textScore.scoreColemanLiau(testText)), 20)
  })
  it('Dale-Chall Readability Score', () => {
    assert.strictEqual(Math.round(textScore.scoreDaleChall(testText)), 1)
  })
  it('Spache Readability Score', () => {
    assert.strictEqual(Math.round(textScore.scoreSpache(testText)), 12)
  })
})