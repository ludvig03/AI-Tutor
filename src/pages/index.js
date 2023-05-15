import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
export default function Home() {

  const [form, setFormValue] = useState('');

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "AI",
      message: "Hi, i am you school tutor AI. How can i help you?",
      time: "12:00"
    }
  ]);

  const sendMessage = (e) => {
    e.preventDefault();
    setMessages([...messages, {
      id: messages.length + 1,
      sender: "Deg",
      message: form,
      time: "12:00"
    }])



    console.log(messages)

    fetch('https://6c6e-2a02-fe1-1280-1a00-bd4e-ee57-bd33-8343.ngrok-free.app/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({melding: form})
    })
    .then(res => res.json())
    .then(data => {
      setMessages([...messages, {
        id: messages.length + 1,
        sender: "AI",
        message: data,
        time: "12:00"
      }])
      console.log(messages)
    })
    .catch(err => console.log(err));

    setFormValue('');
  }




  return (
    <div className=" h-screen">

      <div className="h-20 flex fixed top-0 bg-gray-500 w-full">
        <h1 className="text-white flex-grow my-auto pl-6 text-xl">AI leksehjelp på engelsk</h1>
        <select className="w-28 h-10 border-2 rounded-md my-auto mr-6">
          <option value="1">Historie</option>
          <option value="2">Gym</option>
          <option value="3">Naturfag</option>
          <option value="4">Psykologi</option>
        </select>
      </div>

      <div className="mt-24 pb-24">
        {messages.map((message) => (
          (message.sender == "AI") ?
          <div className="my-8" key={message.id}>
            <p className='pl-3 text-white font-semibold'>{message.sender} - {message.time}</p>
            <div className="w-3/4 bg-gray-400 rounded-xl m-2">
              <p className="text-white text-xl p-2">{message.message}</p>
            </div>
          </div>
          :
          <div className="my-8" key={message.id}>
            <p className='pl-3 text-white font-semibold ml-auto w-28'>{message.sender} - {message.time}</p>
            <div className="w-3/4 bg-gray-400 rounded-xl m-2 ml-auto">
              <p className="text-white text-xl p-2">{message.message}</p>
            </div>
          </div>
        ))}

      </div>

      <form  className="fixed bottom-0 h-20 w-screen border-t-2 border-gray-400 flex bg-gray-500">
        <div className="pl-2 w-3/4 h-3/4 mt-3	">
          <input value={form} onChange={(e) => setFormValue(e.target.value)} className="w-full h-full rounded-xl p-3"></input>
        </div>
        <button onClick={sendMessage} className='ml-auto mr-4 active:scale-90 transition duration-150'>

        <PaperAirplaneIcon className="w-10 h-10 my-auto text-white " />


        </button>
      </form>
    </div>
  )
}
