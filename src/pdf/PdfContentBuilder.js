class PdfContentBuilder {
  constructor(fontSize = 8, pageMargins = [50, 50]) {
    this.defaultStyle = {fontSize};
    this.pageMargins = pageMargins;
    this.content = [];
  }

  initTable({
    columnWidths, 
    sideMargin = 9, 
    verticalMargin = 5, 
    boldScheme, 
    alignmentScheme
  }) {
    if (!boldScheme) {
      boldScheme = Array(columnWidths.length).fill(false);
    }

    if (!alignmentScheme) {
      alignmentScheme = Array(columnWidths.length).fill('left');
    }

    this.content.push({
      layout: 'headerLineOnly',
      table: {
        headerRows: 0,
        widths: columnWidths,
        body: []
      },
      sideMargin,
      verticalMargin,
      boldScheme,
      alignmentScheme
    });

    return this;
  }

  finishTable() {
    const tableObject = this.content[this.content.length - 1];
    this.content[this.content.length - 1] = { layout: tableObject.layout, table: tableObject.table };
    return this;
  }

  addTableHeader(textList, colorList) {
    const tableInfo = this.content.at(-1);
    
    const row = this.getTableRow(textList, colorList);

    tableInfo.table.body.splice(tableInfo.table.headerRows, 0, row);
    tableInfo.table.headerRows = tableInfo.table.headerRows + 1;
    return this;
  }

  addTableRow(textList, colorList) {
    const tableInfo = this.content.at(-1);
    
    const row = this.getTableRow(textList, colorList);

    tableInfo.table.body.push(row);
    return this;
  }

  getTableRow(textList, colorList) {
    const tableInfo = this.content.at(-1);

    if (!colorList) {
      colorList = Array(tableInfo.table.widths.length).fill('#ffffff');
    }  

    const cellList = textList.map((text, index) => {
      if (typeof text !== "object") {
        text = {text};
      }
      return {
        ...text,
        marginTop: tableInfo.verticalMargin,
        marginBottom: tableInfo.verticalMargin,
        fillColor: colorList[index],
        bold: tableInfo.boldScheme[index],
        alignment: tableInfo.alignmentScheme[index],
      };
    });

    cellList[0].marginLeft = tableInfo.sideMargin;
    cellList[cellList.length - 1].marginRight = tableInfo.sideMargin;

    return cellList;
  }

}

export { PdfContentBuilder };
