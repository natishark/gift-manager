import { useState } from "react";
import { ModalDialog } from "../tools/ModalDialog/ModalDialog";

export function ModalDistributionCreator({ isOpen, onConfirm }) {
  const [input, setInput] = useState("");

  function handleModalConfirm() {
    onConfirm(input.split(",").map(name => name.trim()));
    console.log("ModalDistributionCreator, handleModalConfirm, input...")
    console.log(input)
    setInput("");
  }

  return (
    <ModalDialog isOpen={isOpen}>
      <div className="modal-create-distribution">
        <label htmlFor="person-list">Gifts for... (use ',' as a separator)</label>
        <input 
          type="text" 
          id="person-list" 
          name="person-list" 
          placeholder="Write people you love here..."
          value={input}
          onChange={e => setInput(e.target.value)}
          required 
        />
        <button onClick={handleModalConfirm}>Ok!</button>
      </div>
    </ModalDialog>
  )
}
