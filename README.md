### How to run the app and check the tasks working:

The following steps should be executed in the root project folder

1. Run `npm install`
2. Create *.env* file and define there your testnet and mainnet credentials: testnet api & secret key, mainnet api key. An example of *.env* file is described below
3. Run the following command: `env $(cat .env) npm start`

The *.env* file has the following format:

```env
TESTNET_API_KEY=<your_testnet_api_key>
TESTNET_API_SECRET=<your_testnet_secret_key>
MAINNET_API_KEY=<your_mainnet_api_key>
```