import { Router } from 'express';
import { createPayment, vnpayReturn,showPayments } from '@controllers/PaymentControler';

const router = Router();

router.post('/create_payment', createPayment);
router.get('/vnpay_return', vnpayReturn);
router.get('/',showPayments); 
export default router;
