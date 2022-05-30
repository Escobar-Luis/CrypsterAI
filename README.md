<h1 align="center">Welcome to CrypsterAI 👋</h1>
<p>
</p>

> CryptoCurrency Dashboard & Simple Moving Average Crossover Hyper-Optimization Backtester that allows you to know which was the best performing pair of SMAs

### ✨ [Demo](https://crypsterai.netlify.app/)

## Install

Go to Frontend Dir
```sh
npm install
```
Go to Backend Dir
```sh
pip install -r requirements.txt
```

## Usage

Go to Frontend Dir
```sh
npm run start
```
Go to Backend Dir
```sh
python3 manage.py runserver 
```

## Author

👤 **Luis Alfredo Escobar**

* Website: https://www.luisalfredoescobar.com/
* Github: [@Escobar-Luis](https://github.com/Escobar-Luis)
* LinkedIn: [@https:\/\/www.linkedin.com\/in\/luisalfredoescobar\/](https://linkedin.com/in/https:\/\/www.linkedin.com\/in\/luisalfredoescobar\/)

## Show your support

Give a ⭐️ if this project helped you!!

## More Info (FrontEnd)

App.js is wrapped in 4 useContexts:

1) AuthProvider
    a) Check if user Exists in my database using JWT session tokens
    b) Get user TokenSet Data if they do Exist
    c) GraphQL/Apollo mutations to handle creating/logging in users
    d) logging users out by removing session tokens and setting loggedin state to false

2) Options Context
    a) To keep NavItem.js clean, created an array of all my navbar options in this context, so I can map trough them in NavItem.js and handle ternary logic there

3) Optimization Context
    a) 
