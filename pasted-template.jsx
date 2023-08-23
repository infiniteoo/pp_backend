const ReactPDF = require("@react-pdf/renderer");
const React = require("react");
const styles = require("./pdfStyles");





const PDF = ({ data }) => {
  console.log("data in PDF generation: " + JSON.stringify(data));
  /* reverse the order of the data array */
 
  

  const pages = [];

  /* loops over each object in data to create a page */
  data.forEach((item, index) => {
    for (let i = 0; i < item.numberofpallets; i++) {

      
      
      pages.push(
        React.createElement(
          ReactPDF.Page,
          { key: `${index}_${i}`, data: item },
          React.createElement(
            ReactPDF.View,
            { style: styles.headerContainer },
            React.createElement(
              ReactPDF.View,
              { style: styles.columnParent },
              React.createElement(ReactPDF.Image, {
                style: styles.image,
                src: "GXO_logo.png",
              })
            ),
            React.createElement(
              ReactPDF.Text,
              { style: styles.storeName },
              item.customer
            ),
            React.createElement(ReactPDF.View, { style: styles.divider }),
            React.createElement(
              ReactPDF.View,
              null,
              React.createElement(
                ReactPDF.Text,
                { style: styles.statement },
                item.ordernumber
              ),
              React.createElement(
                ReactPDF.Text,
                { style: styles.paragraph },
                "Pallet " + (i + 1) + " of " + item.numberofpallets
              )
              ,
              React.createElement(
                ReactPDF.Text,
                { style: styles.paragraph },
                "Delivery Sequence #" + item.deliverysequence
              )
            )
          )
        )
      );
    }
  });
  return React.createElement(ReactPDF.Document, null, pages);
};

module.exports = async function renderPDF(data) {
  const stream = await ReactPDF.renderToStream(
    React.createElement(PDF, { data })
  );
  return stream;
};