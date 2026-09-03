const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');

// Stats (Dashboard ke numbers)
router.post('/stats', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: "Email required" });

    const donations = await Donation.find({ email });
    const totalDonated = donations.reduce((sum, record) => sum + record.amount, 0);

    res.json({ success: true, totalDonated, receiptsCount: donations.length });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Donate (Nayi donation save karna)
router.post('/donate', async (req, res) => {
  try {
    const { email, amount, charity } = req.body;
    const newDonation = new Donation({ email, amount, charity });
    await newDonation.save();
    res.json({ success: true, message: "Donation Successful" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// History (Pichli tamam donations nikalna)
router.post('/history', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: "Email required" });
    
    // Sort by date -1 ka matlab naye records upar aayenge
    const history = await Donation.find({ email }).sort({ date: -1 }); 
    res.json({ success: true, history });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;