import { Request, Response } from 'express';
import moment from 'moment';
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
  const tmnCode = 'BVN453L7';
  const secretKey = 'DLVZTVEPUZZSBDJXMUYEXAQGZOLXZSLK';
  const vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
  const returnUrl = 'http://localhost:3000/payment/vnpay_return';  //process.env.VNP_RETURN_URL || 

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
    const paymentUrl = new URL(vnpUrl);
    Object.entries(vnp_Params)
    .sort(([key1], [key2]) => key1.toString().localeCompare(key2.toString()))
    .forEach(([key, value]) => {
        // Skip empty value
        if (!value || value === "" || value === undefined || value === null) {
        return;
        }

        paymentUrl.searchParams.append(key, value.toString());
    });

    var crypto = require("crypto");
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac
    .update(Buffer.from(paymentUrl.search.slice(1).toString(), "utf-8"))
    .digest("hex");

    paymentUrl.searchParams.append("vnp_SecureHash", signed);
    res.redirect(paymentUrl.toString());

    
};

export const vnpayReturn = (req: Request, res: Response) => {
  const vnp_Params = { ...req.query } as Record<string, string>;
  const secureHash = vnp_Params['vnp_SecureHash'];
  delete vnp_Params['vnp_SecureHash'];
  delete vnp_Params['vnp_SecureHashType'];

  const secretKey = process.env.VNP_HASHSECRET || '';

  // Sắp xếp tham số theo key
  const sortedParams = Object.entries(vnp_Params)
    .sort(([key1], [key2]) => key1.localeCompare(key2))
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  // Tạo chữ ký
  const crypto = require('crypto');
  const hmac = crypto.createHmac('sha512', secretKey);
  const signed = hmac.update(Buffer.from(sortedParams, 'utf-8')).digest('hex');
  res.render('home/vnpay_return.ejs', { code: vnp_Params['vnp_ResponseCode'] });
};


export const showPayments = (req: Request, res: Response) => {
    res.json('payment');
}