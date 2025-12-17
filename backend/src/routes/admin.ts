import { Router } from 'express';
import {
  getDataPreview,
  uploadData,
  downloadData,
  updateAircraft,
  updateHandling,
  getSystemParameters,
  updateSystemParameters,
} from '../controllers/adminController';
import { upload } from '../middlewares/fileUpload';

const router = Router();

// Data management
router.get('/data/:dataType', getDataPreview);
router.post('/upload/:dataType', upload.single('file'), uploadData);
router.get('/download/:dataType', downloadData);

// Single record updates
router.put('/aircraft/:id', updateAircraft);
router.put('/handling/:airportCode', updateHandling);

// System parameters
router.get('/parameters', getSystemParameters);
router.put('/parameters', updateSystemParameters);

export default router;