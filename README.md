# readability-cyr - counts classic readability scores for cyrillic texts

## Description

This Node JS program counts different readability scores for cyryllic texts (no dependencies).

Please, note that this program **does not account** 

1) Peculiar properties of Ukrainian or Russian languages. It only counts scores in consideration of specific vowels in cyryllic languages.
2) Different word forms. It doesn't do any stemming or lemmatization, so lexical diversity and all derivatives can be overestimated.
3) Specific words. Accounting that this program is developed mainly for cyrillic texts, it does not use any vocabularies. E.g. Dale-Chall Readability Score uses the vocabulary of difficult words. This program supposes that any words with 3 or more syllables is a difficult word.

Some methods include the estimation of the **random part of the text**. This program does not includes random seed, so some values can differ in the same conditions (look functions `getRandomSample` and `getRandomPart`).

## Functions

Methods can be accessed by `const { f } = require('readability-cyr')`, where `f` is a function to count specific score:

* **scoreGunningFog** - [Gunning Fog index](https://en.wikipedia.org/wiki/Gunning_fog_index)
* **scoreGunningFogPSK** - The Powers-Sumner-Kearl Variation of Gunning's Fog Index
* **scoreFleschKincaidGrade** - [Flesch Kincaid Reading Grade](https://en.wikipedia.org/wiki/Flesch%E2%80%93Kincaid_readability_tests)
* **scoreFleschKincaidEase** - [Flesch Kincaid Reading Ease](https://en.wikipedia.org/wiki/Flesch%E2%80%93Kincaid_readability_tests)
* **scoreFJPS** - Farr-Jenkins-Paterson's Simplification of Flesch's Reading Ease Score
* **scoreFleschPSK** - The Powers-Sumner-Kearl's Variation of Flesch Reading Ease Score
* **scoreSMOG** - [SMOG Index](https://en.wikipedia.org/wiki/SMOG)
* **scoreSMOGSimple** - Simplified Version of McLaughlin's (1969) SMOG Measure
* **scoreARI** - [Automated Readability Index](https://en.wikipedia.org/wiki/Automated_readability_index)
* **scoreARISimple** - Simplified Version of Automated Readability Index
* **scoreColeman** - Coleman's (1971) Readability Formula 1
* **scoreColeman2** - Coleman's (1971) Readability Formula 2
* **scoreColemanLiauECP** - Coleman-Liau Estimated Cloze Percent
* **scoreColemanLiauGL** - Coleman-Liau Grade Level (Coleman and Liau 1975)
* **scoreColemanLiau** - [Coleman Liau Index](https://en.wikipedia.org/wiki/Coleman%E2%80%93Liau_index)
* **scoreDaleChall** - [Dale-Chall Readability Score](https://en.wikipedia.org/wiki/Dale%E2%80%93Chall_readability_formula)
* **scoreSpache** - [Spache Readability Score](https://en.wikipedia.org/wiki/Spache_readability_formula)
* **scoreLinsearWrite** - Linsear-Write formula
* **scorePowerSumnerKearlGrade** - The Power-Sumner-Kearl Readability Formula Grade Level
* **scorePowerSumnerKearlRA** - The Power-Sumner-Kearl Readability Formula Reading Age
* **scoreForcastGL** - FORCAST Readability Formula Grade Level
* **scoreForcastRA** - FORCAST Readability Formula Reading Age
* **scoreLIX** - LIX readability test
* **scoreRIX** - RIX Anderson's (1983) Readability Index
* **scoreDanielsonBryan** - Danielson-Bryan's (1963) Readability Measure 1
* **scoreDanielsonBryan2** - Danielson-Bryan's (1963) Readability Measure 2
* **scoreDickesSteiwer** - Dickes-Steiwer Index
* **scoreELF** - Easy Listening Formula
* **scoreFSC** - Fucks' Style Characteristic
* **scoreStrain** - Strain Index
* **scoreWheelerSmith** - Wheeler & Smith's (1954) Readability Measure

Lexical diversity can be estimated with a function `lexicalDiversity (str, type)`, where `type` is a kind of diversity:

* **ttr** - Text-Type Ratio (default value)
* **herdan** - Herdan's C
* **guiraud** - Guiraud's Root TTR
* **carroll** - Carroll's Corrected TTR
* **dugast** - Dugast's Uber Index 
* **summer** - Summer's index 

In case you need it, there are estimations of reading and speaking time - **readingTime** and **speakingTime** respectively. They use simple estimations of 200 and 160 word per minute. 

You can get a quick summary about your text with a function `getSummary(str)`.

There is also an access to basic functions `length`, `spacesCount`, `letterCount`, `digitCount`, `periodCount`, `questionCount`, `getWords`, `getRandomSample`, `getRandomPart`, `wordCount`, `averageWordLength`, `uniqueWordCount`,  `singleSyllableCount`, `syllableCount`, `getDifficultWords`, `difficultWordsCount`, `averageSyllablesWord`, `difficultWordsPercentage`, `longestWordLetters`, `longestWordLettersLength`, `longestWordSyllables`, `longestWordSyllablesLength`, `getSentences`, `sentenceCount`,  `shortSentenceCount`, `longSentenceCount`, `shortestSentence`, `shortestSentenceLength`, `shortestSentenceSyllableCount`, `shortestSentenceWordCount`, `longestSentence`, `longestSentenceLength`, `longestSentenceSyllableCount`, `longestSentenceWordLength`, `averageSentenceLength`, `averageSentenceSyllable`, `averageSentenceWords`, `getParapgraphs`, `paragraphCount`, `averageParagraphWords`, `averageParagraphSentences`.

Additional information can be found [here](http://science.lpnu.ua/sites/default/files/journal-paper/2019/jun/16807/014081085.pdf), [here](https://quanteda.io/reference/textstat_readability.html) and [here](https://scholarworks.wmich.edu/cgi/viewcontent.cgi?referer=https://en.wikipedia.org/&httpsredir=1&article=1792&context=reading_horizons).

## Installation

```bash
npm install readability-cyr --save
```

## Usage

```js
const { scoreDaleChall, getSummary } = require('readability-cyr')

const testText = `
К. прибув пізнього вечора. Село загрузло в глибокому снігу. Замкової гори не було видно, її поглинули туман і темрява, жоден, навіть слабенький, промінчик світла не виказував існування великого Замку. К. довго стояв на дерев'яному містку, який з'єднував гостинець із Селом, і вдивлявся в те, що здавалося порожнечею.
Потім він вирушив шукати місце для ночівлі. У заїзді ще не спали, і хоча в господаря, розгубленого несподіваним пізнім візитом, не виявилося для гостя вільної кімнати, він запропонував К. нічліг на солом'яній підстилці в загальному залі. К. погодився. Кілька селян ще сиділи за пивом, але прибулий не хотів ні з ким спілкуватися, тому приніс собі солом'яну підстилку з горища і влігся поближче до печі. Було тепло, селяни сиділи тихо, він ще трохи спостерігав за ними втомленим поглядом, а далі заснув.
`

console.log(scoreGunningFog(testText))

//16.35310586176728

console.log(getSummary(testText))

/*
{
  characters: 821,
  spaces: 128,
  letters: 660,
  syllables: 254,
  words: 127,
  uniqueWords: 105,
  longestWord: 12,
  difficultWords: 34,
  sentences: 9,
  paragraphs: 2,
  lexicalDiversity: 0.8267716535433071,
  averageWordLength: 5.228346456692913,
  averageSyllablesPerWord: 2,
  averageSentenceLength: 89.11111111111111,
  averageWordsPerSentence: 14.11111111111111,
  readingTime: '0:38',
  speakingTime: '0:47',
  GunningFog: 16.35310586176728,
  FleschKincaidGrade: 13.513333333333335,
  SMOG: 3.1291,
  ARI: 10.251067366579178,
  ColemanLiau: 19.8736,
  DaleChall: 4.9271552055993,
  Spache: 14.229444444444445,
  LinsearWrite: 12.285714285714286,
  ForcastRA: 20,
  LIX: 40.4778921865536,
  RIX: 0,
  DanielsonBryan: 6.287052380952381,
  ELF: 8.555555555555555,
  FSC: 0.37051274102548204,
  Strain: 8.466666666666667,
  WheelerSmith: 85.55555555555556
}
*/

```

## Alternatives

* **General approaches** - [automated-readability](https://www.npmjs.com/package/automated-readability), [retext-readability](https://www.npmjs.com/package/retext-readability), [readeasy](https://www.npmjs.com/package/readeasy), [text-readability](https://www.npmjs.com/package/text-readability), [ongig-text-statistics](https://www.npmjs.com/package/ongig-text-statistics), [textalyzer](https://www.npmjs.com/package/textalyzer)
* **Unnecessary passages** - [too-wordy](https://www.npmjs.com/package/too-wordy), [frankenword](https://www.npmjs.com/package/frankenword)
* **Flesch Kincaid** - [flesch-kincaid](https://www.npmjs.com/package/flesch-kincaid), [flesch](https://www.npmjs.com/package/flesch), [readability-meter](https://www.npmjs.com/package/readability-meter), [wordsmith-js](https://www.npmjs.com/package/wordsmith-js), [webgrade](https://www.npmjs.com/package/webgrade), [flesch-gauge](https://www.npmjs.com/package/flesch-gauge)
* **Spache Formula** - [spache-formula](https://www.npmjs.com/package/spache-formula)
* **Dale-Chall Formula** - [dale-chall-formula](https://www.npmjs.com/package/dale-chall-formula)
* **Coleman Liau** - [coleman-liau](https://www.npmjs.com/package/coleman-liau)
* **SMOG Formula** - [smog-formula](https://www.npmjs.com/package/smog-formula)
* **Gunning-Fog Index** - [gunning-fog](https://www.npmjs.com/package/gunning-fog), [text-stats](https://www.npmjs.com/package/text-stats)
* **ARI** - [automated-readability-index](https://www.npmjs.com/package/automated-readability-index)

## License

MIT
