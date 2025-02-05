import { arrayMove as dndKitArrayMove } from "@dnd-kit/sortable";

class PersonGifts {
  constructor(id, person) {
    this.id = id;
    this.person = person;
    this.rate = 0;
    this.gifts = [];
  }

  static getTotalPrice(personGifts) {
    let sum = 0;
    for (let gift of personGifts.gifts) {
      sum += gift.price;
    }

    return sum;
  }

  static insertGiftByIndex(personGifts, index, gift) {
    return {
      ...personGifts,
      gifts: [
        ...personGifts.gifts.slice(0, index), 
        gift, 
        ...personGifts.gifts.slice(index)
      ]
    };
  }

  static removeGiftByIndex(personGifts, index) {
    return {
      ...personGifts,
      gifts: [
        ...personGifts.gifts.slice(0, index), 
        ...personGifts.gifts.slice(index + 1)
      ]
    };
  }

  static removeGiftById(personGifts, id) {
    return this.removeGiftByIndex(
      personGifts,
      personGifts.gifts.findIndex(gift => gift.id === id)
    )
  }

  static updateGiftByIndex(personGifts, newGift, index) {
    return {
      ...personGifts,
      gifts: [
        ...personGifts.gifts.slice(0, index),
        newGift,
        ...personGifts.gifts.slice(index + 1)
      ]
    };
  }

  static updateGift(personGifts, newGift) {
    return this.updateGiftByIndex(
      personGifts,
      newGift,
      personGifts.gifts.findIndex(gift => gift.id === newGift.id)
    );
  }

  static arrayMove(personGifts, from, to) {
    return {
      ...personGifts,
      gifts: dndKitArrayMove(personGifts.gifts, from, to)
    };
  }
}

export { PersonGifts };
