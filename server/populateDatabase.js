var express = require('express');
var items = require('../database-mongo/pokemonModel');
var request = require('request');

//151 http calls to pokeapi to format and store my data in my localDB
//{name:"bulbasaur", description:"The bulb on its back...", url:"imgurl"}
//


var getPokeDesc = function(pokeObj, url1) {
	var options = { method: 'GET',
    url: url1 };

	request(options, function (error, response, body) {
   	if (error) { 
   		throw new Error(error);
   	}
    var data = JSON.parse(body);
    pokeObj.name = data.names[0].name;
    pokeObj.description = data.flavor_text_entries.filter((lang)=> {
    	return lang.language.name === 'en';
    })[0];
    //console.log(JSON.parse(body));
    pokeObj.description = pokeObj.description.flavor_text;
    console.log("NAME *** ", pokeObj.name);
    console.log("DESCRIP*** ", pokeObj.description);
	});
}

var getPokeUrl = function(pokeObj, url2) {
	var options = { method: 'GET',
    url: url2 };

	request(options, function (error, response, body) {
    if (error) {
    	throw new Error(error);
    }
    var data = JSON.parse(body);
    pokeObj.url = data.sprites.front_default;
    console.log("url****", pokeObj.url);
  });
}


for (let i = 1; i <= 10; i++) {
	let pokemonObj = {};

	let url1 = `http://pokeapi.co/api/v2/pokemon-species/${i}`;
	let url2 = `http://pokeapi.co/api/v2/pokemon/${i}`;

	getPokeDesc(pokemonObj, url1);
	getPokeUrl(pokemonObj, url2);

	//console.log(pokemonObj.name, pokemonObj.description, pokemonObj.url);
	//console.log("ASDF", pokemonObj.name);


}











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


	//save each pokemonObj to my mongoDB
	// items.saveAll(pokemonObj, (err, res) => {
	// 	if (err) {
	// 		console.log("error saving pokemon to db", err);
	// 	} else {
	// 		console.log("saving pokemonObj to db", pokemonObj.name);
	// 	}
	// });


 //http://pokeapi.co/api/v2/pokemon-species/}
