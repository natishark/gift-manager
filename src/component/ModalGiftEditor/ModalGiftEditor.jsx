import './ModalGiftEditor.css';

import { ModalDialog } from "../tools/ModalDialog/ModalDialog";

import { useState } from "react";
import { useSettingsContext } from '../../context/SettingsContext/SettingsContext';

export function ModalGiftEditor({ isOpen, gift, person, onSave }) {
  const { currency } = useSettingsContext();
  const [editedGift, setEditedGift] = useState(gift);

  function handleGiftEdit(e) {
    setEditedGift({ ...editedGift, [e.target.id.split('-')[1]]: e.target.value });
  }

  return (
    <ModalDialog isOpen={isOpen} className="modal-edit-gift">
      <h2 className='modal-title'>Gift for {person}</h2>
      <label for="gift-name">Name</label>
      <input 
        className='gift-name input-line' 
        type="text" 
        id="gift-name" 
        name="Gift name" 
        value={editedGift.name}
        onChange={handleGiftEdit}
        placeholder='Gift name'
      />
      <label for="gift-price">Price</label>
      <div className='input-line complex'>
        <input 
          className='gift-price' 
          type="text" 
          id="gift-price" 
          name="Gift price" 
          value={editedGift.price}
          onChange={handleGiftEdit}
          placeholder='Price'
        />
        <p className='currency'>{currency}</p>
      </div>
      <label for="gift-link">Link</label>
      <input 
        className='gift-link input-line' 
        type="text" 
        id="gift-link" 
        name="Gift link" 
        value={editedGift.link}
        onChange={handleGiftEdit}
        placeholder='Link to the gift'
      />
      <button 
        className='ui-button confirm'
        onClick={() => onSave(editedGift)}
      >
        Save
      </button>
    </ModalDialog>
  )
}
