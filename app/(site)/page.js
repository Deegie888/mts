'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import useSound from 'use-sound'
import axios from '../lib/axios'
import Navigation from '../components/navigation'

export default function Home() {

  const router = useRouter()

  const [difficulty, setDifficulty] = useState('easy')
  const [easyLevels, setEasyLevels] = useState([])
  const [normalLevels, setNormalLevels] = useState([])
  const [hardLevels, setHardLevels] = useState([])
  const [hoverSound] = useSound('/sfx/mixkit-camera-shutter-click-1133.wav')

  const changeDifficulty = diff => {
    setDifficulty(diff)
  }

  const csrf = () => axios.get('/sanctum/csrf-cookie')
  
  const playThisLevel = (url) => {
    router.push(url)
  }

  useEffect(()=>{
    const getData = async () => {
      try {
        await csrf()
        await axios.get('/api/game')
        .then(res=>{
          console.log(res)
          setEasyLevels(res.data.easy)
          setNormalLevels(res.data.normal)
          setHardLevels(res.data.hard)
        })
        .catch(err=>{
          console.log(err)
        })
      } catch (error) {
        console.log(error)
      }
    }
    const checkDevice = async () => {
      try {
        await csrf()
        await axios.post('/api/student/validation', {student_id: localStorage.getItem('student_token')})
        .then(res=>{
          localStorage.setItem('student_token', res.data.student_id)
        })
        .catch(err=>{
          console.log(err)
          createNewDevice()
        })
      } catch (error) {
        console.log(error)
      }
    }
    const createNewDevice = async () => {
      try {
        await csrf()
        await axios.get('/api/student/create')
        .then(res=>{
          console.log(res)
          localStorage.setItem('student_token', res.data.student_id)
        })
        .catch(err=>{
          console.log(err)
        })
      } catch (error) {
        console.log(error)
      }
    }
    getData()
    if (typeof window !== 'undefined') {
      checkDevice()
    }
  }, [])

  return (
    <div>
      <Navigation />
      <main className="absolute z-10 text-white w-full h-full flex p-6 justify-center bg-gradient-to-b from-amber-300 from-30% to-teal-300">
        <div className='w-full md:w-3/5'>
          <div className='w-fullp-6 space-y-3'>
            <div className='flex justify-center'>
              <Image 
                src={'/images/tataramon-logo.png'}
                width={200}
                height={130}
                alt='logo'
              />
            </div>
            <p className='text-2xl text-center font-bold font-sans level-btn'>Select level</p>
            <div className='flex justify-center gap-2 p-10'>
              <button 
                onClick={()=>changeDifficulty('easy')}
                className={`w-1/3 md:w-1/6 p-2 rounded-lg bg-green-400 font-bold ring-white ${difficulty == 'easy' ? 'ring-4' : 'ring-2'}`}
              >
                easy
              </button>
              <button 
                onClick={()=>changeDifficulty('normal')}
                className={`w-1/3 md:w-1/6 p-2 rounded-lg bg-amber-400 font-bold ring-white ${difficulty == 'normal' ? 'ring-4' : 'ring-2'}`}
              >
                normal
              </button>
              <button 
                onClick={()=>changeDifficulty('hard')}
                className={`w-1/3 md:w-1/6 p-2 rounded-lg bg-red-600 font-bold ring-white ${difficulty == 'hard' ? 'ring-4' : 'ring-2'}`}
              >
                hard
              </button>
            </div>
          </div>
          
          <div className='w-full p-6 rounded-lg bg-blue-400 space-y-3'>
            
            <div className='rounded-lg p-10 w-full h-40 md:h-60 overflow-y-scroll'>
              {
                difficulty == 'easy' && (<div className='flex flex-wrap gap-5'>
                  {
                    easyLevels.map((item,id)=>{
                      return(
                        <button disabled={item?.active == 'no'} onMouseEnter={hoverSound} onClick={()=>playThisLevel('/game/easy/'+item?.level)} className={`block text-center level-btn w-full md:w-[18%] p-2 ring-2 text-xl font-bold ring-white rounded-lg ${item?.active == 'yes' ? 'bg-cyan-300' : 'bg-gray-400'} hover:bg-slate-600`} key={id}>{item?.level}</button>
                      )
                    })
                  }
                </div>)
              }
              {
                difficulty == 'normal' && (<div className='flex flex-wrap gap-5'>
                {
                  normalLevels.map((item,id)=>{
                    return(
                      <button onMouseEnter={hoverSound} onClick={()=>playThisLevel('/game/normal/'+item?.level)} className='block text-center w-full md:w-[18%] p-2 ring-2 text-xl font-bold ring-white rounded-lg bg-cyan-300 hover:bg-slate-600' key={id}>{item?.level}</button>
                    )
                  })
                }
              </div>)
              }
              {
                difficulty == 'hard' && (<div className='flex flex-wrap gap-5'>
                {
                  hardLevels.map((item,id)=>{
                    return(
                      <button onMouseEnter={hoverSound} onClick={()=>playThisLevel('/game/hard/'+item?.level)} className='block text-center w-full md:w-[18%] p-2 ring-2 text-xl font-bold ring-white rounded-lg bg-cyan-300 hover:bg-slate-600' key={id}>{item?.level}</button>
                    )
                  })
                }
              </div>)
              }
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
