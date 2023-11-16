import React, { useEffect, useState } from 'react';
import Quagga from 'quagga';

function BarcodeScanner(props) {
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const [productname, setproductname] = useState("");
  const handlesave = (b) => {
    //     const apiUrl = `https://world.openfoodfacts.net/api/v2/product/${b}?fields=product_name`;



    // fetch(apiUrl)
    //   .then((response) => {

    //     return response.json();
    //   })
    //   .then((data) => {

    //     props.scanning(data);

    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
    props.scanning({
      "product": {
        "nutriments": {
          "carbohydrates": 57.5,
          "carbohydrates_100g": 57.5,
          "carbohydrates_unit": "g",
          "carbohydrates_value": 57.5,
          "energy": 2255,
          "energy-kcal": 539,
          "energy-kcal_100g": 539,
          "energy-kcal_unit": "kcal",
          "sugars": 56.3,
          "sugars_100g": 56.3,
          "sugars_unit": "g",
          "sugars_value": 56.3
        },
        "nutriscore_data": {
          "energy": 2255,
          "energy_points": 6,
          "energy_value": 2255,
          "sugars_points": 10,
          "sugars_value": 56.3
        },
        "nutrition_grades": "e",
        "product_name": "Nutella"
      },
      "status": 1,
      "status_verbose": "product found"
    })
  }



  const initScanner = () => {
    Quagga.init({
      inputStream: {
        name: 'Live',
        type: 'LiveStream',
        target: document.querySelector('#scanner-container'),
        constraints: {
          width: 640,
          height: 480,
          facingMode: 'environment', // Use the device's rear camera
        },
      },
      decoder: {
        readers: ["ean_reader"], // Change the reader type according to your barcode format
      },
    }, function (err) {
      if (err) {
        console.error(err);
        return;
      }
      Quagga.start();
    });

    Quagga.onDetected((result) => {
      const barcodeNumber = result.codeResult.code;
      // setbarcode(barcodeNumber);
      Quagga.stop();
      setIsScannerOpen(false);
      // console.log(barcode);
      handlesave(barcodeNumber);
      console.log('Detected barcode: ' + barcodeNumber);

      // You can now use the barcodeNumber as needed in your application.
    });

    return () => {
      Quagga.stop();

    };
  }

  const toggleScanner = () => {
    if (isScannerOpen) {
      Quagga.stop();
    }
    else {
      initScanner();
    }
    console.log("heelo");
    setIsScannerOpen(!isScannerOpen);
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      marginRight: "20px"
    }}>
      <button onClick={toggleScanner}>
        {isScannerOpen ? 'Close Scanner' : 'Open Scanner'}
      </button>
      <div id="scanner-container"></div>

    </div>
  );

}

export default BarcodeScanner;


// // //import React from 'react'
// import React, { useEffect, useState } from 'react';
// import Quagga from 'quagga';
// function BarcodeScanner() {
//    // const [barcode, setbarcode] = useState();
//     const [istrue, setistrue] = useState(false);
//     const [productname, setproductname] = useState("");
//     const handlesave=(b)=>{
//         const apiUrl = `https://world.openfoodfacts.net/api/v2/product/${b}?fields=product_name`;



//     fetch(apiUrl)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setproductname(data.product.product_name);
//         console.log(data.product.product_name);
//         setistrue(true);
//       })
//       .catch((err) => {
//         console.log(err);
//       })
//     }


//     useEffect(() => {
//       Quagga.init({
//         inputStream: {
//           name: 'Live',
//           type: 'LiveStream',
//           target: document.querySelector('#scanner-container'),
//           constraints: {
//             width: 640,
//             height: 480,
//             facingMode: 'environment', // Use the device's rear camera
//           },
//         },
//         decoder: {
//             readers : ["ean_reader"], // Change the reader type according to your barcode format
//         },
//       }, function (err) {
//         if (err) {
//           console.error(err);
//           return;
//         }
//         Quagga.start();
//       });

//       Quagga.onDetected((result) => {
//         const barcodeNumber = result.codeResult.code;
//        // setbarcode(barcodeNumber);
//         Quagga.stop();
//        // console.log(barcode);
//         handlesave(barcodeNumber);
//         console.log('Detected barcode: ' + barcodeNumber);

//         // You can now use the barcodeNumber as needed in your application.
//       });

//       return () => {
//         Quagga.stop();

//       };
//     }, []);

//     return (
//       <div>
//         <div id="scanner-container"></div>
//         {/* <button onClick={handlesave}>getproduct</button> */}
//         {<div>{productname}</div>}
//       </div>
//     );
//   }

//   export default BarcodeScanner;



