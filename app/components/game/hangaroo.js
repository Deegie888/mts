'use client'

import { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import useSound from "use-sound";
import GameResultCard from "./gameResultCard";
import axios from "@/app/lib/axios";
import ImagePreview from "../imagePreview";

export default function Hangaroo ({ difficulty, level }) {

    const [wordToGuess, setWordToGuess] = useState('hello');
    const [guessedWord, setGuessedWord] = useState('_'.repeat(wordToGuess.length));
    const [attempts, setAttempts] = useState(6);
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [hints, setHints] = useState({});
    const [nextLevel, setNextLevel] = useState('')
    const [openInstructions, setOpenInstructions] = useState(true);
    const [beep] = useSound('/sfx/mixkit-water-sci-fi-bleep-902.wav');
    const [wrong] = useSound('/sfx/mixkit-losing-bleeps-2026.wav');
    const [bgm, {pause}] = useSound('/sfx/mixkit-tech-house-vibes-130.mp3')

    const firstRowKeys = [
      {value: 'q'},{value: 'w'},{value: 'e'},{value: 'r'},{value: 't'},{value: 'y'},{value: 'u'},{value: 'i'},
      {value: 'o'},{value: 'p'}
    ]
    const secondRowKeys = [
        {value: 'a'},{value: 's'},{value: 'd'},{value: 'f'},{value: 'g'},{value: 'h'},{value: 'j'},{value: 'k'},{value: 'l'}
    ]
    const thirdRowKeys = [
        {value: 'z'},{value: 'x'},{value: 'c'},{value: 'v'},{value: 'b'},{value: 'n'},{value: 'm'}
    ]

    const start = () => {
      bgm()
      setOpenInstructions(false)
    }

    const handleGuess = (e) => {
      const letter = e.target.value
      setGuessedLetters([...guessedLetters, letter])
      if (wordToGuess.includes(letter)) {
        beep()
        const newGuessedWord = wordToGuess
          .split('')
          .map((char, index) => (char === letter ? letter : guessedWord[index]))
          .join('');
        setGuessedWord(newGuessedWord);
      } else {
        wrong()
        setAttempts(attempts - 1);
      }
    };

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const chooseWord = wordArr => {
      const row = wordArr[Math.floor(Math.random() * wordArr.length)]
      const newWord = row?.answer?.replace(' ', '-')
      setWordToGuess(newWord.toLowerCase())
      const newGuessedWord = newWord.replace(/[^-]/g, '_')
      setGuessedWord(newGuessedWord)
      setHints(row)
      console.log(row)
    }

    useEffect(()=>{
      const getWord = async () => {
        try {
          await csrf()
          await axios.post('/api/game', {difficulty: difficulty, level:level})
          .then(res=>{
            chooseWord(res.data.data)
            setNextLevel(res.data.route)
          })
          .catch(err=>{
            console.log(err)
          })
        } catch (error) {
          console.log(error)
        }
      }
      getWord()
    }, [])
  
    const isGameOver = attempts === 0 || wordToGuess === guessedWord;

    return (
        <div className="w-full md:w-3/5 p-6 bg-blue-300 border border-white rounded-lg text-white">
          <div className={`${openInstructions ? 'fixed w-full h-full z-50 top-0 left-0 bg-slate-900/80 backdrop-blur-sm flex justify-center items-center' : 'hidden'}`}>
            <div className="w-full md:w-2/5 bg-blue-300 rounded-lg p-6">
              <div className="flex justify-end">
                <button
                  onClick={start}
                >
                  <AiOutlineClose className="w-5 h-5" />
                </button>
              </div>
              <p className="text-center text-xl font-bold mb-5">Instructions</p>
              <p>Guess the word just by looking at the picture below.</p>
              <p>It should give you a hint of what the word is.</p>
            </div>
          </div>
            {isGameOver && pause()}
            {!isGameOver && (
              <div className="space-y-2">
                <p className="text-center md:text-left">Attempts Left: {attempts}</p>
                <div className="w-full flex gap-2 justify-center">
                {wordToGuess.split('').map((letter, index) => (
                  <input
                    key={index}
                    type="text"
                    className="w-10 h-10 border border-white p-1 text-center text-slate-900"
                    value={guessedWord[index]}
                    onChange={() => {}}
                    readOnly
                  />
                ))}
                </div>
                <div className="space-y-2">
                  <div className="flex gap-2 justify-center">
                    {
                        firstRowKeys.map((item,id)=>{
                            return(
                                <input 
                                    key={id}
                                    onClick={handleGuess}
                                    disabled={guessedLetters.includes(item?.value)}
                                    type="button"
                                    className={`p-1 border rounded-lg text-xs w-7 h-7 ${guessedLetters.includes(item?.value) ? 'border-gray-600 text-gray-600' : 'border-white text-white hover:bg-cyan-600 hover:font-bold'}`}
                                    value={item.value}
                                />
                            )
                        })
                    }
                </div>
                <div className="flex gap-2 justify-center">
                    {
                        secondRowKeys.map((item,id)=>{
                            return(
                                <input 
                                    key={id}
                                    onClick={handleGuess}
                                    disabled={guessedLetters.includes(item?.value)}
                                    type="button"
                                    className={`p-1 border rounded-lg text-xs w-7 h-7 ${guessedLetters.includes(item?.value) ? 'border-gray-600 text-gray-600' : 'border-white text-white hover:bg-cyan-600 hover:font-bold'}`}
                                    value={item.value}
                                />
                            )
                        })
                    }
                </div>
                  <div className="flex gap-2 justify-center">
                      {
                          thirdRowKeys.map((item,id)=>{
                              return(
                                  <input 
                                      key={id}
                                      onClick={handleGuess}
                                      disabled={guessedLetters.includes(item?.value)}
                                      type="button"
                                      className={`p-1 border rounded-lg text-xs w-7 h-7 ${guessedLetters.includes(item?.value) ? 'border-gray-600 text-gray-600' : 'border-white text-white hover:bg-cyan-600 hover:font-bold'}`}
                                      value={item.value}
                                  />
                              )
                          })
                      }
                  </div>
                </div>
                <div className="flex justify-center">
                  {/* <ul>
                    <p>Hints:</p>
                    <li>-{hints?.hint1 ?? 'N/A'}</li>
                    <li>-{hints?.hint2 ?? 'N/A'}</li>
                    <li>-{hints?.hint3 ?? 'N/A'}</li>
                  </ul> */}
                  <div>
                    {
                      hints && <ImagePreview base64Image={hints?.image} alt={'image'} width={200} height={100} />
                    }
                  </div>
                </div>
              </div>
            )}
            {isGameOver && (
              <GameResultCard answer_id={hints?.id} result={wordToGuess === guessedWord} attempts={attempts} route={nextLevel} />
            )} 
        </div>
    )
}