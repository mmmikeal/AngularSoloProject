var express = require('express');
var items = require('../database-mongo/pokemonModel');
var request = require('request');
var Promise = require('promise');
var rp = require('request-promise');

//151 http calls to pokeapi to format and store my data in my localDB
//{name:"bulbasaur", description:"The bulb on its back...", url:"imgurl"}
//
//


var urlArray1 = [];
var urlArray2 = [];
var finalData1 = [];
var finalData2 = [];





for (let i = 40; i <= 50; i++) {
	let url1 = `http://pokeapi.co/api/v2/pokemon-species/${i}`; //descrip and name
	let url2 = `http://pokeapi.co/api/v2/pokemon/${i}`; //sprite url
	//urls1.push([url1, url2]);
  urlArray1.push(url1);
  urlArray2.push(url2);

	//console.log(pokemonObj.name, pokemonObj.description, pokemonObj.url);
	//console.log("ASDF", pokemonObj.name);
}

var requestsArray1 = urlArray1.map((url)=> {
  var options = { method: 'GET',
    uri: url,
    json: true
  };

  return rp(options);

});

var requestsArray2 = urlArray2.map((url)=>{
  var options = { method: 'GET',
    uri: url,
    json: true };

  return rp(options);

});

var prom1 = Promise.all(requestsArray1).then((response)=>{
  var data = response;
  var pokeObj = {};
  pokeObj.id = data.id;
  pokeObj.name = data.names[0].name;
  pokeObj.description = data.flavor_text_entries.filter((lang)=> {
    return lang.language.name === 'en';
  })[0];
  //console.log(JSON.parse(body));
  pokeObj.description = pokeObj.description.flavor_text;
  //console.log("NAME *** ", pokeObj.name);
  //console.log("DESCRIP*** ", pokeObj.description);
  finalData1.push(pokeObj);
})
.catch((err)=> {
  console.log('***ERROR GETTING DESCRIPTION*** ', err);
});
 // console.log(results);
  //console.log("requests1 were completed");
 //  CHECK THIS TOMORROW MICHAEL var solution = results.map((item)=>{ return item; });


var prom2 = Promise.all(requestsArray2).then((response)=> {
  var data = response;
  var pokeObj = {};
  pokeObj.name = data.name;
  pokeObj.id = data.id;
  pokeObj.url = data.sprites.front_default;
  //console.log("url****", pokeObj.url);
  finalData2.push(pokeObj);
})
.catch((err)=>{
  console.log('***ERROR GETTING SPRITE*** ', err);
});

var populate = function () {
  console.log("populating db");
  Promise.all([prom1, prom2]).then((results)=>{
    //console.log("lets join the requests", finalData1);
    //console.log("letsjoin the req", finalData2);
    console.log(" ", results);
    for (let i = 40; i <=50; i++ ) {
      let finObj = {};
      finObj.name = finalData1[i].name;
      finObj.description = finalData1[i].description;
      finObj.url = finalData2[i].url;
      console.log("hallelujah", finObj);

      items.saveAll(finObj, (err, res)=> {
        if (err) {
          console.log("error saving poke to db", err);
        } else {
          console.log("saved poke to db", finObj);
        }
      });
    }
  });
};

populate();
//save each pokemonObj to my mongoDB
  // items.saveAll(pokemonObj, (err, res) => {
  //   if (err) {
  //     console.log("error saving pokemon to db", err);
  //   } else {
  //     console.log("saving pokemonObj to db", pokemonObj.name);
  //   }
  // });


//console.log("***FinDATA*** ",);


// var getPokeUrl = function(url2) {
//   var pokeObj = {};
//   var options = { method: 'GET',
//     uri: url2,
//     json: true };

//   rp(options)
//   .then((response)=> {
//     //console.log(response);
//     var data = response;
//     pokeObj.url = data.sprites.front_default;
//     console.log("url****", pokeObj.url);
//     finalData1.push(pokeObj);
//   })
//   .catch((err)=>{
//     console.log(err);
//   });
// };

// var getPokeDesc = function(url1) {
//   var pokeObj = {};
//   var options = { method: 'GET',
//     uri: url1,
//     json: true
//   };

//   rp(options)
//   .then((response)=> {
//     //console.log(response);
//     var data = response;
//     pokeObj.name = data.names[0].name;
//     pokeObj.description = data.flavor_text_entries.filter((lang)=> {
//       return lang.language.name === 'en';
//     })[0];
//     //console.log(JSON.parse(body));
//     pokeObj.description = pokeObj.description.flavor_text;
//     console.log("NAME *** ", pokeObj.name);
//     console.log("DESCRIP*** ", pokeObj.description);
//     finalData1.push(pokeObj);
//   })
//   .catch((err)=> {
//     console.log(err);
//   });
// };

// Promise.all(urls1.map((url)=> {
// 	return new Promise(resolve, reject) {
// 		request(url[0], (err, response, body)=> {
// 			if (err) {
// 				return reject(err);
// 			} else {
// 				var data = JSON.parse(body);
// 				let pokeObj = {};
// 		    pokeObj.name = data.names[0].name;
// 		    pokeObj.description = data.flavor_text_entries.filter((lang)=> {
// 		    	return lang.language.name === 'en';
// 		    })[0];
// 		    //console.log(JSON.parse(body));
// 		    pokeObj.description = pokeObj.description.flavor_text;
// 		    console.log("NAME *** ", pokeObj.name);
// 		    console.log("DESCRIP*** ", pokeObj.description);
// 		    resolve(pokeObj);
// 			}
// 		});
// 	};
// })).then((result)=>{
// 	result.forEach((obj)=>)
// })
// ;

	// fetch(`http://pokeapi.co/api/v2/pokemon-species/${i}`)
	// .then((results)=> {
	// 	return results.json();
	// })
	// .then((results)=> {
	// 	pokemonObj.name = results.names[0].name;
	// 	pokemonObj.description = results.flavor_text_entries.filter((lang)=> {
	// 		return lang.language.name === 'en';
	// 	})[0];
	// })
	// .catch((err)=> {
	// 	console.log('error populating database with pokemon names/description', err);
	// });

	// fetch(`http://pokeapi.co/api/v2/pokemon/${i}`)
	// .then((results)=> {
	// 	return results.json();
	// })
	// .then((results)=> {
	// 	pokemonObj.url = results.sprites.front_default;
	// })
	// .catch((err)=> {
	// 	console.log('error populating db with sprites', err);
	// })




 //http://pokeapi.co/api/v2/pokemon-species/}
