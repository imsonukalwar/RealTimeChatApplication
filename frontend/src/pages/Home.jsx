import React from 'react'
import Sidebar from '../components/Sidebar'
import useGetMessage from '../custumHooks/getMessage'
import MessageArea from '../components/messageArea'

const Home = () => {
  useGetMessage()
  return (
    <div className='w-full h-[100vh] flex overflow-hidden'>
      <Sidebar/>
      <MessageArea/>
    </div>
  )
}

export default Home
