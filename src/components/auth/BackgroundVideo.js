import React from 'react'
import '../../style.css'


const BackgroundVideo=()=>{
return (
    <>
    <div class="overlay"></div>
    <div>
        <iframe pointer-events="none" width="100vw" height="480" src="https://www.youtube.com/embed/1vavrGS4hdM?autoplay=1&mute=1&showinfo=1&loop=1&playlist=1vavrGS4hdM&playsinline=0&controls=0&rel=0&start=12" title="Dolomites Cinematic Film 4K with the DJI Air 2s" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen id="loginVideo"></iframe>
    </div>
    </>
)
}

export default BackgroundVideo