// String length
const length = (str: string): number => {
  return str.length
}

// Number of spaces
const spacesCount = (str: string): number => {
  const spaces = str.match(/ +/gs)
  return spaces !== null ? spaces.length : 0
}

// Letter count
const letterCount = (str: string): number => {
  const letters = str.match(/[a-zа-яєіїґё]/igs)
  return letters !== null ? letters.length : 0
}

// Digit count
const digitCount = (str: string): number => {
  const digits = str.match(/\d+(?:[.,]\d+)?/igs)
  return digits !== null ? digits.length : 0
}

// Period count
const periodCount = (str: string): number => {
  const periods = str.match(/(?<!\.)[:.](?!\.)/igs)
  return periods !== null ? periods.length : 0
}

// Question count
const questionCount = (str: string): number => {
  const questions = str.match(/\?/gs)
  return questions !== null ? questions.length : 0
}

// Get words array
const getWords = (str: string): string[] => {
  const words = str.match(/[a-zа-яєіїґё`']+/isg)
  if (words === null) return []
  return words.map(el => el.toLowerCase())
}

// Get random n words (probably it's worth to implement it with a seed number)
const getRandomSample = (str: string, n: number = 100, replacement: boolean = false): string[] => {
  const words = getWords(str)
  if (words.length < n) return words
  const random: string[] = []
  let i = 0
  while (i < n) {
    i++
    const r = replacement ? words[Math.floor(Math.random() * words.length)] : words.splice(Math.floor(Math.random() * words.length), 1)[0]
    random.push(r)
  }
  return random
}

// Get n words from random place in the text
const getRandomPart = (string: string, n: number = 100): string => {
  const wordPattern = /[a-zа-яєіїґё`']/sgi
  const parts = string.match(/[a-zа-яєіїґё`']+|[^a-z]/sgi)
  if (!parts) return ''
  let index = 0
  for (let i = 0; i < parts?.length; i++) {
    if (wordPattern.test(parts[i])) index++
    if (index === 99) break
  }
  return parts.slice(0, index).join('')
}

// Get words count
const wordCount = (str: string): number => {
  return getWords(str).length
}

// Average word length
const averageWordLength = (str: string): number => {
  const words = getWords(str)
  if (words.length === 0) return 0
  const totalWordsLength = words.reduce((acc, val) => val.length + acc, 0)
  return totalWordsLength / words.length
}

// Unique word count
const uniqueWordCount = (str: string): number => {
  return new Set(getWords(str)).size
}

// Lexical Diversity (Text-Type Ratio)
const calculateDiversity = {
  // Text-Type Ratio (https://www.sketchengine.eu/glossary/type-token-ratio-ttr/)
  ttr: (unique: number, words: number): number => unique / words,
  // 
  herdan: (unique: number, words: number): number => Math.log10(unique) / Math.log10(words), // Herdan's C
  guiraud: (unique: number, words: number): number => unique / Math.sqrt(words), // Guiraud's Root TTR
  carroll: (unique: number, words: number): number => unique / (Math.sqrt(2 * words)), // Carroll's Corrected TTR
  dugast: (unique: number, words: number): number => Math.pow(Math.log10(words), 2) / (Math.log10(words) - Math.log10(unique)), // Dugast's Uber Index
  summer: (unique: number, words: number): number => Math.log10(Math.log10(unique)) / Math.log10(Math.log10(words)) // Summer's index
}

const lexicalDiversity = (str: string, type: keyof typeof calculateDiversity = 'ttr'): number => {
  return calculateDiversity[type](uniqueWordCount(str), wordCount(str))
}

// Single syllable count
const singleSyllableCount = (str: string): number => {
  const syllables = str.match(/[еиіоуяюєїёaeiou]/ig)
  return syllables !== null ? syllables.length : 0
}

// Text syllable count
const syllableCount = (str: string): number => {
  const words = getWords(str)
  if (words.length === 0) return 0
  const syllablesCount = words.reduce((acc, val) => singleSyllableCount(val) + acc, 0)
  return syllablesCount
}

// Difficult words
const getDifficultWords = (str: string): string[] => {
  const words = getWords(str)
  if (words.length === 0) return []
  const difficultWords = words.filter(el => singleSyllableCount(el) >= 3)
  return difficultWords
}

// Difficult words count
const difficultWordsCount = (str: string): number => {
  return getDifficultWords(str).length
}

// Average syllables per word
const averageSyllablesWord = (str: string): number => {
  const words = wordCount(str)
  if (words === 0) return 0
  return syllableCount(str) / words
}

// Percentage of difficult words
const difficultWordsPercentage = (str: string): number => {
  const words = wordCount(str)
  if (words === 0) return 0
  return getDifficultWords(str).length * 100 / words
}

// Longest word by letters
const longestWordLetters = (str: string): string => {
  const words = getWords(str)
  let max = 0
  let longestWord = ''
  for (const word of words) {
    const newMax = length(word)
    if (newMax < max) continue
    max = newMax
    longestWord = word
  }
  return longestWord
}

const longestWordLettersLength = (str: string): number => {
  return longestWordLetters(str).length
}

// Longest word by syllables
const longestWordSyllables = (str: string): string => {
  const words = getWords(str)
  let longestWord = ''
  let max = 0
  for (const newWord of words) {
    const newMax = singleSyllableCount(newWord)
    if (newMax < max) continue
    longestWord = newWord
    max = newMax
  }
  return longestWord
}

const longestWordSyllablesLength = (str: string): number => {
  return singleSyllableCount(longestWordSyllables(str))
}
// Get sentences array
const getSentences = (str: string): string[] => {
  let sentences = str.split(/\n|\.{3}|(?<!(?:\s|,|:|\.)[A-ZА-ЯЄІЇҐЁ])\.|!|\?/sg)
  if (sentences === null) return []
  sentences = sentences.filter(el => el.length)
  return sentences
}

// Sentence count
const sentenceCount = (str: string): number => {
  return getSentences(str).length
}

// Short sentences (at most 19 words)
const shortSentenceCount = (str: string): number => {
  return getSentences(str).filter(el => wordCount(el) < 20).length
}
// Long sentences (at least 34 words)
const longSentenceCount = (str: string): number => {
  return getSentences(str).filter(el => wordCount(el) > 33).length
}

// Shortest sentence
const shortestSentence = (str: string): string => {
  const sentences = getSentences(str)
  let shortest = ''
  let min = Number.MAX_VALUE
  for (const sentence of sentences) {
    const newMin = sentence.length
    if (min < newMin) continue
    min = newMin
    shortest = sentence
  }
  return shortest.trim()
}

const shortestSentenceLength = (str: string): number => {
  return shortestSentence(str).length
}

const shortestSentenceSyllableCount = (str: string): number => {
  return syllableCount(shortestSentence(str))
}

const shortestSentenceWordCount = (str: string): number => {
  return wordCount(shortestSentence(str))
}

// Longest sentence
const longestSentence = (str: string): string => {
  const sentences = getSentences(str)
  let longest = ''
  let max = 0
  for (const sentence of sentences) {
    const length = sentence.length
    if (max > length) continue
    max = length
    longest = sentence
  }
  return longest.trim()
}

const longestSentenceLength = (str: string): number => {
  return longestSentence(str).length
}

const longestSentenceSyllableCount = (str: string): number => {
  return syllableCount(longestSentence(str))
}

const longestSentenceWordLength = (str: string): number => {
  return wordCount(longestSentence(str))
}

// Average sentence length
const averageSentenceLength = (str: string): number => {
  const sentences = getSentences(str)
  if (sentences.length === 0) return 0
  const sentencesLength = sentences.map(el => getWords(el).length)
  return sentencesLength.reduce((acc, val) => acc + val, 0) / sentences.length
}

// Average sentende by syllables
const averageSentenceSyllable = (str: string): number => {
  const sentences = getSentences(str)
  if (sentences.length === 0) return 0
  const sentencesLength = sentences.map(el => syllableCount(el))
  return sentencesLength.reduce((acc, val) => acc + val, 0) / sentences.length
}

// Average sentence by words
const averageSentenceWords = (str: string): number => {
  const sentences = getSentences(str)
  if (sentences.length === 0) return 0
  const sentencesLength = sentences.map(el => wordCount(el))
  return sentencesLength.reduce((acc, val) => acc + val, 0) / sentences.length
}

// Get paragraphs
const getParapgraphs = (str: string): string[] => {
  const rows = str.split(/\n+/sg).filter(el => el.length > 0)
  return rows
}

// Paragraph count
const paragraphCount = (str: string): number => {
  return getParapgraphs(str).length
}

// Average paragraph by words
const averageParagraphWords = (str: string): number => {
  const paragraphs = getParapgraphs(str)
  if (paragraphs.length === 0) return 0
  const paragraphsLength = paragraphs.map(el => getWords(el).length)
  return paragraphsLength.reduce((acc, val) => acc + val, 0) / paragraphs.length
}

// Average paragraph by sentences
const averageParagraphSentences = (str: string): number => {
  const paragraphs = getParapgraphs(str)
  if (paragraphs.length === 0) return 0
  const paragraphsLength = paragraphs.map(el => getSentences(el).length)
  return paragraphsLength.reduce((acc, val) => acc + val, 0) / paragraphs.length
}

// Gunning Fog Score
const scoreGunningFog = (str: string): number => {
  const asl = averageSentenceWords(str)
  const p = difficultWordsCount(str)
  const w = wordCount(str)
  return 0.4 * (asl + 100 * p / w)
}

// The Powers-Sumner-Kearl Variation of Gunning's Fog Index
const scoreGunningFogPSK = (str: string): number => {
  const asl = averageSentenceWords(str)
  const w = wordCount(str)
  const p = difficultWordsCount(str)
  return 3.068 * 0.0877 * asl + 0.0984 * 100 * p / w
}

// Flesch Kincaid Reading Grade
const scoreFleschKincaidGrade = (str: string): number => {
  const asl = averageSentenceWords(str)
  const asw = averageSyllablesWord(str)
  return 0.39 * asl + 11.8 * asw - 15.59
}

// Flesch Kincaid Reading Ease
const scoreFleschKincaidEase = (str: string): number => {
  const tw = wordCount(str)
  const ts = sentenceCount(str)
  if (!tw || !ts) return 0
  const s = syllableCount(str)
  return 206.835 - 1.015 * (tw / ts) - 84.6 * (s / tw)
}

// Farr-Jenkins-Paterson's Simplification of Flesch's Reading Ease Score
const scoreFJPS = (str: string): number => {
  const words = getWords(str)
  const asl = averageSentenceWords(str)
  const nwsy = words.filter(el => singleSyllableCount(el) === 1).length
  const nw = wordCount(str)
  return -31.517 - 1.015 * asl + 1.559 * nwsy / nw
}

// The Powers-Sumner-Kearl's Variation of Flesch Reading Ease Score
const scoreFleschPSK = (str: string): number => {
  const asl = averageSentenceWords(str)
  const nsy = syllableCount(str)
  const nw = wordCount(str)
  return 0.778 * asl + 4.55 * nsy / nw - 2.2029
}

// SMOG Index
const scoreSMOG = (str: string): number => {
  const q = getWords(str).filter(el => singleSyllableCount(el) > 3)
  const s = sentenceCount(str)
  return 1.043 * Math.sqrt(q.length) * 30 / s + 3.1291
}

// Simplified Version of McLaughlin's (1969) SMOG Measure
const scoreSMOGSimple = (str: string): number => {
  const q = getWords(str).filter(el => singleSyllableCount(el) > 3)
  const s = sentenceCount(str)
  return Math.sqrt(q.length * 30 / s) + 3
}

// Automated Readability Index Simple
const scoreARISimple = (str: string): number => {
  const awl = averageWordLength(str)
  const aws = averageSentenceWords(str)
  return 9 * awl + aws
}

// Automated Readability Index
const scoreARI = (str: string): number => {
  const awl = averageWordLength(str)
  const aws = averageSentenceWords(str)
  return 4.71 * awl + 0.5 * aws - 21.43
}

// Coleman's (1971) Readability Formula 1
const scoreColeman = (str: string): number => {
  const words = getWords(str)
  const nws = words.filter(el => singleSyllableCount(el) === 1).length
  return 1.29 * 100 * nws / words.length - 38.45
}

// Coleman's (1971) Readability Formula 2
const scoreColeman2 = (str: string): number => {
  const words = getWords(str)
  const nws = words.filter(el => singleSyllableCount(el) === 1).length
  const nst = sentenceCount(str)
  const nw = words.length
  return 1.16 * (100 * nws) / (nw + 1.48 * 100 * nst / nw - 37.95)
}

// Coleman-Liau Estimated Cloze Percent
const scoreColemanLiauECP = (str: string): number => {
  const awl = averageWordLength(str)
  const nst = sentenceCount(str)
  const nw = getWords(str).length
  return 141.8401 - 0.214590 * 100 * awl + 1.079812 * 100 * nst / nw
}

// Coleman-Liau Grade Level (Coleman and Liau 1975)
const scoreColemanLiauGL = (str: string): number => {
  const ecp = scoreColemanLiauECP(str)
  return -27.4004 * ecp / 100 + 23.06395
}

const scoreColemanLiau = (str: string): number => {
  const words = getWords(str).slice(0, 100)
  const nw = words.length
  if (nw === 0) return 0
  const letters = words.reduce((acc, w) => acc + w.length, 0)
  const textSample = words.join(' ')
  const sentences = getSentences(textSample).length
  const l = (letters / nw) * 100
  const s = (sentences / nw) * 100
  return 0.0588 * l - 0.296 * s - 15.8
}

// Old Dale-Chall Readability Score
const scoreDaleChallOld = (str: string): number => {
  const d = difficultWordsCount(str)
  const w = wordCount(str)
  const s = sentenceCount(str)
  let score = 0.1579 * (d / w * 100) + 0.0496 * (w / s)
  if (d / w > 0.05) score += 3.6365
  return score
}

// Dale-Chall Readability Score
const scoreDaleChall = (str: string): number => {
  const d = difficultWordsCount(str)
  const w = wordCount(str)
  const s = sentenceCount(str)
  return 64 - (0.95 * 100 * d / w) - 0.69 * (w / s)
}

// Spache Readability Score
const scoreSpache = (str: string): number => {
  const a = averageSentenceLength(str)
  const d = difficultWordsCount(str)
  return 0.121 * a + 0.082 * d + 0.659
}

// Linsear-Write formula
const scoreLinsearWrite = (str: string): number => {
  const sample = getRandomPart(str)
  const words = getWords(sample as string)
  const s = sentenceCount(sample as string)
  const sw = words.filter(el => singleSyllableCount(el) < 3)
  const dw = words.filter(el => singleSyllableCount(el) > 2)
  return (100 - 100 * sw.length / words.length + 3 * 100 * dw.length / words.length) / (100 * s / words.length)
}

// The Power-Sumner-Kearl Readability Formula Grade Level
const scorePowerSumnerKearlGrade = (str: string): number => {
  const sample = getRandomPart(str)
  const asl = averageSentenceLength(sample as string)
  const ns = syllableCount(sample as string) / wordCount(sample as string)
  return 0.0778 * asl + 0.455 * ns - 2.2029
}

// The Power-Sumner-Kearl Readability Formula Reading Age
const scorePowerSumnerKearlRA = (str: string): number => {
  const sample = getRandomPart(str)
  const asl = averageSentenceLength(sample as string)
  const ns = syllableCount(sample as string) / wordCount(sample as string)
  return 0.0778 * asl + 0.455 * ns + 2.7971
}

// FORCAST Readability Formula Grade Level
const scoreForcastGL = (str: string): number => {
  const sample = getRandomPart(str, 150)
  const words = getWords(sample)
  const n = words.filter(el => singleSyllableCount(el) === 1).length
  return 20 - n * 150 / (words.length * 10)
}

// FORCAST Readability Formula Reading Age
const scoreForcastRA = (str: string): number => {
  const sample = getRandomPart(str, 150)
  const words = getWords(sample)
  const n = words.filter(el => singleSyllableCount(el) === 1).length
  return 25 - n / 10
}

// LIX readability test
const scoreLIX = (str: string): number => {
  const a = wordCount(str)
  const b = periodCount(str)
  const c = getWords(str).filter(el => el.length > 6).length
  return a / b + c * 100 / a
}

// RIX Anderson's (1983) Readability Index
const scoreRIX = (str: string): number => {
  const words = getWords(str)
  const nwsy = words.filter(el => el.length > 6)
  const nst = sentenceCount(str)
  return nwsy.length / nst
}

// Danielson-Bryan's (1963) Readability Measure 1
const scoreDanielsonBryan = (str: string): number => {
  const c = getWords(str).map(el => el.length).reduce((acc, val) => acc + val, 0)
  const bl = wordCount(str) - 1
  const st = sentenceCount(str)
  return 1.0364 * c / bl + 0.0194 * c / st - 0.6059
}

// Danielson-Bryan's (1963) Readability Measure 2
const scoreDanielsonBryan2 = (str: string): number => {
  const c = getWords(str).map(el => el.length).reduce((acc, val) => acc + val, 0)
  const bl = wordCount(str) - 1
  const st = sentenceCount(str)
  return 131.059 - 10.364 * c / bl + 0.0194 * c / st
}

// Dickes-Steiwer Index
const scoreDickesSteiwer = (str: string): number => {
  const awl = averageWordLength(str)
  const asl = averageSentenceWords(str)
  const ttr = lexicalDiversity(str)
  return 235.95993 - 73.021 * awl - 12.56438 * asl - 50.0393 * ttr
}

// Easy Listening Formula
const scoreELF = (str: string): number => {
  const words = getWords(str)
  const nwsy = words.filter(el => singleSyllableCount(el) >= 2).length
  const nst = sentenceCount(str)
  return nwsy / nst
}

// Fucks' Style Characteristic
const scoreFSC = (str: string): number => {
  return averageWordLength(str) * averageSentenceLength(str)
}

// Strain Index
const scoreStrain = (str: string): number => {
  const s = sentenceCount(str)
  const sy = syllableCount(str)
  return sy / (s / 3) / 10
}

// Wheeler & Smith's (1954) Readability Measure
const scoreWheelerSmith = (str: string): number => {
  const asl = averageSentenceWords(str)
  const nw = wordCount(str)
  const nwsy = getWords(str).filter(el => singleSyllableCount(el) > 1).length
  return asl * 10 * nwsy / nw
}

const readingTime = (str: string, wpm = 200): string => {
  const count = wordCount(str)
  const duration = count / wpm * 60 * 1000
  const seconds = String(Math.floor(duration / 1000) % 60).padStart(2, '0')
  const minutes = String(Math.floor(duration / (1000 * 60)) % 60).padStart(2, '0')
  const hours = String(Math.floor(duration / (1000 * 60 * 60))).padStart(2, '0')
  return [hours, minutes, seconds].join(':')
}

// Speaking time
const speakingTime = (str: string, wpm = 160): string => {
  return readingTime(str, wpm)
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
  averageWordLength: 'Average word length',
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

// Get summary
const getSummary = (str: string): Record<keyof typeof vocabulary, number | string> => {
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

const getDescriptiveSummary = (str: string): Array<{ title: string, value: number | string }> => {
  const summary = getSummary(str)
  const keys = Object.keys(summary) as Array<keyof typeof vocabulary>
  return keys.map(key => {
    return { title: vocabulary[key], value: summary[key] }
  })
}

export default {
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
  scoreDaleChallOld,
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
