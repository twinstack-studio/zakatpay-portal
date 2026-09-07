const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');
const { requireAuth } = require('../middleware/auth');

// The signed-in account is taken from the token for every route below, so a
// caller can only ever read or write their own records.
router.use(requireAuth);

router.get('/stats', async (req, res) => {
  try {
    const donations = await Donation.find({ email: req.user.email });
    const totalDonated = donations.reduce((sum, r) => sum + (r.amount || 0), 0);
    res.json({ success: true, totalDonated, receiptsCount: donations.length });
  } catch (err) {
    console.error('Stats error:', err.message);
    res.status(500).json({ success: false, message: 'Could not load your stats.' });
  }
});

router.get('/history', async (req, res) => {
  try {
    const history = await Donation.find({ email: req.user.email }).sort({ date: -1 });
    res.json({ success: true, history });
  } catch (err) {
    console.error('History error:', err.message);
    res.status(500).json({ success: false, message: 'Could not load your history.' });
  }
});

router.post('/donate', async (req, res) => {
  try {
    const amount = Number(req.body.amount);
    const charity = String(req.body.charity || '').trim();

    if (!Number.isFinite(amount) || amount <= 0) {
      return res.status(400).json({ success: false, message: 'Please enter a valid amount.' });
    }
    if (!charity) {
      return res.status(400).json({ success: false, message: 'Please choose an organisation.' });
    }

    const donation = await new Donation({ email: req.user.email, amount, charity }).save();
    res.json({ success: true, message: 'Donation recorded.', donation });
  } catch (err) {
    console.error('Donate error:', err.message);
    res.status(500).json({ success: false, message: 'Could not record the donation.' });
  }
});

module.exports = router;
