
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

let syncedWallets = [];

app.post('/sync-wallet', (req, res) => {
  const { telegram_id, username, wallet } = req.body;
  if (!telegram_id || !wallet) {
    return res.status(400).json({ error: 'Missing data' });
  }

  syncedWallets.push({ telegram_id, username, wallet, time: new Date() });
  console.log(`🔐 Synced: ${username} (${telegram_id}) → ${wallet}`);
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`🟢 Wallet Sync Backend running on port ${port}`);
});
