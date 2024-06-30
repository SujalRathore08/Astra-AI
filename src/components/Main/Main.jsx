import React, { useContext } from 'react'
import "./Main.css"
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
function Main() {

  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input, theme, setTheme } = useContext(Context)

  return (
    <div className='main' id={theme}>
      <div className='nav'>
        <p>Astra-AI</p>
        <div className='theme-and-user-icon'>
          {theme === "light" && <LightModeIcon onClick={() => setTheme(prev => prev === "light" ? "dark" : "light")} />}
          {theme === "dark" && <DarkModeIcon onClick={() => setTheme(prev => prev === "dark" ? "light" : "dark")} />}
          <img src={assets.user_icon} alt="" />
        </div>

      </div>
      <div className='main-container'>

        {!showResult
          ?
          <>
            <div className='greet'>
              <p><span>Hello,Sujal</span></p>
              <p>How can I help you today</p>
            </div>
            <div className='cards'>
              <div className='card' onClick={(e) => setInput(e.currentTarget.querySelector('p').textContent)}>
                <p>Suggest beautiful places to see on an upcoming road trip.</p>
                <img src={assets.compass_icon} alt="" />
              </div>

              <div className='card' onClick={(e) => setInput(e.currentTarget.querySelector('p').textContent)}>
                <p>Briefly summarize this concept.</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className='card' onClick={(e) => setInput(e.currentTarget.querySelector('p').textContent)}>
                <p>Brainstorm team bonding activities for our work retreat.</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className='card' onClick={(e) => setInput(e.currentTarget.querySelector('p').textContent)}>
                <p>Improve the readability of the following code.</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
          :
          <div className='result'>
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading
                ?
                <div className="loader">
                  <hr></hr>
                  <hr></hr>
                  <hr></hr>
                </div>
                :
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              }

            </div>
          </div>
        }


        <div className='main-bottom'>
          <div className='search-box'>
            <input onChange={(e) => setInput(e.target.value)} value={input} type='text' placeholder='Enter a prompt here'></input>
         
             

            <div>
              <img src={assets.gallery_icon} alt=""></img>
              <img src={assets.mic_icon} alt=""></img>
              {input ? <img onClick={() => onSent()} src={assets.send_icon} alt=""></img> : null}
            </div>
          </div>
          <p className='bottom-info'>
            Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  )
}

export default Main

