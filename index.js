// String length
const length = str => {
  return str.length
}

// Number of spaces
const spacesCount = str => {
  const spaces = str.match(/\s+/gs)
  return spaces ? spaces.length : 0
}

// Letter count
const letterCount = str => {
  const letters = str.match(/[a-zа-яєіїґё]/igs)
  return letters ? letters.length : 0
}

// Digit count
const digitCount = str => {
  const digits = str.match(/\d+(?:[.,]\d+)?/igs)
  return digits ? digits.length : 0
}

// Period count
const periodCount = str => {
  const periods = str.match(/(?<!\.)\.(?!\.)/igs)
  return periods ? periods.length : 0
}

// Question count
const questionCount = str => {
  const questions = str.match(/\?/gs)
  return questions ? questions.length : 0
}

// Get words array
const getWords = str => {
  const words = str.match(/[a-zа-яєіїґё`']+/isg)
  return words ? words : []
}

// Get random n words (probably it's worth to implement it with a seed number)
const getRandomSample = (str, n = 100, replacement = false) => {
  const words = getWords(str)
  if (words.length < n) return words
  const random = []
  let i = 0
  while (i < n) {
    i++
    let r = replacement ? words[Math.floor(Math.random() * words.length)] : words.splice(Math.floor(Math.random() * words.length), 1)[0]
    random.push(r)
  }
  return random
}

// Get n words from random place in the text
const getRandomPart = (str, n = 100, returnString = true) => {
  const words = getWords(str)
  if (words.length < n) return returnString ? str : words
  let hundreds = []
  let randomString = ''
  while (hundreds.length !== n) {
    randomString = str.slice(Math.floor(Math.random() * str.length), str.length - 1)
    hundreds = randomString.match(new RegExp('([a-zа-яєіїґё`\']+[^a-zа-яєіїґё`\']+){' + n + '}', 'gis'))
    hundreds = hundreds ? getWords(hundreds[0]) : []
  }
  return returnString ? randomString : hundreds
}

// Get words count
const wordCount = str => {
  return getWords(str).length
}

// Average word length
const averageWordLength = str => {
  const words = getWords(str)
  if (words.length === 0) return 0
  const totalWordsLength = words.reduce((acc, val) => val.length + acc, 0)
  return totalWordsLength/words.length
}

// Unique word count
const uniqueWordCount = str => {
  return [...new Set(getWords(str))].length
}

// Lexical Diversity (Text-Type Ratio)
const calculateDiversity = {
  ttr: (u, w) => u / w, // Text-Type Ratio
  herdan: (u, w) => Math.log(u) / Math.log(w), // Herdan's C
  guiraud: (u, w) => u / (w^0.5), // Guiraud's Root TTR
  carroll: (u, w) => u / (2 * w^0.5), // Carroll's Corrected TTR
  dugast: (u, w) => (Math.log(w)^0.5) / (Math.log(w) - Math.log(u)), // Dugast's Uber Index 
  summer: (u, w) => Math.log(Math.log(u)) / Math.log(Math.log(w)) // Summer's index 
}

const lexicalDiversity = (str, type = 'ttr') => {
  return calculateDiversity[type](uniqueWordCount(str), wordCount(str))
}

// Single syllable count
const singleSyllableCount = str => {
  const syllables = str.match(/[еиіоуяюєїёaeiou]/g)
  return syllables ? syllables.length : 1
}

// Text syllable count
const syllableCount = str => {
  const words = getWords(str)
  if (words.length === 0) return 0
  const syllablesCount = words.reduce((acc, val) => singleSyllableCount(val) + acc, 0)
  return syllablesCount
}

// Difficult words
const getDifficultWords = str => {
  const words = getWords(str)
  if (words.length === 0) return 0
  const difficultWords = words.filter(el => singleSyllableCount(el) >= 3)
  return difficultWords
}

// Difficult words count
const difficultWordsCount = str => {
  return getDifficultWords(str).length
}

// Average syllables per word
const averageSyllablesWord = str => {
  return syllableCount(str)/wordCount(str)
}

// Percentage of difficult words
const difficultWordsPercentage = str => {
  return getDifficultWords(str).length/wordCount(str)*100
}

// Longest word by letters
const longestWordLetters = str => {
  const words = getWords(str)
  let s = ''
  let max = 0
  while (words.length) {
    let newWord = words.pop()
    if (newWord.length > max) {
      s = newWord
      max = newWord.length
    }
  }
  return s
}

const longestWordLettersLength = str => {
  return longestWordLetters(str).length
}

// Longest word by syllables
const longestWordSyllables = str => {
  const words = getWords(str)
  let s = ''
  let max = 0
  while (words.length) {
    let newWord = words.pop()
    const length = singleSyllableCount(newWord)
    if (length > max) {
      s = newWord
      max = length
    }
  }
  return s
}

const longestWordSyllablesLength = str => {
  return singleSyllableCount(longestWordSyllables(str))
}
// Get sentences array
const getSentences = str => {
  let sentences = str.split(/\n|\.{3}|(?<!(?:\n|\s|,|:|\.)[А-ЯЄІЇҐЁ])\.|!|\?|\n/sg)
  if (!sentences) return []
  sentences = sentences.map(el => el.trim())
  sentences = sentences.filter(el => el.length)
  return sentences
}

// Sentence count
const sentenceCount = str => {
  return getSentences(str).length
}

// Short sentences (at most 19 words)
const shortSentenceCount = str => {
  return getSentences(str).filter(el => wordCount(el) < 20).length
}
// Long sentences (at least 34 words)
const longSentenceCount = str => {
  return getSentences(str).filter(el => wordCount(el) > 33).length
}

// Shortest sentence
const shortestSentence = str => {
  const sentences = getSentences(str)
  let s = ''
  let min = Number.MAX_VALUE
  while (sentences.length) {
    let newSentence = sentences.pop()
    if (newSentence.length < min) {
      s = newSentence
      min = newSentence.length
    }
  }
  return s
}

const shortestSentenceLength = str => {
  return shortestSentence(str).length
}

const shortestSentenceSyllableCount = str => {
  return syllableCount(shortestSentence(str))
}

const shortestSentenceWordCount = str => {
  return wordCount(shortestSentence(str))
}

// Longest sentence
const longestSentence = str => {
  const sentences = getSentences(str)
  let s = ''
  let max = 0
  while (sentences.length) {
    let newSentence = sentences.pop()
    if (newSentence.length > max) {
      s = newSentence
      max = newSentence.length
    }
  }
  return s
}

const longestSentenceLength = str => {
  return longestSentence(str).length
}

const longestSentenceSyllableCount = str => {
  return syllableCount(longestSentence(str))
}

const longestSentenceWordLength = str => {
  return wordCount(longestSentence(str))
}

// Average sentence length
const averageSentenceLength = str => {
  const sentences = getSentences(str)
  if (sentences.length === 0) return 0
  const sentencesLength = sentences.map(el => el.length)
  return sentencesLength.reduce((acc, val) => acc + val, 0)/sentences.length
}

// Average sentende by syllables
const averageSentenceSyllable = str => {
  const sentences = getSentences(str)
  if (sentences.length === 0) return 0
  const sentencesLength = sentences.map(el =>  syllableCount(el))
  return sentencesLength.reduce((acc, val) => acc + val, 0)/sentences.length
}

// Average sentence by words
const averageSentenceWords = str => {
  const sentences = getSentences(str)
  if (sentences.length === 0) return 0
  const sentencesLength = sentences.map(el => wordCount(el))
  return sentencesLength.reduce((acc, val) => acc + val, 0)/sentences.length
}

// Get paragraphs
const getParapgraphs = str => {
  const rows = str.split(/\n/sg).filter(el => el.length)
  // Check if markdown
  let averageLength = rows.map(el => el.length).reduce((acc, val) => acc + val, 0) / rows.length
  return (averageLength > 75 && averageLength < 125) ? str.split(/\n{2,}/sg).filter(el => el.length) : rows
}

// Paragraph count
const paragraphCount = str => {
  return getParapgraphs(str).length
}

// Average paragraph by words
const averageParagraphWords = str => {
  const paragraphs = getParapgraphs(str)
  if (paragraphs.length === 0) return 0
  const paragraphsLength = paragraphs.map(el => getWords(el).length)
  return paragraphsLength.reduce((acc, val) => acc + val, 0) / paragraphs.length
}

// Average paragraph by sentences
const averageParagraphSentences = str => {
  const paragraphs = getParapgraphs(str)
  if (paragraphs.length === 0) return 0
  const paragraphsLength = paragraphs.map(el => getSentences(el).length)
  return paragraphsLength.reduce((acc, val) => acc + val, 0) / paragraphs.length
}

// Gunning Fog Score
const scoreGunningFog = str => {
  const asl = averageSentenceWords(str)
  const p = difficultWordsCount(str)
  const w = wordCount(str)
  return 0.4 * (asl + 100 * p / w)
}

// The Powers-Sumner-Kearl Variation of Gunning's Fog Index
const scoreGunningFogPSK = str => {
  const asl = averageSentenceWords(str)
  const w = wordCount(str)
  const p = difficultWordsCount(str)
  return 3.068 * 0.0877 * asl + 0.0984 * 100 * p / w
}

// Flesch Kincaid Reading Grade
const scoreFleschKincaidGrade = str => {
  const asl = averageSentenceWords(str)
  const asw = averageSyllablesWord(str)
  return 0.39*asl + 11.8*asw - 15.59
}

// Flesch Kincaid Reading Ease
const scoreFleschKincaidEase = str => {
  const tw = wordCount(str)
  const ts = sentenceCount(str)
  const s = syllableCount(str)
  return 206.835 - 1.015 * (tw / ts) - 84.6 * (s / tw)
}

// Farr-Jenkins-Paterson's Simplification of Flesch's Reading Ease Score
const scoreFJPS = str => {
  const words = getWords(str)
  const asl = averageSentenceWords(str)
  const nwsy = words.filter(el => singleSyllableCount(el) === 1).length
  const nw = wordCount(str)
  return -31.517 - 1.015 * asl + 1.559 * nwsy / nw
}

// The Powers-Sumner-Kearl's Variation of Flesch Reading Ease Score
const scoreFleschPSK = str => {
  const asl = averageSentenceWords(str)
  const nsy = syllableCount(str)
  const nw = wordCount(str)
  return 0.778 * asl + 4.55 * nsy / nw - 2.2029
}

// SMOG Index
const scoreSMOG = str => {
  const q = getWords(str).filter(el => singleSyllableCount(el) > 3)
  const s = sentenceCount(str)
  return 1.043 * ((q * 30 / s)^0.5) + 3.1291
}

// Simplified Version of McLaughlin's (1969) SMOG Measure
const scoreSMOGSimple = str => {
  const q = getWords(str).filter(el => singleSyllableCount(el) > 3)
  const s = sentenceCount(str)
  return ((q * 30 / s)^0.5) + 3
}

// Automated Readability Index Simple
const scoreARISimple = str => {
  const awl = averageWordLength(str)
  const aws = averageSentenceWords(str) 
  return 9 * awl + aws
}

// Automated Readability Index
const scoreARI = str => {
  const awl = averageWordLength(str)
  const aws = averageSentenceWords(str) 
  return 4.71 * awl + 0.5 * aws - 21.43
}

// Coleman's (1971) Readability Formula 1
const scoreColeman = str => {
  const words = getWords(str)
  const nws = words.filter(el => singleSyllableCount(el) === 1).length
  return 1.29 * 100 * nws / words.length - 38.45
}

// Coleman's (1971) Readability Formula 2
const scoreColeman2 = str => {
  const words = getWords(str)
  const nws = words.filter(el => singleSyllableCount(el) === 1).length
  const nst = sentenceCount(str)
  const nw = words.length
  return 1.16 * (100 * nws / nw) + 1.48 * 100 * nst / nw - 37.95
}

// Coleman-Liau Estimated Cloze Percent
const scoreColemanLiauECP = str => {
  const awl = averageWordLength(str)
  const nst = sentenceCount(str)
  const nw = getWords(str).length
  return 141.8401 - 0.214590 * 100 * awl + 1.079812 * 100 * nst / nw
}

// Coleman-Liau Grade Level (Coleman and Liau 1975)
const scoreColemanLiauGL = str => {
  const ecp = scoreColemanLiauECP(str)
  return -27.4004 * ecp / 100 + 23.06395
}

// Coleman Liau Index
const scoreColemanLiau = str => {
  const hundreds = str.match(/([a-zа-яєіїґё`']+[^a-zа-яєіїґё`']+){100}/gis)
  if (!hundreds) return 1
  const l = hundreds.map(el => length(el)).reduce((acc, val) => acc + val, 0)
  const s = hundreds.map(el => getSentences(el).length).reduce((acc, val) => acc + val, 0)
  return 0.0588 * l - 0.296 * s - 15.8
}

// Dale-Chall Readability Score
const scoreDaleChall = str => {
  const d = difficultWordsCount(str)
  const w = wordCount(str)
  const s = sentenceCount(str)
  return 0.1579*(d/w*100) + 0.0496*(w/s)
}

// Spache Readability Score
const scoreSpache = str => {
  const a = averageSentenceLength(str)
  const d = difficultWordsCount(str)
  return 0.121 * a + 0.082 * d + 0.659
}

// Linsear-Write formula
const scoreLinsearWrite = str => {
  const sample = getRandomPart(str)
  const words = getWords(sample)
  const s = sentenceCount(sample)
  const sw = words.filter(el => singleSyllableCount(el) < 3)
  const dw = words.filter(el => singleSyllableCount(el) > 2)
  const result = (sw.length + dw.length*3) / s
  return result > 20 ? result / 2 : (result - 2) / 2
}

// The Power-Sumner-Kearl Readability Formula Grade Level
const scorePowerSumnerKearlGrade = str => {
  const sample = getRandomPart(str)
  const asl = averageSentenceLength(sample)
  const ns = syllableCount(sample)/wordCount(sample) 
  return 0.0778*asl + 0.455*ns - 2.2029
}

// The Power-Sumner-Kearl Readability Formula Reading Age
const scorePowerSumnerKearlRA = str => {
  const sample = getRandomPart(str)
  const asl = averageSentenceLength(sample)
  const ns = syllableCount(sample)/wordCount(sample) 
  return 0.0778*asl + 0.455*ns + 2.7971
}

// FORCAST Readability Formula Grade Level
const scoreForcastGL = str => {
  const sample = getRandomPart(str, 150, false)
  const n = sample.filter(el => singleSyllableCount(el) === 1).length
  return 20 - n / 10
}

// FORCAST Readability Formula Reading Age
const scoreForcastRA = str => {
  const sample = getRandomPart(str, 150, false)
  const n = sample.filter(el => singleSyllableCount(el) === 1).length
  return 25 - n / 10
}

// LIX readability test
const scoreLIX = str => {
  const a = wordCount(str)
  const b = periodCount(str)
  const c = getWords(str).filter(el => el.length > 6).length
  return a/b + c*100/a
}

// RIX Anderson's (1983) Readability Index
const scoreRIX = str => {
  const words = getWords(str)
  const nwsy = words.filter(el => singleSyllableCount(el) > 6)
  const nst = sentenceCount(str)
  return nwsy / nst
}

// Danielson-Bryan's (1963) Readability Measure 1
const scoreDanielsonBryan = str => {
  const c = getWords(str).map(el => el.length).reduce((acc, val) => acc + val, 0)
  const bl = wordCount(str) - 1
  const st = sentenceCount(str)
  return 1.0364 * c / bl + 0.0194 * c / st - 0.6059
}

// Danielson-Bryan's (1963) Readability Measure 2
const scoreDanielsonBryan2 = str => {
  const c = getWords(str).map(el => el.length).reduce((acc, val) => acc + val, 0)
  const bl = wordCount(str) - 1
  const st = sentenceCount(str)
  return 131.059 - 10.364 * c / bl + 0.0194 * c / st
}

// Dickes-Steiwer Index
const scoreDickesSteiwer = str => {
  const awl = averageWordLength(str)
  const asl = averageSentenceWords(str)
  const ttr = lexicalDiversity(str)
  return 235.95993 - 73.021 * awl - 12.56438 * asl - 50.0393 * ttr
}

// Easy Listening Formula
const scoreELF = str => {
  const words = getWords(str)
  const nwsy = words.filter(el => singleSyllableCount(el) >= 2).length
  const nst = sentenceCount(str)
  return nwsy/nst
}

// Fucks' Style Characteristic
const scoreFSC = str => {
  return averageWordLength(str) / averageSentenceWords(str)
}

// Strain Index
const scoreStrain = str => {
  const s = sentenceCount(str)
  const sy = syllableCount(str)
  return sy / (s / 3) / 10
}

// Wheeler & Smith's (1954) Readability Measure
const scoreWheelerSmith = str => {
  const asl = averageSentenceWords(str)
  const nw = wordCount(str)
  const nwsy = getWords(str).filter(el => singleSyllableCount(el) > 1).length
  return asl * 10 * nwsy / nw
}

// Reading Time
const formatDuration = {
  seconds: ms => Math.round(ms / 1000),
  minutesRound: ms => Math.round(ms / (60 * 1000)),
  minutes: ms => {
    const d = new Date(ms)
    return d.getUTCMinutes() + ':' + d.getUTCSeconds()
  },
  hoursRound: ms => Math.round(ms / (60 * 60 * 1000)),
  hours: ms => {
    const d = new Date(ms)
    return d.getUTCHours() + d.getUTCMinutes() + ':' + d.getUTCSeconds()
  }
}

const readingTime = (str, wpm = 200, durationType = 'minutes') => {
  const count = wordCount(str)
  const duration = count / wpm
  const ms = duration * 60 * 1000
  if (durationType === 'minutes' && ms >= (60 * 60 * 1000)) durationType = 'hours'
  return formatDuration[durationType](ms)
}

// Speaking time
const speakingTime = (str, wpm = 160, durationType = 'minutes') => {
  return readingTime(str, wpm, durationType)
}

// Get summary
const getSummary = str => {
  return {
    characters: length(str),
    spaces: spacesCount(str),
    letters: letterCount(str),
    syllables: syllableCount(str),
    words: wordCount(str),
    uniqueWords: uniqueWordCount(str),
    longestWord: longestWordLettersLength(str),
    difficultWords: difficultWordsCount(str),
    difficultWordsPercentage: difficultWordsPercentage(str),
    sentences: sentenceCount(str),
    paragraphs: paragraphCount(str),
    lexicalDiversity: lexicalDiversity(str),
    averageWordLength: averageWordLength(str),
    averageSyllablesPerWord: averageSyllablesWord(str),
    averageSentenceLength: averageSentenceLength(str),
    averageWordsPerSentence: averageSentenceWords(str),

    readingTime: readingTime(str),
    speakingTime: speakingTime(str),

    GunningFog: scoreGunningFog(str),
    FleschKincaidGrade: scoreFleschKincaidGrade(str), 
    SMOG: scoreSMOG(str),
    ARI: scoreARI(str),
    ColemanLiau: scoreColemanLiau(str),
    DaleChall: scoreDaleChall(str),
    Spache: scoreSpache(str),
    LinsearWrite: scoreLinsearWrite(str),
    ForcastRA: scoreForcastRA(str),
    LIX: scoreLIX(str),
    RIX: scoreRIX(str),
    DanielsonBryan: scoreDanielsonBryan(str),
    ELF: scoreELF(str),
    FSC: scoreFSC(str),
    Strain: scoreStrain(str),
    WheelerSmith: scoreWheelerSmith(str)
  }
}

const vocabulary = {
  characters: 'Number of characters',
  spaces: 'Number of spaces',
  letters: 'Number of letters',
  syllables: 'Number of syllables',
  words: 'Number of words',
  uniqueWords: 'Number of unique words',
  longestWord: 'The longest word',
  difficultWords: 'Number of difficult words',
  difficultWordsPercentage: 'Percentage of difficult words',
  sentences: 'Number of sentences',
  paragraphs: 'Number of paragraphs',
  lexicalDiversity: 'Lexical diversity',
  averageWordLength: 'Average word length:',
  averageSyllablesPerWord: 'Average syllables per word',
  averageSentenceLength: 'Average sentence length (characters)',
  averageWordsPerSentence: 'Average number of words per sentence',

  readingTime: 'Reading time',
  speakingTime: 'Speaking time',

  GunningFog: 'Gunning Fog Index',
  FleschKincaidGrade: 'The Flesch–Kincaid Grade Level', 
  SMOG: 'SMOG Readability',
  ARI: 'Automated Readability Index',
  ColemanLiau: 'Coleman–Liau index',
  DaleChall: 'Dale–Chall readability',
  Spache: 'Spache Readability',
  LinsearWrite: 'Linsear Write Readability',
  ForcastRA: 'FORCAST Readability',
  LIX: 'Lix (readability test)',
  RIX: 'Rix (readability test)',
  DanielsonBryan: 'Danielson-Bryan Readability',
  ELF: 'Fang\'s Easy Listening',
  FSC: 'Fucks\' Style Characteristic',
  Strain: 'Strain Index',
  WheelerSmith: 'Wheeler & Smith\'s Readability Measure'
}

const getDescriptiveSummary = str => {
  const summary = getSummary(str)
  for (let key of Object.keys(summary)) {
    console.log(`${vocabulary[key]}: ${summary[key]}`)
  }
}

module.exports = {
  length,
  spacesCount,
  letterCount,
  digitCount,
  periodCount,
  questionCount,
  getWords,
  getRandomSample,
  getRandomPart,
  wordCount,
  averageWordLength,
  uniqueWordCount,
  lexicalDiversity,
  singleSyllableCount,
  syllableCount,
  getDifficultWords,
  difficultWordsCount,
  averageSyllablesWord,
  difficultWordsPercentage,
  longestWordLetters,
  longestWordLettersLength,
  longestWordSyllables,
  longestWordSyllablesLength,
  getSentences,
  sentenceCount,
  shortSentenceCount,
  longSentenceCount,
  shortestSentence,
  shortestSentenceLength,
  shortestSentenceSyllableCount,
  shortestSentenceWordCount,
  longestSentence,
  longestSentenceLength,
  longestSentenceSyllableCount,
  longestSentenceWordLength,
  averageSentenceLength,
  averageSentenceSyllable,
  averageSentenceWords,
  getParapgraphs,
  paragraphCount,
  averageParagraphWords,
  averageParagraphSentences,
  scoreGunningFog,
  scoreGunningFogPSK,
  scoreFleschKincaidGrade,
  scoreFleschKincaidEase,
  scoreFJPS,
  scoreFleschPSK,
  scoreSMOG,
  scoreSMOGSimple,
  scoreARI,
  scoreARISimple,
  scoreColeman,
  scoreColeman2,
  scoreColemanLiau,
  scoreColemanLiauECP,
  scoreColemanLiauGL,
  scoreDaleChall,
  scoreSpache,
  scoreLinsearWrite,
  scorePowerSumnerKearlGrade,
  scorePowerSumnerKearlRA,
  scoreForcastGL,
  scoreForcastRA,
  scoreLIX,
  scoreRIX,
  scoreDanielsonBryan,
  scoreDanielsonBryan2,
  scoreDickesSteiwer,
  scoreELF,
  scoreFSC,
  scoreStrain,
  scoreWheelerSmith,
  readingTime,
  speakingTime,
  getSummary,
  getDescriptiveSummary
}
