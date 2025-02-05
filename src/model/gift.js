import { nanoid } from 'nanoid';

class Gift {
  constructor(name = "", price = 0, link = "") {
    this.id = nanoid();
    this.name = name;
    this.price = price;
    this.link = link;
  }
}

export { Gift };
