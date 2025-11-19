import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removePaste } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Paste = () => {
  const navigate = useNavigate();
  const pastes = useSelector((state) => state.paste.value);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handledelete(pasteId) {
    dispatch(removePaste({ id: pasteId }));
  }

  function handleShare(pasteId) {
    const shareUrl = `${window.location.origin}/?pasteId=${pasteId}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success("Share link copied! 📋");
  }

  return (
    <div className="font-mono">
      <div>
        <input
          type="search"
          placeholder="Search your pastes.."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-xl py-3 px-4 rounded-xl bg-gray-800/60 backdrop-blur border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder-gray-400 text-gray-200 shadow-lg mt-30"
        />
      </div>

      <div className="flex flex-col gap-5 mt-10">
        {filteredData.length > 0 &&
          filteredData.map((paste) => (
            <div key={paste.id} className="border mt-10 p-4">
              <h2 className="text-xl font-semibold">{paste.title}</h2>
              <div className="mt-2">{paste.content}</div>

              <div className="flex flex-row gap-4 place-content-evenly p-10">
                <button onClick={() => navigate(`/?pasteId=${paste.id}`)}>
                  Edit
                </button>
                <button onClick={() => navigate(`/pastes/${paste.id}`)}>
                  View
                </button>

                <button onClick={() => handledelete(paste.id)}>Delete</button>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(paste.content);
                    toast.success("Copied!");
                  }}
                >
                  Copy
                </button>

                <button onClick={() => handleShare(paste.id)}>Share</button>
              </div>

              <div>{paste.createdAt}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Paste;
