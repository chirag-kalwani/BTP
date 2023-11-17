import React, {useState} from 'react';
import Quagga from 'quagga';
import { useEffect } from 'react';
import useWindowSize from '../Hooks/useWindowSize';
function BarcodeScanner(props) {
    const [isScannerOpen, setIsScannerOpen] = useState(true);
    const [width] = useWindowSize();

    const handlesave = (b) => {
        const apiUrl = `https://world.openfoodfacts.net/api/v2/product/${b}?fields=product_name,nutriments,categories_tags_en`;


        fetch(apiUrl)
            .then((response) => {

                return response.json();
            })
            .then((data) => {

                props.scanning(data);

            })
            .catch((err) => {
                console.log(err);
            })

    }



    useEffect(() => {

      initScanner();
      setIsScannerOpen(true);
    }, [width]);

    const closeCam = () => {
        // const video = document.querySelector('#scanner-container video');
        // const tracks=video.srcObject.getTracks();
        // console.log(tracks);
        // tracks.forEach((track) => {track.stop();
        // });
        // video.src='';
        //
       // mediastreamtrack.stop();

        // console.log(tracks);
    //     const video = document.querySelector('#scanner-container video');
    //     window.localStream.getVideoTracks()[0].stop();
    // video.src = '';
    }

    const initScanner = () => {
        let wid=document.getElementById('scanbutton');
        let hieght=(window.innerWidth>1000)?530:192
        Quagga.init({
            inputStream: {
                name: 'Live',
                type: 'LiveStream',
                target: document.querySelector('#scanner-container'),
                constraints: {
                    width: wid.clientWidth,
                    height: hieght,
                    facingMode: 'user', // Use the device's front camera
                },
            },
            decoder: {
                readers: ["code_128_reader",
                "ean_reader",
                "ean_8_reader",
                "code_39_reader",
                "code_39_vin_reader",
                "codabar_reader",
                "upc_reader",
                "upc_e_reader",
                "i2of5_reader"], // Change the reader type according to your barcode format

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
            closeCam();
            setIsScannerOpen(false);
            // console.log(barcode);
            handlesave("3017624010701");
            console.log('Detected barcode: ' + barcodeNumber);

            // You can now use the barcodeNumber as needed in your application.
        });


        return () => {
            Quagga.stop();
            isScannerOpen(false);
            closeCam();
        };
    };


    const toggleScanner = () => {
        if (isScannerOpen) {
            Quagga.stop();
            closeCam();

        } else {
            initScanner();
        }
        setIsScannerOpen(!isScannerOpen);
    };

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            marginRight: "20px"
        }}>
            <button id="scanbutton" onClick={toggleScanner}>
                {isScannerOpen ? 'Close Scanner' : 'Open Scanner'}
            </button>
            <div id="scanner-container"></div>

        </div>
    );

}

export default BarcodeScanner;


