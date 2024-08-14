"use client"

// context/MyContext.js
import { createContext, useState } from 'react';

// 컨텍스트 생성
const MyContext = createContext();

// 컨텍스트 프로바이더 작성
const MyProvider = ({ children }) => {
  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])

  return (
    <MyContext.Provider value={{ nodes, setNodes, edges, setEdges }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };
