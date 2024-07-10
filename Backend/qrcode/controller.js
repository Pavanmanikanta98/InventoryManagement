const service = require('./service');


exports.generateQR = async (data) => {
	try {
		// const { data } = req.body;

		const qrCodeText = service.formData(data);

		const qrCodeBuffer = await service.generateQRCode(qrCodeText);
        console.log(qrCodeBuffer)

        return qrCodeBuffer;

		// res.setHeader('Content-Disposition', 'attachment; filename=qrcode.png');
        
		// res.type('image/png').send(qrCodeBuffer);
	} catch (err) {
		console.error('Error generating QR code:', err);
		res.status(500).send({ error: 'Internal Server Error' });
	}
};