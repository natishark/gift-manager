import { nanoid } from 'nanoid';

import { PersonGifts } from './personGifts';

class GiftMap {
  constructor(personList) {
    this.id = nanoid();
    this.personGiftMap = personList.map(p => { 
      const pgId = nanoid();
      return { key: pgId, value: new PersonGifts(pgId, p) };
    }).reduce((m, el) => {
      m[el.key] = el.value;
      return m;
    }, {});
  }

  static getAggregatedRate(giftMap, aggregationFunction) {
    return aggregationFunction(
      Object.values(giftMap.personGiftMap).map(pg => pg.rate)
    );
  }

  static getTotalPrice(giftMap) {
    let sum = 0;
    for (let pg of Object.values(giftMap.personGiftMap)) {
      sum += PersonGifts.getTotalPrice(pg);
    }

    return sum;
  }
}

export { GiftMap };
