/* eslint-disable require-jsdoc */
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [imageResults, setImageResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=> {
    fetchImagesHandler();
  }, []);

  async function fetchImagesHandler(value: string ='random') {
    {console.log('value', value);}
    let image = value;
    if (value.length === 0) {
      image = 'random';
    }
    setIsLoading(true);
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {query: `${image}`, per_page: '30'},
      headers: {
        Authorization: 'Client-ID SE7DA-YDXVYGuHo8yONThilqg3-d9tD4UzI2A6fZVBQ',
      },
    });

    console.log('response', response);

    setImageResults(response.data.results);
    setIsLoading(false);
  }

  return (
    <>
      <div>
        <div className='navBar'>
          <div className='searchBar'>
            <button className='buttonSearch'>
              <img className='searchImg' src="https://img.icons8.com/ios-glyphs/30/000000/search--v1.png"/>
            </button>
            <input
              className= 'input'
              type='text'
              placeholder='Search...'
              onChange={(e) => fetchImagesHandler(e.target.value)} />
          </div>
        </div>
        <div className='imagesContainer'>
          {isLoading ? <p className='loading'></p> :
          {imageResults} && imageResults.map((image: any, index: number) =>
            <div className='imageWrapper' key={index}>
              <img className='images'
                key={image.id}
                src={image.urls.thumb}
              />
              <div className='contentContainer'>
                <p className='content'>
                  {`Photo by ${image.user.name}`}
                </p>
                <p className='content location'>
                  {`Location ${image.user.location}`}
                </p>
                <a
                  className='content clickFullScreen'
                  href={image.urls.regular}
                  target="_blank"
                  rel="noreferrer">Click to full screen </a>
              </div>
            </div>,
          )}
        </div>
      </div>
    </>
  );
}


export default App;
