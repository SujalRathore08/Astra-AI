import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context=createContext();

const ContextProvider=(props)=>{

    const [input,setInput]=useState("")
    const [recentPrompt,setRecentPrompt]=useState("")
    const [prevPrompts,setPrevPrompts]=useState([])
    const [showResult,setShowResult]=useState(false);
    const [loading,setLoading]=useState(false)
    const [resultData,setResultData]=useState("")
    const[theme,setTheme]=useState("light")

    const delayPara=(index,nextWord)=>{
       setTimeout(()=>{
         setResultData(prev => prev+nextWord)
       },75*index)
    }
    
    const newChat=()=>{
        setLoading(false)
        setShowResult(false);
    }

    const onSent=async(prompt)=>{

        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response="";
        if(prompt!==undefined){
            response=await runChat(prompt);
            setRecentPrompt(prompt);
        }
        else{
            setPrevPrompts(prev=>[...prev,input]);
            setRecentPrompt(prompt);
            response=await runChat(input);
        }   
        console.log("Response from chat:", response);
        let responseArray=response.split("**");
        console.log("Response array:", responseArray);
        let newStringResponse="";
        for( let i=0; i<responseArray.length; i++){
            if(i===0 || i%2 !==1){
                newStringResponse+=responseArray[i]
            }
            else{
                newStringResponse+= "<b>"+responseArray[i]+"</b>"
            }
        }
        console.log("New string response:", newStringResponse);

        let newStringResponse2=newStringResponse.split("*").join("</br>");

        console.log("New string response 2:", newStringResponse2);
        
        let finalResponse = newStringResponse2.split(" ");

        console.log("Final response:", finalResponse);
        for( let i=0; i<finalResponse.length; i++){
            const nextWord=finalResponse[i];
            delayPara(i,nextWord+" ")
        }
        setResultData(newStringResponse2)

        setLoading(false);
        setInput("");

    }
    
    const contextValue={
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        setShowResult,
        loading,
        resultData,
        setInput,
        setLoading,
        input,
        setResultData,
        newChat,
        theme,
        setTheme
    }

    return (
        <Context.Provider value={contextValue}>
           {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;