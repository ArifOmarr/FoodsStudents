const express = require('express');
const router = express.Router();

// In-memory voucher definitions
const vouchers = [
  {
    code: 'STUDENT15',
    description: '15% off for students',
    discount: 0.15,
    type: 'percentage',
  },
  {
    code: 'FREEDEL',
    description: 'Free delivery on orders above RM 25',
    discount: 5,
    type: 'fixed',
    minOrder: 25,
  },
  {
    code: 'WEEKEND20',
    description: '20% off on weekends',
    discount: 0.20,
    type: 'percentage',
    weekendOnly: true,
  },
];

// GET /api/vouchers - List all vouchers
router.get('/', (req, res) => {
  res.json({ success: true, data: vouchers });
});

// POST /api/vouchers/validate - Validate voucher and calculate discount
router.post('/validate', (req, res) => {
  const { code, subtotal, orderType } = req.body;
  if (!code || typeof subtotal !== 'number') {
    return res.status(400).json({ success: false, message: 'Missing code or subtotal' });
  }
  const voucher = vouchers.find(v => v.code === code.toUpperCase());
  if (!voucher) {
    return res.json({ success: false, message: 'Invalid voucher code' });
  }
  // Weekend check
  if (voucher.weekendOnly) {
    const today = new Date();
    const isWeekend = today.getDay() === 0 || today.getDay() === 6;
    if (!isWeekend) {
      return res.json({ success: false, message: 'This voucher is only valid on weekends' });
    }
  }
  // Min order check
  if (voucher.minOrder && subtotal < voucher.minOrder) {
    return res.json({ success: false, message: `Order must be at least RM ${voucher.minOrder} to use this voucher` });
  }
  // Calculate discount
  let discount = 0;
  if (voucher.type === 'percentage') {
    discount = subtotal * voucher.discount;
  } else if (voucher.type === 'fixed') {
    discount = voucher.discount;
  }
  // For FREEDEL, only apply discount if orderType is delivery
  if (voucher.code === 'FREEDEL' && orderType !== 'delivery') {
    discount = 0;
  }
  res.json({
    success: true,
    voucher: {
      code: voucher.code,
      description: voucher.description,
      discount,
      type: voucher.type,
    },
    message: 'Voucher applied',
  });
});

module.exports = router; 