import { useEffect, useState } from 'react'


function App() {
  const [imageArray, setImageArray] = useState([])
  const [loadSate, setLoadState] = useState("")
  const [msg, setMsg] = useState("")
  

  function handleSubmit(e){
    e.preventDefault()
    setLoadState("Fetching Images, Please Wait....")
    const formData = new FormData(e.target.form)
     const rover = formData.get("rover")
     const camera = formData.get("cam-select")
     const sol = formData.get("SOL")
     fetch(`https://curiosity-server.onrender.com/search?cam=${camera}&rover=${rover}&sol=${sol}`)
     .then((data)=> data.json())

     .then((data) => { 
      const photoUrls = data.photos.map(photo => photo.img_src)
      console.log(data)
      setImageArray(photoUrls)
      console.log(imageArray)      
      setLoadState("")
      setMsg("Sorry, No photos found. Try another camera or sol!")
    })
    
       
  }

  return (
    <div className="App">
     <h1>Welcome to Curiosity!</h1>
     <p>Access NASA's Curiosity, Opportunity, and Spirit rovers to get Mars photos!</p>
     <div>
        <form>

        <select id="rover-select" name="rover">
        <option value="curiosity">Curiosity</option>
        <option value="Opportunity">opportunity</option>
        <option value="Spirit">spirit</option>
        </select>
        <label className='cam' for="cam-select">Select a rover camera: </label>
        <select id="cam-select" name="cam-select">
        <option value="FHAZ">FHAZ</option>
        <option value="RHAZ">RHAZ</option>
        <option value="MAST">MAST</option>
        <option value="MAHLI">MAHLI</option>
        <option value="MARDI">MARDI</option>
        <option value="NAVCAM">NAVCAM</option>
        <option value="PANCAM">PANCAM</option>
        <option value="MINITES">MINITES</option>
        </select>
        <label for="SOL">Select SOL: </label>
        <input type="range" id="sol-range" name="SOL" min="0" max="1000" />
       
        <button type='submit' onClick={handleSubmit}>Submit</button>
         
        </form>  
             
      </div>

  
      <div className="photo-container">
  {imageArray && imageArray.length > 0 ? (
    imageArray.map((img) => {
      return <img src={img} key={img} />;
    })
  ) : (
    <div className='msg'>{msg}<br/>
    <h2> Did You Know?</h2>
     <h4>{facts[Math.floor(Math.random() * facts.length)]}</h4>
    
    </div>
  )}
</div>
<div className='load'>{loadSate}</div> 
     <p>Powered by NASA</p>
    </div>
  )
}

const facts = ['A Martian day- or Sol- in the life of a rover is 24 hours and 37 minutes long, Starting from the day of landing!',
"The Mars Curiosity rover has six wheels, each of which is about 50 centimeters (20 inches) in diameter. This gives the rover a total wheel diameter of around 1 meter (3.3 feet)!",
"The first successful Mars mission was the Viking 1 lander, which landed on Mars on July 20, 1976. The Viking lived on Mars for 6 years and 116 days!",
"The Mars Exploration Rovers, Spirit and Opportunity, were designed to last for just 90 sols but both operated for many years beyond their expected lifetime. Spirit operated on Mars from 2004 to 2010, while Opportunity operated from 2004 to 2018!",
"NASA's Perseverance rover, which landed on Mars in February 2021, carries a small helicopter called Ingenuity. Ingenuity is the first powered, controlled flight on another planet, and has successfully completed several flights on Mars!"
]













export default App
