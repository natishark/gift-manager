import './PersonGiftsMatch.css';

import AddIcon from '../../resources/icons/add.svg';

import { GiftOption } from "../GiftOption/GiftOption";
import { PersonGifts } from '../../model/personGifts';
import { getColorByRate } from '../../utils/color/colorRatingSystem';
import { RatingSetter } from '../tools/RatingSetter/RatingSetter';

import { useState } from 'react';

import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { Gift } from '../../model/gift';
import { useSettingsContext } from '../../context/SettingsContext/SettingsContext';

export function PersonGiftsMatch({ personGifts, onUpdate }) {
  const settingsContext = useSettingsContext();

  const [isEditRateMode, setEditRateMode] = useState(false);

  const { setNodeRef } = useDroppable({ id: personGifts.id });

  function handleRateChange(newRate) {
    onUpdate({
      ...personGifts, 
      rate: newRate
    })
    setEditRateMode(false);
  }

  function handleGiftDelete(id) {
    onUpdate(PersonGifts.removeGiftById(personGifts, id));
  }

  function handleGiftEdit(editedGift) {
    onUpdate(PersonGifts.updateGift(personGifts, editedGift));
  }

  function handleGiftAddition() {
    onUpdate(PersonGifts.insertGiftByIndex(personGifts, personGifts.gifts.length, new Gift()));
  }

  const gifts = personGifts.gifts.map(gift => (
    <li key={gift.id} id={gift.id}>
      <GiftOption
        gift={gift}
        person={personGifts.person}
        onDelete={() => handleGiftDelete(gift.id)}
        onEdit={handleGiftEdit}
      />
    </li>
  ));

  return (
    <SortableContext id={personGifts.id} items={personGifts.gifts} strategy={rectSortingStrategy}>
      <div 
        className='pg-match' 
        style={{backgroundColor: getColorByRate(settingsContext.ratingTheme, personGifts.rate, settingsContext.ratingNumber)}}
      >
        <div className="person-side">
          <div className="wrapper">
            <p className='person-name'>{personGifts.person}</p>
            <button 
              className='change-rating-btn' 
              onClick={() => setEditRateMode(true)}
              style={{background: `linear-gradient(45deg, ${settingsContext.ratingTheme.worstOptionColor}, ${settingsContext.ratingTheme.bestOptionColor})`}}
            >
            </button>
            {isEditRateMode && <RatingSetter 
              className='rating-setter'
              activeRate={personGifts.rate}
              onChoose={handleRateChange} />}
          </div>
          <p>{PersonGifts.getTotalPrice(personGifts)}{settingsContext.currency}</p>
        </div> 
        <div 
          className="gifts-side"
          ref={setNodeRef}
        >
          <ul 
            className="gift-list" 
          >
            {gifts}
          </ul>
          <button className="icon add-gift-btn" onClick={handleGiftAddition}>
            <img src={AddIcon} alt="add icon"></img>
          </button>
        </div>
      </div>
    </SortableContext>
  );
}
