const mongoose = require('mongoose');

const QrCodeSchema = new mongoose.Schema({
  data: {
    type: Object,
    required: true,
  },
  qrCodeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'fs.files',
    required: true,
  },
});

const QrCodeModel = mongoose.model('QrCode', QrCodeSchema);
