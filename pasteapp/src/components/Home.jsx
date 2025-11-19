import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addPaste, updateTopaste } from "../redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.value);
  useEffect(() => {
    if (!pasteId) return;

    if (!allPastes || allPastes.length === 0) return;

    const paste = allPastes.find((p) => p.id === pasteId);

    if (!paste) return; // IMPORTANT SAFETY CHECK

    setTitle(paste.title);
    setValue(paste.content);
  }, [pasteId, allPastes]);

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      // update
      dispatch(updateTopaste(paste));
    } else {
      // create
      dispatch(addPaste(paste));
    }
    //after creaetio or updation
    setTitle("");
    setValue("");
    setSearchParams({});
  }
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-row gap-7 mb-4 place-content-between">
        {/* <input className='p-3 rounded-2xl place-content-evenly mt-2'
      type='text'
      placeholder='Enter the title here'
      value={title}
      onChange={(e)=>setTitle(e.target.value)}
      />
      <button className='p-3 rounded-2xl place-content-evenly mt-2'>
        {
       pasteId ? "Update my paste" : "Create My paste"
        }
      </button> */}
        <input
          className="p-3 font-mono rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2 w-1/2"
          type="text"
          placeholder="Enter the title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          onClick={createPaste}
          className="font-mono p-3 rounded-2xl bg-blue-500 text-white hover:bg-blue-600 shadow-md hover:shadow-lg transition-all duration-200 mt-2"
        >
          {pasteId ? "Update my paste" : "Create My Paste"}
        </button>
      </div>
      <div className="w-full mt-4">
        <textarea
          value={value}
          placeholder="Enter content here"
          onChange={(e) => setValue(e.target.value)}
          rows={20}
          className="w-full p-4 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-gray-800 font-mono bg-gray-50"
        />
      </div>
    </div>
  );
};

export default Home;
