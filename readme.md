
電腦先安裝node.js
安裝成功打 $ npm -v
有版本顯示表示成功

把下面套件安裝到電腦
有權限問題前面加 [sudo]

$ npm i webpack -g 
$ npm i webpack-cli -g
$ npm i webpack-dev-server -g
$ npm i node-pre-gyp -g

開發前執行
$ npm i

如果有audit問題再執行
$ npm audit fix --force

開發執行 (http://localhost:8080)
$ npm run dev

輸出執行
$ npm run op