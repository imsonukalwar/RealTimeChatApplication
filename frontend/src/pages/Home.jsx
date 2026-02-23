import React from 'react'
import Sidebar from '../components/sidebar'
import MessageArea from '../components/messageArea'
import useGetMessage from '../custumHooks/getMessage'

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
