import { useState, useEffect, useCallback ,useRef} from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numAllow, setNumberAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState("");

  const generator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllow) str += "0123456789";
    if (charAllow) str += "!@#$%^&*";
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numAllow, charAllow,setPassword]);

  useEffect(() => {
    generator();
  }, [length, numAllow, charAllow, generator]);

 const passRef=useRef(null);
 const handleCopy=useCallback(() => {
  passRef.current?.select()
  window.navigator.clipboard.writeText(password)
  alert("password copied")
},[password])

  return (
    <div className='w-full max-w-md px-4 mx-auto my-8 text-orange-500 bg-gray-800 rounded-lg shadow-md'>
      <h1>Password Generator</h1>
      <div className="flex mb-4 overflow-hidden rounded-lg shadow">
        <input 
          type="text"
          value={password}
          readOnly
          ref={passRef}
          placeholder="Password"
          className="w-full p-2 text-black"
        />
        <button onClick={handleCopy} className="p-2 text-white bg-gray-700">Copy</button>
      </div>
      <div>
        <div className="mb-4">
          <input 
            type="range"
            min={6}
            max={100}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full"
          />
          <label>Length: {length}</label>
        </div>
        <div className="mb-2">
          <input
            type="checkbox"
            checked={numAllow}
            id="numberInput"
            onChange={() => setNumberAllow((prev) => !prev)}
          />
          <label htmlFor="numberInput" className="ml-2">Number</label>
        </div>
        <div className="mb-2">
          <input
            type="checkbox"
            checked={charAllow}
            id="charInput"
            onChange={() => setCharAllow((prev) => !prev)}
          />
          <label htmlFor="charInput" className="ml-2">Character</label>
        </div>
      </div>
    </div>
  );
}

export default App;
