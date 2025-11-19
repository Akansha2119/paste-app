import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Viewpaste = () => {
  const { id } = useParams(); // get URL id
  const pastes = useSelector((state) => state.paste.value);

  const existingPaste = pastes.find((p) => p.id === id);

  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");

  // Load data (READ ONLY)
  useEffect(() => {
    if (existingPaste) {
      setTitle(existingPaste.title);
      setValue(existingPaste.content);
    }
  }, [existingPaste]);

  return (
    <div>
      <div className="flex flex-row gap-7 mb-4 place-content-between">
        <input
          className="p-3 font-mono rounded-2xl border border-gray-300 bg-gray-200 cursor-not-allowed mt-2 w-1/2"
          type="text"
          value={title}
          disabled    // <-- disabled so user cannot edit
        />

        {/* <button
          className="font-mono p-3 rounded-2xl bg-gray-500 text-white shadow-md mt-2 cursor-not-allowed"
          disabled
        >
          View Paste
        </button> */}
      </div>

      <div className="w-full mt-4">
        <textarea
          value={value}
          rows={20}
          disabled     // <-- disabled so user cannot edit
          className="w-full p-4 border border-gray-300 rounded-2xl bg-gray-200 cursor-not-allowed text-gray-800 font-mono"
        />
      </div>
    </div>
  );
};

export default Viewpaste;
