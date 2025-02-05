import { PersonGifts } from "../model/personGifts";
import { randomColorList } from "../utils/color/pdf/randomColorList";
import { GiftMap } from "../model/giftMap";
import { PdfContentBuilder } from "./PdfContentBuilder";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.addVirtualFileSystem(pdfFonts);

function giftMapToPdf(giftMap, currency) {
  const personGiftList = Object.values(giftMap.personGiftMap);
  const colorSequence = randomColorList(personGiftList.length + 1);

  const builder = new PdfContentBuilder().initTable({
    columnWidths: [ '25%', '15%', '45%', '15%' ],  
    boldScheme: [true, true, false, false], 
    alignmentScheme: ['left', 'right', 'left', 'right'] 
  }).addTableHeader(
    ['Total', `${GiftMap.getTotalPrice(giftMap)}${currency}`, '', ''], 
    Array(4).fill(colorSequence[0].primary)
  );

  personGiftList.forEach((pg, pgIndex) => {
    const colorObj = colorSequence[pgIndex + 1];

    pg.gifts.forEach((g, gIndex) => {
      builder.addTableRow(
        [
          gIndex === 0 ? pg.person : '',
          gIndex === 0 ? `${PersonGifts.getTotalPrice(pg)}${currency}` : '',
          g.link ? { text: g.name, link: g.link, decoration: 'underline' } : g.name,
          `${g.price}${currency}`
        ],
        [colorObj.primary, colorObj.primary, colorObj.secondary[gIndex % 2], colorObj.secondary[gIndex % 2]]
      )
    })
  })

  const docDefinition = builder.finishTable();

  return pdfMake.createPdf(docDefinition);
}

export { giftMapToPdf };
