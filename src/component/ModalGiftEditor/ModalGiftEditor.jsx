import './ModalGiftEditor.css';

import { ModalDialog } from "../tools/ModalDialog/ModalDialog";

import { useState } from "react";
import { useSettingsContext } from '../../context/SettingsContext/SettingsContext';
import { useTranslation } from 'react-i18next';

export function ModalGiftEditor({ isOpen, gift, person, onSave }) {
  const { t } = useTranslation();

  const { currency } = useSettingsContext();
  const [editedGift, setEditedGift] = useState(gift);

  function handleGiftEdit(e) {
    setEditedGift({ ...editedGift, [e.target.id.split('-')[1]]: e.target.value });
  }

  return (
    <ModalDialog isOpen={isOpen} className="modal-edit-gift">
      <h2 className='modal-title'>
        {t('ModalGiftEditor.title', {person})}
      </h2>
      <label htmlFor="gift-name">
        {t('ModalGiftEditor.label.name')}
      </label>
      <input 
        className='gift-name input-line' 
        type="text" 
        id="gift-name" 
        name="Gift name" 
        value={editedGift.name}
        onChange={handleGiftEdit}
        placeholder={t('ModalGiftEditor.placeholder.name')}
      />
      <label htmlFor="gift-price">
        {t('ModalGiftEditor.label.price')}
      </label>
      <div className='input-line complex'>
        <input 
          className='gift-price' 
          type="text" 
          id="gift-price" 
          name="Gift price" 
          value={editedGift.price ? editedGift.price : ''}
          onChange={handleGiftEdit}
          placeholder={t('ModalGiftEditor.label.price')}
        />
        <p className='currency'>{currency}</p>
      </div>
      <label htmlFor="gift-link">
        {t('ModalGiftEditor.label.link')}
      </label>
      <input 
        className='gift-link input-line' 
        type="text" 
        id="gift-link" 
        name="Gift link" 
        value={editedGift.link}
        onChange={handleGiftEdit}
        placeholder={t('ModalGiftEditor.placeholder.link')}
      />
      <button 
        className='ui-button confirm'
        onClick={() => onSave(editedGift)}
      >
        {t('ModalGiftEditor.confirm')}
      </button>
    </ModalDialog>
  )
}
