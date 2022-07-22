//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Diet } = require('./src/db.js');

// function preChargeDiets(){
//   let dietsApi = [
//     {name:'gluten free'}, 
//     {name:'dairy free'}, 
//     {name:'lacto ovo vegetarian'}, 
//     {name:'vegan'}, 
//     {name:'paleolithic'}, 
//     {name:'primal'}, 
//     {name:'whole 30'},
//     {name:'pescatarian'},
//     {name:'ketogenic'},
//     {name:'fodmap friendly'},
//     {name:'vegetarian'}
// ];

//   Diet.bulkCreate(dietsApi);  
//   // res.send('Dietas ingresadas a la base de datos');

// }
// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  // await preChargeDiets();
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
