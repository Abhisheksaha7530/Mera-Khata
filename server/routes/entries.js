import express from 'express';
import Entry from '../models/Entry.js';

const router = express.Router();

// Get all entries
router.get('/', async (req, res) => {
  try {
    const entries = await Entry.find().sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    console.error('GET /api/entries error:', err);
    res.status(500).json({ error: 'Failed to fetch entries' });
  }
});

// Get all unpaid (due) entries
router.get('/dues', async (req, res) => {
  try {
    const dues = await Entry.find({ paid: false }).sort({ date: -1 });
    res.json(dues);
  } catch (err) {
    console.error('GET /api/entries/dues error:', err);
    res.status(500).json({ error: 'Failed to fetch due entries' });
  }
});

// Add entry
router.post('/', async (req, res) => {
  try {
    const entry = new Entry(req.body);
    await entry.save();
    res.json(entry);
  } catch (err) {
    console.error('POST /api/entries error:', err);
    res.status(500).json({ error: 'Failed to add entry' });
  }
});

// Mark entry as paid
router.patch('/:id/paid', async (req, res) => {
  try {
    const entry = await Entry.findByIdAndUpdate(
      req.params.id,
      { paid: true },
      { new: true }
    );
    res.json(entry);
  } catch (err) {
    console.error(`PATCH /api/entries/${req.params.id}/paid error:`, err);
    res.status(500).json({ error: 'Failed to mark as paid' });
  }
});

// Delete all paid entries
router.delete('/paid', async (req, res) => {
  try {
    await Entry.deleteMany({ paid: true });
    res.json({ message: 'Paid entries deleted' });
  } catch (err) {
    console.error('DELETE /api/entries/paid error:', err);
    res.status(500).json({ error: 'Failed to delete paid entries' });
  }
});

// ✅ Delete specific entry by ID
router.delete('/:id', async (req, res) => {
  try {
    const entry = await Entry.findByIdAndDelete(req.params.id);
    if (!entry) {
      return res.status(404).json({ error: 'Entry not found' });
    }
    res.json({ message: 'Entry deleted successfully' });
  } catch (err) {
    console.error(`DELETE /api/entries/${req.params.id} error:`, err);
    res.status(500).json({ error: 'Failed to delete entry' });
  }
});

export default router;
