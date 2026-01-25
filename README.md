# readability-cyr - Classic Readability Scores for Cyrillic Texts

## Description

`readability-cyr` is a Node.js package that computes a variety of classic readability scores for Cyrillic texts. It is dependency-free and works entirely with built-in JavaScript functions.

### Important limitations

This program is a heuristic tool and does not fully account for the linguistic properties of Ukrainian, Russian, or other Cyrillic-based languages. Users should be aware of the following:

1. **Language-specific features are not considered**. It only identifies vowels in Cyrillic texts for syllable-based calculations. Complex rules of pronunciation, stress, or syllable counting are not implemented.
2. **No stemming or lemmatization**. Different forms of the same word are treated as separate words. Metrics such as lexical diversity may therefore be overestimated.
3. **No vocabulary lists used**. For scores that rely on word lists (e.g., Dale–Chall), this program does not use any predefined vocabulary. Instead, words with three or more syllables are treated as “difficult” words.
4. **Tokenization-dependent results**. Sentence and word splitting are based on simple regular expressions. Results can differ depending on punctuation and formatting. Users should review the code for tokenization rules.
5. **Heuristic syllable counting**. Syllables are approximated by counting vowels, which is a simplification. Scores such as Flesch–Kincaid, Gunning Fog, or SMOG may differ from dictionary-based calculations.
6. **Intended for general analysis**. This package is suitable for rough readability estimation and text statistics but should not be used as a definitive measure for formal linguistic research or official educational assessment.

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
  spaces: 125,
  letters: 660,
  syllables: 239,
  words: 127,
  uniqueWords: 104,
  longestWord: 12,
  difficultWords: 34,
  difficultWordsPercentage: 26.771653543307085,
  sentences: 9,
  paragraphs: 2,
  lexicalDiversity: 0.8188976377952756,
  averageWordLength: 5.228346456692913,
  averageSyllablesPerWord: 1.8818897637795275,
  averageSentenceLength: 14.11111111111111,
  averageWordsPerSentence: 14.11111111111111,
  readingTime: '00:00:38',
  speakingTime: '00:00:47',
  GunningFog: 16.35310586176728,
  FleschKincaidGrade: 12.119632545931761,
  SMOG: 15.172626615295592,
  ARI: 10.251067366579178,
  ColemanLiau: 14.950399999999998,
  DaleChall: 28.830262467191602,
  Spache: 5.154444444444445,
  LinsearWrite: 10,
  ForcastRA: 24,
  LIX: 40.4778921865536,
  RIX: 4.333333333333333,
  DanielsonBryan: 6.287052380952381,
  ELF: 8.555555555555555,
  FSC: 73.77777777777777,
  Strain: 7.966666666666667,
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
