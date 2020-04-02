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
  const letters = str.match(/[а-яєіїґёa-z]/igs)
  return letters ? letters.length : 0
}

// Digit count
const digitCount = str => {
  const digits = str.match(/\d+(?:[.,]\d+)?/igs)
  return digits ? digits.length : 0
}

// Get words array
const getWords = str => {
  const words = str.match(/[а-яєіїґё`']+/isg)
  return words ? words : []
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
  const difficultWords = words.filter(el => singleSyllableCount(el) > 4)
  return difficultWords
}

// Difficult words count
const difficultWordsCount = str => {
  return getDifficultWords(str).length
}

// Average syllables per word
const averageSyllablesPerWord = str => {
  return syllableCount(str)/wordCount(str)
}

// Percentage of difficult words
const difficultWordsPercentage = str => {
  return getDifficultWords(str).length/wordCount(str)*100
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

// Average sentence length
const averageSentenceLength = str => {
  const sentences = getSentences(str)
  if (sentences.length === 0) return 0
  const sentencesLength = sentences.map(el => el.length)
  return sentencesLength.reduce((acc, val) => acc + val, 0)/sentences.length
}

// Average syllables per sentence
const averageSyllablesPerSentence = str => {
  const sentences = getSentences(str)
  if (sentences.length === 0) return 0
  const sentencesLength = sentences.map(el => syllableCount(el))
  return sentencesLength.reduce((acc, val) => acc + val, 0)/sentences.length
}

// Average words per sentence
const averageWordsPerSentence = str => {
  const sentences = getSentences(str)
  if (sentences.length === 0) return 0
  const sentencesLength = sentences.map(el => wordCount(el))
  return sentencesLength.reduce((acc, val) => acc + val, 0)/sentences.length
}

// Gunning Fog Score
const scoreGunningFog = str => {
  const w = wordCount(str)
  const s = sentenceCount(str)
  const p = difficultWordsCount(str)
  return 0.4*(w/s + 100*p/w)
}

// Flesch Kincaid Reading Grade
const scoreFleschKincaidGrade = str => {
  const asl = averageWordsPerSentence(str)
  const asw = averageSyllablesPerWord(str)
  return 0.39*asl + 11.8*asw - 15.59
}

// Flesch Kincaid Reading Ease
const scoreFleschKincaidEase = str => {
  const tw = wordCount(str)
  const ts = sentenceCount(str)
  const s = syllableCount(str)
  return 206.835 - 1.015*(tw/ts) - 84.6*(s/tw)
}

// SMOG Index
const scoreSMOG = str => {
  const q = getWords(str).filter(el => syllableCount(el) > 3)
  const s = sentenceCount(str)
  return 1.043*(q*30/s)^0.5 + 3.1291
}

// Automated Readability Index
const scoreARI = str => {
  const c = length(str)
  const w = wordCount(str)
  const s = sentenceCount(str)
  return 4.71*c/w + 0.5*w/s - 21.43
}

// Coleman Liau Index
const scoreColemanLiau = str => {
  const hundreds = str.match(/([а-яєіїґё`']+[^а-яєіїґё`']+){100}/gis)
  if (!hundreds) return 1
  const l = hundreds.map(el => length(el)).reduce((acc, val) => acc + val, 0)
  const s = hundreds.map(el => getSentences(el).length).reduce((acc, val) => acc + val, 0)
  return 0.0588*l - 0.296*s - 15.8
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
  return 0.121*a + 0.082*d + 0.659
}

module.exports = {
  length,
  spacesCount,
  letterCount,
  digitCount,
  getWords,
  wordCount,
  averageWordLength,
  singleSyllableCount,
  syllableCount,
  getDifficultWords,
  difficultWordsCount,
  averageSyllablesPerWord,
  difficultWordsPercentage,
  getSentences,
  sentenceCount,
  averageSentenceLength,
  averageSyllablesPerSentence,
  averageWordsPerSentence,
  scoreGunningFog,
  scoreFleschKincaidGrade,
  scoreFleschKincaidEase,
  scoreSMOG,
  scoreARI,
  scoreColemanLiau,
  scoreDaleChall,
  scoreSpache
}
