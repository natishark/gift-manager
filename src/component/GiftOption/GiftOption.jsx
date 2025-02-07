import './GiftOption.css';

import EditIcon from '../../resources/icons/icons-edit.svg';
import DeleteIcon from '../../resources/icons/delete.svg';
import DragIcon from '../../resources/icons/drag-icon.svg';

import { useState } from 'react';

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import { ModalGiftEditor } from '../ModalGiftEditor/ModalGiftEditor';
import { useSettingsContext } from '../../context/SettingsContext/SettingsContext';
import { useTranslation } from 'react-i18next';

export function GiftOption({ gift, onDelete, onEdit, person }) {
  const { t } = useTranslation();

  const { currency } = useSettingsContext();

  const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({ id: gift.id });
 
  const [isEditMode, setEditMode] = useState(false);

  function handleEdit(editedGift) {
    setEditMode(false);
    onEdit({
      ...editedGift,
      price: Number(editedGift.price)
    });
  }

  const iconsBar = (
    <nav className='gift-option-nav'>
      <button className='icon' onClick={() => setEditMode(true)}>
        <img src={EditIcon} alt={t('icon.alt.edit')}></img>
      </button>
      <button className="icon delete">
        <img src={DeleteIcon} onClick={onDelete} alt={t('icon.alt.delete')}></img>
      </button>
      <button 
        className='icon drag'
        {...listeners}
        {...attributes}
      >
        <img src={DragIcon} alt={t('icon.alt.grab')}></img>
      </button>
    </nav>
  );

  return (
    <div 
      ref={setNodeRef}
      style={{
        transform: CSS.Translate.toString(transform),
        transition,
      }}
      id={gift.id}
      className={`gift-option ${isDragging ? 'dragging' : ''}`}
    >
      {gift.link ? 
        <a href={gift.link} className='gift-name'>{gift.name}</a> :
        <p className='gift-name'>
          {gift.name ? 
            gift.name : 
            <em className='temporary'>{t('editPrompt')}</em>}
        </p>}
      <p className='gift-price'>{gift.price}{currency}</p>
      {iconsBar}
      <ModalGiftEditor 
        isOpen={isEditMode} 
        gift={gift} 
        person={person}
        onSave={handleEdit}  
      />
    </div>
  )
}
