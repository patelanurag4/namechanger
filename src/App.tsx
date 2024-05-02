import { useEffect, useState } from "react";
import "./styles.css";

const synth = window.speechSynthesis;

export default function App() {
  const [name, setName] = useState("");
  const [newName, setNewName] = useState("");
  const voices = synth.getVoices();
  const [voiceSelected, setVoiceSelected] = useState(voices[0]);
  let speech = new SpeechSynthesisUtterance();

  speech.lang = "en";

  const x = () => {
    const temp = name.split(" ");
    let temp2: any = [];
    temp.forEach((n: any, i: number) => {
      if (i === 0) {
        temp2[i] = temp[temp.length - 1][i] + temp[i].slice(1);
        return;
      }
      temp2[i] = temp[i - 1][0] + temp[i].slice(1);
    });
    setNewName(temp2.length > 1 ? temp2.join(" ") : "");
  };

  const sayIt = async () => {
    speech.text = newName;
    speech.rate = 0.8;
    speech.voice = voiceSelected;
    await window.speechSynthesis.speak(speech);
    // setTimeout(() => window.speechSynthesis.cancel(), 4000);
  };

  return (
    <div className="App">
      <h1>Came Nhanger</h1>
      <p>Duniya dadal benge...</p>
      <input onChange={(e) => setName(e.target.value)} />
      <button onClick={x}>change</button>
      <h2>{newName}</h2>
      {newName.length ? (
        <>
          <button id="talk" onClick={sayIt}>
            Bolo
          </button>

          <hr />
          <h3>Select Voice</h3>
          <div style={{ display: "flex", flexWrap: "wrap", textAlign: "left" }}>
            {voices.map((voice: any) => {
              return (
                <div style={{ width: "220px" }}>
                  <input
                    type="radio"
                    value={voice}
                    name="voice"
                    onChange={() => {
                      setVoiceSelected(voice);
                    }}
                  />
                  {voice.name}
                </div>
              );
            })}
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
