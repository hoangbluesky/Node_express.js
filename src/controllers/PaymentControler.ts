import { Request, Response } from 'express';
import moment from 'moment';
import qs from 'qs';
import crypto from 'crypto';
import dotenv from 'dotenv'
dotenv.config()
// Hàm sắp xếp thứ tự object theo key


const sortObject = (obj: Record<string, string>) => {
  const sorted: Record<string, string> = {};
  const keys = Object.keys(obj).sort();
  for (const key of keys) {
    sorted[key] = obj[key];
  }
  return sorted;
};

export const createPayment = (req: Request, res: Response) => {
  const { amount, bankCode } = req.body;
  const tmnCode = process.env.VNP_TMNCODE || 'K7XSRHN3';
  const secretKey = process.env.VNP_HASHSECRET || 'HKHRAMXREBRBUTOIGKPNBWTAOZKFWZUY';
  const vnpUrl = process.env.VNP_URL || 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
  const returnUrl = process.env.VNP_RETURN_URL || 'http://localhost:3000/payment/vnpay_return';

  const date = moment().format('YYYYMMDDHHmmss');
  const orderId = moment().format('HHmmss');

  const rawIp = req.headers['x-forwarded-for']
  ? (req.headers['x-forwarded-for'] as string).split(',')[0].trim()
  : req.socket.remoteAddress || '';
const ipAddr = rawIp.replace('::ffff:', '').replace('::1', '127.0.0.1');


  const vnp_Params: Record<string, string> = {
    vnp_Version: '2.1.0',
    vnp_Command: 'pay',
    vnp_TmnCode: tmnCode,
    vnp_Locale: 'vn',
    vnp_CurrCode: 'VND',
    vnp_TxnRef: orderId,
    vnp_OrderInfo: 'Thanh toan don hang',
    vnp_OrderType: 'other',
    vnp_Amount: (Number(amount) * 100).toString(),
    vnp_ReturnUrl: returnUrl,
    vnp_IpAddr: ipAddr,
    vnp_CreateDate: date,
  };

  if (bankCode) {
    vnp_Params['vnp_BankCode'] = bankCode.toString();
  }

  const sortedParams = sortObject(vnp_Params);

  const signData = qs.stringify(sortedParams, { encode: false });
  const hmac = crypto.createHmac('sha256', secretKey);
  const signed = hmac.update(signData, 'utf8').digest('hex');
  sortedParams['vnp_SecureHash'] = signed;

  const paymentUrl = `${vnpUrl}?${qs.stringify(sortedParams, { encode:true })}`;
  console.log('🔗 Redirecting to:', paymentUrl);
    console.log(sortedParams);
  res.redirect(paymentUrl);
};

export const vnpayReturn = (req: Request, res: Response) => {
  const vnp_Params = { ...req.query } as Record<string, string>;
  const secureHash = vnp_Params['vnp_SecureHash'];
  delete vnp_Params['vnp_SecureHash'];
  delete vnp_Params['vnp_SecureHashType'];

  const secretKey = process.env.VNP_HASHSECRET || '';
  const sortedParams = sortObject(vnp_Params);
  const signData = qs.stringify(sortedParams, { encode: false });
  const hmac = crypto.createHmac('sha512', secretKey);
  const signed = hmac.update(signData, 'utf-8').digest('hex');

  console.log('🔐 Received Hash:', secureHash);
  console.log('🔏 Generated Hash:', signed);

  if (secureHash === signed) {
    // Thành công
    res.render('home/vnpay_return.ejs', { code: vnp_Params['vnp_ResponseCode'] });
  } else {
    // Sai checksum
    res.status(400).render('home/vnpay_return.ejs', { code: '97' }); // 97: Checksum sai
  }
};
export const showPayments = (req: Request, res: Response) => {
    res.json('payment');
}
