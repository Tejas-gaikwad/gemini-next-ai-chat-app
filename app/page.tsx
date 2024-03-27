"use client";

import axios from "axios";
import Image from "next/image";
import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';



interface UserQueryAndAnswer {
  query:string;
  ai_answer:string,
}

export default function Home() {

  const api_key = "AIzaSyAidFC3J2Jd19YrWZwHHh14aIOBOrQeZXY";
  // process.env.api_key;


  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const[answer, setAnswer] = useState('');

  const [queriesAndAnswers, setQueriesAndAnswers] = useState<UserQueryAndAnswer[]>([]);

  async function generateChat(query : string)  {

    console.log("User query ->>>>>>>    "+query);

    setLoading(true);
    const res = await axios({
      
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${api_key}`,
      method:"POST",
      data:{
        "contents":[{"parts":[{"text": query
      }]}]
      }});

      console.log("response res status ->>>>>>>    "+res.status);
      console.log("response res data   ->>>>>>>    "+res.data['candidates'][0]['content']['parts'][0]['text']);
      const ans = res.data['candidates'][0]['content']['parts'][0]['text'];
      setAnswer(ans);
      const newQueryAndAnswer  =  {
        query: '',
        ai_answer: ''
    };
    // Update the state with the new instance added to the list
    setQueriesAndAnswers([...queriesAndAnswers, newQueryAndAnswer]);
    

    console.log("queriesAndAnswers  -----      "+queriesAndAnswers);
    setValue('');
    setLoading(false);

  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-950 w-screen">
      <div className="z-10 items-center justify-center font-mono text-sm lg:flex flex-col w-screen">

        <p className="text-5xl font-bold my-12 ">
          Chat Bot App
        </p>


       <div className=" flex-col border-blue-50 border-2 p-12 border-rad rounded-lg w-2/4">
          <p className="my-4 text-lg">
            Enter text here
          </p>
          
          <div className="flex flex-row">
          <input
                className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full "
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
          />
            <button className="bg-blue-500 p-3 mx-4 rounded-lg hover:cursor-pointer" onClick={() => {generateChat(value)}}>{ loading ? <CircularProgress size={"20px"} sx={{color:'white', scale:"1.2"}}/> :  "Send"}</button>
          </div>
       </div>
                {/* // value={}
                // onChange={(e) => onChange(e.target.value)} */}
                <div className="w-2/4 my-8">
                  {queriesAndAnswers.map((item, index) =>{
                    return (
                      <div key={index}>
                        <div>{item.query}</div>
                        <div>{item.ai_answer}</div>
                      </div>
                    );
                  })}
                </div>
    </div>
   
    </main>
  );
}
