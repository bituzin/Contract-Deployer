# WalletConnect Configuration

To complete the WalletConnect setup:

1. Go to https://cloud.walletconnect.com/
2. Create a new project (or sign in if you have an account)
3. Copy your Project ID
4. Open `src/config/walletConnect.js`
5. Replace `'YOUR_PROJECT_ID_HERE'` with your actual Project ID

Example:
```javascript
const projectId = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6'
```

After updating the Project ID, WalletConnect will be fully functional and users will be able to connect their wallets through the AppKit button in the header.
