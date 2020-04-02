# readability-cyr - count classic readability scores for cyrillic texts

## Description

This Node JS program counts different readability scores for cyryllic texts (no dependencies). Please, note that this program **does not account** peculiar properties of Ukrainian or Russian languages. It only counts scores in consideration of specific vowels in cyryllic languages.

## Functions

Methods can be accessed by `const { f } = require('readability-cyr')`, where `f` is a function to count specific score:

* **scoreGunningFog** - [Gunning Fog index](https://en.wikipedia.org/wiki/Gunning_fog_index)
* **scoreFleschKincaidGrade** - [Flesch Kincaid Reading Grade](https://en.wikipedia.org/wiki/Flesch%E2%80%93Kincaid_readability_tests)
* **scoreFleschKincaidEase** - [Flesch Kincaid Reading Ease](https://en.wikipedia.org/wiki/Flesch%E2%80%93Kincaid_readability_tests)
* **scoreSMOG** - [SMOG Index](https://en.wikipedia.org/wiki/SMOG)
* **scoreARI** - [Automated Readability Index](https://en.wikipedia.org/wiki/Automated_readability_index) 
* **scoreColemanLiau** - [Coleman Liau Index](https://en.wikipedia.org/wiki/Coleman%E2%80%93Liau_index)
* **scoreDaleChall** - [Dale-Chall Readability Score](https://en.wikipedia.org/wiki/Dale%E2%80%93Chall_readability_formula)
* **scoreSpache** - [Spache Readability Score](https://en.wikipedia.org/wiki/Spache_readability_formula)

You can also access basic functions `length`, `spacesCount`, `letterCount`, `digitCount`, `getWords`, `wordCount`, ` averageWordLength`, `singleSyllableCount`, `syllableCount`, `getDifficultWords`, `difficultWordsCount`, `
averageSyllablesPerWord`, `difficultWordsPercentage`, `getSentences`, `sentenceCount`, `averageSentenceLength`, ` averageSyllablesPerSentence`, `averageWordsPerSentence`.

Additional information can be found [here](http://science.lpnu.ua/sites/default/files/journal-paper/2019/jun/16807/014081085.pdf).

## Installation

```bash
npm install readability-cyr --save
```

## Usage

```js
const { scoreDaleChall } = require('readability-cyr')

const testText = `
К. прибув пізнього вечора. Село загрузло в глибокому снігу. Замкової гори не було видно, її поглинули туман і темрява, жоден, навіть слабенький, промінчик світла не виказував існування великого Замку. К. довго стояв на дерев'яному містку, який з'єднував гостинець із Селом, і вдивлявся в те, що здавалося порожнечею.
Потім він вирушив шукати місце для ночівлі. У заїзді ще не спали, і хоча в господаря, розгубленого несподіваним пізнім візитом, не виявилося для гостя вільної кімнати, він запропонував К. нічліг на солом'яній підстилці в загальному залі. К. погодився. Кілька селян ще сиділи за пивом, але прибулий не хотів ні з ким спілкуватися, тому приніс собі солом'яну підстилку з горища і влігся поближче до печі. Було тепло, селяни сиділи тихо, він ще трохи спостерігав за ними втомленим поглядом, а далі заснув.
`

console.log(scoreDaleChall(testText))

```

Expected outcome:

<pre>
1.1972339457567802
</pre>

## License

MIT
