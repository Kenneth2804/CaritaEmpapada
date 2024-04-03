import React, { useState, useEffect } from 'react';
import './App.css';

const lyrics = [
  { time: 0, line: "Te juro que a nadie le he vuelto a decir" },
  { time: 5, line: "Que tenemos el récord del mundo en querernos." },
  { time: 11, line: "Por eso esperaba con la carita empapada" },
  { time: 15, line: "A que llegaras con rosas, con mil rosas para mí," },
  { time: 20, line: "Porque ya sabes que me encantan esas cosas" },
  { time: 24, line: "Que no importa si es muy tonto, soy así." },
  { time: 60, line: "Y aún me parece mentira que se escape mi vida" },
  { time: 65, line: "Imaginando que vuelves a pasarte por aquí," },
  { time: 70, line: "Donde los viernes cada tarde, como siempre," },
  { time: 75, line: "La esperanza dice \"quieta, hoy quizás sí...\"" }
  // Agrega el resto de las líneas con su respectivo timing
];

function App() {
  const [currentWords, setCurrentWords] = useState([]);
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    if (isShowing) {
      lyrics.forEach((line, index) => {
        setTimeout(() => {
          const words = line.line.split(' ').map((word, wordIndex) => ({
            word,
            delay: wordIndex * 0.1,
          }));
          setCurrentWords(words);

          if (index === lyrics.length - 1) {
            setTimeout(() => setIsShowing(false), line.line.split(' ').length * 100);
          }
        }, line.time * 1000);
      });
    }

    return () => {
      if (isShowing) {
        let maxDelay = lyrics[lyrics.length - 1].time + lyrics[lyrics.length - 1].line.split(' ').length * 0.1;
        setTimeout(() => setIsShowing(false), maxDelay * 1000);
      }
    };
  }, [isShowing]);

  return (
    <div className="App">
      <button onClick={() => setIsShowing(true)}>Mostrar Letra</button>
      <div>
        {currentWords.map(({ word, delay }, index) => (
          <span key={index} className="word" style={{ animationDelay: `${delay}s` }}>
            {word}&nbsp;
          </span>
        ))}
      </div>
    </div>
  );
}

export default App;