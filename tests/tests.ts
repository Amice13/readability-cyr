import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import textScore from '../src/index.ts'

const enText = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus maximus tortor in molestie facilisis. Sed ut lacus augue. Suspendisse ac bibendum ipsum. Nam dignissim consectetur velit, eu mollis elit aliquam porta. Praesent augue ligula, feugiat ac convallis vitae, scelerisque at sem. Nam nec pretium magna. Morbi rutrum lacinia nisl, non aliquet ante maximus ac. Nulla sit amet egestas lectus, sed iaculis nibh. Pellentesque a metus leo. Suspendisse potenti.
Sed imperdiet rhoncus dui, eget aliquet metus porttitor at. Integer sodales pretium imperdiet. Aliquam dignissim condimentum mauris sed euismod. Nunc vel justo nec lacus eleifend gravida nec vitae ligula. Maecenas viverra ligula et arcu tempor mattis. Morbi in enim orci. Aliquam sed purus posuere, tincidunt erat eleifend, commodo odio. Cras ac pellentesque diam, vitae maximus nisl. Mauris porttitor, dolor tempus ornare placerat, nulla dui vehicula magna, id iaculis purus ante eget tellus. Pellentesque pellentesque orci justo, ac fermentum sem cursus a.
`

const uaText = `
К. прибув пізнього вечора. Село загрузло в глибокому снігу. Замкової гори не було видно, її поглинули туман і темрява, жоден, навіть слабенький, промінчик світла не виказував існування великого Замку. К. довго стояв на дерев'яному містку, який з'єднував гостинець із Селом, і вдивлявся в те, що здавалося порожнечею.
Потім він вирушив шукати місце для ночівлі. У заїзді ще не спали, і хоча в господаря, розгубленого несподіваним пізнім візитом, не виявилося для гостя вільної кімнати, він запропонував К. нічліг на солом'яній підстилці в загальному залі. К. погодився. Кілька селян ще сиділи за пивом, але прибулий не хотів ні з ким спілкуватися, тому приніс собі солом'яну підстилку з горища і влігся поближче до печі. Було тепло, селяни сиділи тихо, він ще трохи спостерігав за ними втомленим поглядом, а далі заснув.
`

describe('Testing generic functions', () => {
  it('Sentence length (en)', () => {
    assert.strictEqual(textScore.length(enText), 1025)
  })
  it('Sentence length', () => {
    assert.strictEqual(textScore.length(uaText), 821)
  })
  it('Spaces count (en)', () => {
    assert.strictEqual(textScore.spacesCount(enText), 147)
  })
  it('Spaces count', () => {
    assert.strictEqual(textScore.spacesCount(uaText), 125)
  })
  it('Letter count', () => {
    assert.strictEqual(textScore.letterCount(enText), 840)
  })
  it('Letter count', () => {
    assert.strictEqual(textScore.letterCount(uaText), 660)
  })
  it('Digit count', () => {
    assert.strictEqual(textScore.digitCount(enText), 0)
  })
  it('Digit count', () => {
    assert.strictEqual(textScore.digitCount(uaText), 0)
  })
  it('Period count', () => {
    assert.strictEqual(textScore.periodCount(enText), 21)
  })
  it('Period count', () => {
    assert.strictEqual(textScore.periodCount(uaText), 13)
  })
  it('questionCount count', () => {
    assert.strictEqual(textScore.questionCount(enText), 0)
  })
  it('questionCount count', () => {
    assert.strictEqual(textScore.questionCount(uaText), 0)
  })
  it('Get words array', () => {
    if (!Array.isArray(textScore.getWords(enText))) {
      assert.fail(new TypeError('Result is not an array'))
    }
    assert.strictEqual(textScore.getWords(enText).length, 149)
  })
  it('Get words array', () => {
    if (!Array.isArray(textScore.getWords(uaText))) {
      assert.fail(new TypeError('Result is not an array'))
    }
    assert.strictEqual(textScore.getWords(uaText).length, 127)
  })
  it('Word count', () => {
    assert.strictEqual(textScore.wordCount(enText), 149)
  })
  it('Word count', () => {
    assert.strictEqual(textScore.wordCount(uaText), 127)
  })
  it('Average word length', () => {
    assert.strictEqual(Math.round(textScore.averageWordLength(enText)), 6)
  })
  it('Average word length', () => {
    assert.strictEqual(Math.round(textScore.averageWordLength(uaText)), 5)
  })
  it('Unique word count (en)', () => {
    assert.strictEqual(textScore.uniqueWordCount(enText), 95)
  })
  it('Unique word count', () => {
    assert.strictEqual(textScore.uniqueWordCount(uaText), 104)
  })
  it('Text-Type Ratio', () => {
    assert.strictEqual(Math.round(textScore.lexicalDiversity(enText) * 100), 64)
  })
  it('Text-Type Ratio', () => {
    assert.strictEqual(Math.round(textScore.lexicalDiversity(uaText) * 100), 82)
  })
  it('Text-Type Ratio - Herdan\'s C', () => {
    assert.strictEqual(Math.round(textScore.lexicalDiversity(enText, 'herdan') * 100), 91)
  })
  it('Text-Type Ratio - Herdan\'s C', () => {
    assert.strictEqual(Math.round(textScore.lexicalDiversity(uaText, 'herdan') * 100), 96)
  })
  it('Guiraud\'s Root Text-Type Ratio', () => {
    assert.strictEqual(Math.round(textScore.lexicalDiversity(enText, 'guiraud') * 100), 778)
  })
  it('Guiraud\'s Root Text-Type Ratio', () => {
    assert.strictEqual(Math.round(textScore.lexicalDiversity(uaText, 'guiraud') * 100), 923)
  })
  it('Carroll\'s Corrected Text-Type Ratio', () => {
    assert.strictEqual(Math.round(textScore.lexicalDiversity(enText, 'carroll') * 100), 550)
  })
  it('Carroll\'s Corrected Text-Type Ratio', () => {
    assert.strictEqual(Math.round(textScore.lexicalDiversity(uaText, 'carroll') * 100), 653)
  })
  it('Text-Type Ratio - Dugast\'s Uber Index', () => {
    assert.strictEqual(Math.round(textScore.lexicalDiversity(enText, 'dugast')), 24)
  })
  it('Text-Type Ratio - Dugast\'s Uber Index', () => {
    assert.strictEqual(Math.round(textScore.lexicalDiversity(uaText, 'dugast')), 51)
  })
  it('Text-Type Ratio - Summer\'s index', () => {
    assert.strictEqual(Math.round(textScore.lexicalDiversity(enText, 'summer') * 100), 88)
  })
  it('Text-Type Ratio - Summer\'s index', () => {
    assert.strictEqual(Math.round(textScore.lexicalDiversity(uaText, 'summer') * 100), 94)
  })
  it('Text syllable count', () => {
    assert.strictEqual(textScore.syllableCount(uaText), 239)
  })
  it('Difficult words', () => {
    if (!Array.isArray(textScore.getDifficultWords(uaText))) {
      assert.fail(new TypeError('Result is not an array'))
    }
    assert.strictEqual(textScore.getDifficultWords(uaText).length, 34)
  })
  it('Difficult words count', () => {
    assert.strictEqual(textScore.difficultWordsCount(uaText), 34)
  })
  it('Average syllables per word', () => {
    assert.strictEqual(Math.round(textScore.averageSyllablesWord(uaText)), 2)
  })
  it('Percentage of difficult words', () => {
    assert.strictEqual(Math.round(textScore.difficultWordsPercentage(uaText)), 27)
  })
  it('Longest word by letters', () => {
    assert.strictEqual(textScore.longestWordLetters(uaText), 'спілкуватися')
  })
  it('Longest word length', () => {
    assert.strictEqual(textScore.longestWordLettersLength(uaText), 12)
  })
  it('Longest word by syllables', () => {
    assert.strictEqual(textScore.longestWordSyllables(uaText), 'виявилося')
  })
  it('Longest word by syllables length', () => {
    assert.strictEqual(textScore.longestWordSyllablesLength(uaText), 5)
  })
  it('Get sentences array', () => {
    if (!Array.isArray(textScore.getSentences(uaText))) {
      assert.fail(new TypeError('Result is not an array'))
    }
    assert.strictEqual(textScore.getSentences(uaText).length, 9)
  })
  it('Sentence count', () => {
    assert.strictEqual(textScore.sentenceCount(uaText), 9)
  })
  it('Short sentence count', () => {
    assert.strictEqual(textScore.shortSentenceCount(uaText), 6)
  })
  it('Long sentence count', () => {
    assert.strictEqual(textScore.longSentenceCount(uaText), 0)
  })
  it('Shortest sentence', () => {
    assert.strictEqual(textScore.shortestSentence(uaText), 'К. погодився')
  })
  it('Shortest sentence length', () => {
    assert.strictEqual(textScore.shortestSentenceLength(uaText), 12)
  })
  it('Shortest sentence syllable count', () => {
    assert.strictEqual(textScore.shortestSentenceSyllableCount(uaText), 4)
  })
  it('Shortest sentence word count', () => {
    assert.strictEqual(textScore.shortestSentenceWordCount(uaText), 2)
  })
  it('Longest sentence', () => {
    assert.strictEqual(textScore.longestSentence(uaText), 'У заїзді ще не спали, і хоча в господаря, розгубленого несподіваним пізнім візитом, не виявилося для гостя вільної кімнати, він запропонував К. нічліг на солом\'яній підстилці в загальному залі')
  })
  it('Longest sentence length', () => {
    assert.strictEqual(textScore.longestSentenceLength(uaText), 192)
  })
  it('Longest sentence syllable count', () => {
    assert.strictEqual(textScore.longestSentenceSyllableCount(uaText), 55)
  })
  it('Longest sentence word count', () => {
    assert.strictEqual(textScore.longestSentenceWordLength(uaText), 29)
  })
  it('Average sentence length', () => {
    assert.strictEqual(Math.round(textScore.averageSentenceLength(uaText)), 14)
  })
  it('Average syllables per sentence', () => {
    assert.strictEqual(Math.round(textScore.averageSentenceSyllable(uaText)), 27)
  })
  it('Average words per sentence', () => {
    assert.strictEqual(Math.round(textScore.averageSentenceWords(uaText)), 14)
  })
  it('Get paragraphs array', () => {
    if (!Array.isArray(textScore.getParapgraphs(uaText))) {
      assert.fail(new TypeError('Result is not an array'))
    }
    assert.strictEqual(textScore.getParapgraphs(uaText).length, 2)
  })
  it('Paragraphs count', () => {
    assert.strictEqual(textScore.paragraphCount(uaText), 2)
  })
  it('Average number of words in paragraphs', () => {
    assert.strictEqual(textScore.averageParagraphWords(uaText), 63.5)
  })
  it('Average number of sentences in paragraphs', () => {
    assert.strictEqual(textScore.averageParagraphSentences(uaText), 5)
  })
  it('Gunning Fog Score', () => {
    assert.strictEqual(Math.round(textScore.scoreGunningFog(enText)), 20)
  })
  it('Gunning Fog Score', () => {
    assert.strictEqual(Math.round(textScore.scoreGunningFog(uaText)), 16)
  })
  it('The Powers-Sumner-Kearl Variation of Gunning\'s Fog Index', () => {
    assert.strictEqual(Math.round(textScore.scoreGunningFogPSK(enText)), 6)
  })
  it('The Powers-Sumner-Kearl Variation of Gunning\'s Fog Index', () => {
    assert.strictEqual(Math.round(textScore.scoreGunningFogPSK(uaText)), 6)
  })
  it('Flesch Kincaid Reading Grade', () => {
    assert.strictEqual(Math.round(textScore.scoreFleschKincaidGrade(enText)), 16)
  })
  it('Flesch Kincaid Reading Grade', () => {
    assert.strictEqual(Math.round(textScore.scoreFleschKincaidGrade(uaText)), 12)
  })
  it('Flesch Kincaid Reading Ease', () => {
    assert.strictEqual(Math.round(textScore.scoreFleschKincaidEase(enText)), -8)
  })
  it('Flesch Kincaid Reading Ease', () => {
    assert.strictEqual(Math.round(textScore.scoreFleschKincaidEase(uaText)), 33)
  })
  it('Farr-Jenkins-Paterson\'s Simplification of Flesch\'s Reading Ease Score', () => {
    assert.strictEqual(Math.round(textScore.scoreFJPS(enText)), -38)
  })
  it('Farr-Jenkins-Paterson\'s Simplification of Flesch\'s Reading Ease Score', () => {
    assert.strictEqual(Math.round(textScore.scoreFJPS(uaText)), -45)
  })
  it('The Powers-Sumner-Kearl\'s Variation of Flesch Reading Ease Score', () => {
    assert.strictEqual(Math.round(textScore.scoreFleschPSK(enText)), 14)
  })
  it('The Powers-Sumner-Kearl\'s Variation of Flesch Reading Ease Score', () => {
    assert.strictEqual(Math.round(textScore.scoreFleschPSK(uaText)), 17)
  })
  it('SMOG Index', () => {
    assert.strictEqual(Math.round(textScore.scoreSMOG(enText)), 12)
  })
  it('SMOG Index', () => {
    assert.strictEqual(Math.round(textScore.scoreSMOG(uaText)), 15)
  })
  it('Simplified Version of McLaughlin\'s (1969) SMOG Measure', () => {
    assert.strictEqual(Math.round(textScore.scoreSMOGSimple(enText)), 10)
  })
  it('Simplified Version of McLaughlin\'s (1969) SMOG Measure', () => {
    assert.strictEqual(Math.round(textScore.scoreSMOGSimple(uaText)), 9)
  })
  it('Automated Readability Index Simple', () => {
    assert.strictEqual(Math.round(textScore.scoreARISimple(enText)), 58)
  })
  it('Automated Readability Index Simple', () => {
    assert.strictEqual(Math.round(textScore.scoreARISimple(uaText)), 61)
  })
  it('Automated Readability Index', () => {
    assert.strictEqual(Math.round(textScore.scoreARI(enText)), 9)
  })
  it('Automated Readability Index', () => {
    assert.strictEqual(Math.round(textScore.scoreARI(uaText)), 10)
  })
  it('Coleman\'s (1971) Readability Formula 1', () => {
    assert.strictEqual(Math.round(textScore.scoreColeman(enText)), -8)
  })
  it('Coleman\'s (1971) Readability Formula 1', () => {
    assert.strictEqual(Math.round(textScore.scoreColeman(uaText)), -3)
  })
  it('Coleman\'s (1971) Readability Formula 2', () => {
    assert.strictEqual(Math.round(textScore.scoreColeman2(enText)), 31)
  })
  it('Coleman\'s (1971) Readability Formula 2', () => {
    assert.strictEqual(Math.round(textScore.scoreColeman2(uaText)), 41)
  })
  it('Coleman-Liau Estimated Cloze Percent', () => {
    assert.strictEqual(Math.round(textScore.scoreColemanLiauECP(enText)), 36)
  })
  it('Coleman-Liau Estimated Cloze Percent', () => {
    assert.strictEqual(Math.round(textScore.scoreColemanLiauECP(uaText)), 37)
  })
  it('Coleman-Liau Grade Level (Coleman and Liau 1975)', () => {
    assert.strictEqual(Math.round(textScore.scoreColemanLiauGL(enText)), 13)
  })
  it('Coleman-Liau Grade Level (Coleman and Liau 1975)', () => {
    assert.strictEqual(Math.round(textScore.scoreColemanLiauGL(uaText)), 13)
  })
  it('Coleman Liau Index', () => {
    assert.strictEqual(Math.round(textScore.scoreColemanLiau(enText)), 18)
  })
  it('Coleman Liau Index', () => {
    assert.strictEqual(Math.round(textScore.scoreColemanLiau(uaText)), 15)
  })
  it('Dale-Chall Readability Score', () => {
    assert.strictEqual(Math.round(textScore.scoreDaleChall(enText)), 18)
  })
  it('Dale-Chall Readability Score', () => {
    assert.strictEqual(Math.round(textScore.scoreDaleChall(uaText)), 29)
  })
  it('Dale-Chall Readability Score', () => {
    assert.strictEqual(Math.round(textScore.scoreDaleChallOld(enText)), 11)
  })
  it('Dale-Chall Readability Score', () => {
    assert.strictEqual(Math.round(textScore.scoreDaleChallOld(uaText)), 9)
  })
  it('Spache Readability Score', () => {
    assert.strictEqual(Math.round(textScore.scoreSpache(uaText)), 5)
  })
  it('Spache Readability Score', () => {
    assert.strictEqual(Math.round(textScore.scoreSpache(uaText)), 5)
  })
  it('Linsear-Write formula', () => {
    assert.strictEqual(textScore.scoreLinsearWrite(enText).toFixed(2), '11.43')
  })
  it('Linsear-Write formula', () => {
    assert.strictEqual(textScore.scoreLinsearWrite(uaText).toFixed(2), '10.00')
  })
  it('The Power-Sumner-Kearl Readability Formula Grade Level', () => {
    assert.strictEqual(textScore.scorePowerSumnerKearlGrade(enText).toFixed(2), '-0.59')
  })
  it('The Power-Sumner-Kearl Readability Formula Grade Level', () => {
    assert.strictEqual(textScore.scorePowerSumnerKearlGrade(uaText).toFixed(2), '-0.49')
  })
  it('The Power-Sumner-Kearl Readability Formula Reading Age', () => {
    assert.strictEqual(textScore.scorePowerSumnerKearlRA(enText).toFixed(2), '4.41')
  })
  it('The Power-Sumner-Kearl Readability Formula Reading Age', () => {
    assert.strictEqual(textScore.scorePowerSumnerKearlRA(uaText).toFixed(2), '4.51')
  })
  it('FORCAST Readability Formula Grade Level', () => {
    assert.strictEqual(Math.round(textScore.scoreForcastGL(enText)), 16)
  })
  it('FORCAST Readability Formula Grade Level', () => {
    assert.strictEqual(Math.round(textScore.scoreForcastGL(uaText)), 17)
  })
  it('LIX readability test', () => {
    assert.strictEqual(Math.round(textScore.scoreLIX(enText)), 43)
  })
  it('LIX readability test', () => {
    assert.strictEqual(Math.round(textScore.scoreLIX(uaText)), 40)
  })
  it('RIX Anderson\'s (1983) Readability Index', () => {
    assert.strictEqual(Math.round(textScore.scoreRIX(enText)), 3)
  })
  it('RIX Anderson\'s (1983) Readability Index', () => {
    assert.strictEqual(Math.round(textScore.scoreRIX(uaText)), 4)
  })
  it('Danielson-Bryan\'s (1963) Readability Measure 1', () => {
    assert.strictEqual(Math.round(textScore.scoreDanielsonBryan(enText)), 6)
  })
  it('Danielson-Bryan\'s (1963) Readability Measure 1', () => {
    assert.strictEqual(Math.round(textScore.scoreDanielsonBryan(uaText)), 6)
  })
  it('Danielson-Bryan\'s (1963) Readability Measure 2', () => {
    assert.strictEqual(Math.round(textScore.scoreDanielsonBryan2(enText)), 73)
  })
  it('Danielson-Bryan\'s (1963) Readability Measure 2', () => {
    assert.strictEqual(Math.round(textScore.scoreDanielsonBryan2(uaText)), 78)
  })
  it('Dickes-Steiwer Index', () => {
    assert.strictEqual(Math.round(textScore.scoreDickesSteiwer(enText)), -297)
  })
  it('Dickes-Steiwer Index', () => {
    assert.strictEqual(Math.round(textScore.scoreDickesSteiwer(uaText)), -364)
  })
  it('Easy Listening Formula', () => {
    assert.strictEqual(Math.round(textScore.scoreELF(enText)), 5)
  })
  it('Easy Listening Formula', () => {
    assert.strictEqual(Math.round(textScore.scoreELF(uaText)), 9)
  })
  it('Fucks\' Style Characteristic', () => {
    assert.strictEqual(Math.round(textScore.scoreFSC(enText)), 40)
  })
  it('Fucks\' Style Characteristic', () => {
    assert.strictEqual(Math.round(textScore.scoreFSC(uaText)), 74)
  })
  it('Strain Index', () => {
    assert.strictEqual(Math.round(textScore.scoreStrain(enText)), 5)
  })
  it('Strain Index', () => {
    assert.strictEqual(Math.round(textScore.scoreStrain(uaText)), 8)
  })
  it('Wheeler & Smith\'s (1954) Readability Measure', () => {
    assert.strictEqual(Math.round(textScore.scoreWheelerSmith(enText)), 54)
  })
  it('Wheeler & Smith\'s (1954) Readability Measure', () => {
    assert.strictEqual(Math.round(textScore.scoreWheelerSmith(uaText)), 86)
  })
  it('Reading Time', () => {
    assert.strictEqual(textScore.readingTime(uaText), '00:00:38')
  })
  it('Speaking Time', () => {
    assert.strictEqual(textScore.speakingTime(uaText), '00:00:47')
  })
})
