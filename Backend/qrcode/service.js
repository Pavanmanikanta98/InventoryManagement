

const QRCode = require('qrcode');

exports.formData = ( data ) =>{
     const { item , quantity , date, labName , category, numberOfUnits, issueTo } = data;
    const qrCodeText = ` Prodouct Name : ${item},
          Quantity : ${quantity},
            Issued Date : ${date},
           to Lab : ${labName},
            Category : ${category},
          Number of Units : ${numberOfUnits},
           Issued to : ${issueTo},`

           return qrCodeText;
};



exports.generateQRCode = async (qrCodeText) => {
	const options = {
		errorCorrectionLevel: 'M',
		type: 'image/png',
		margin: 1
        //Mode ??
	};

	const qrCodeBuffer = await QRCode.toBuffer(qrCodeText, options);
	return qrCodeBuffer;
};
