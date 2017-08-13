var express = require('express');
var items = require('../database-mongo/pokemonModel');

import axios from 'axios';

//151 axios calls to pokeapi to format and store my data in my localDB
//{name:"bulbasaur", description:"The bulb on its back...", url:"imgurl"}
//
for (let i = 1; i <= 151; i++) {
	let pokemonObj = {};

	fetch(`http://pokeapi.co/api/v2/pokemon-species/${i}`)
	.then((results)=> {
		return results.json();
	})
	.then((results)=> {
		pokemonObj.name = results.names[0].name;
		pokemonObj.description = results.flavor_text_entries.filter((lang)=> {
			return lang.language.name === 'en';
		})[0];
	})
	.catch((err)=> {
		console.log('error populating database with pokemon names/description', err);
	});

	fetch(`http://pokeapi.co/api/v2/pokemon/${i}`)
	.then((results)=> {
		return results.json();
	})
	.then((results)=> {
		pokemonObj.url = results.sprites.front_default;
	})
	.catch((err)=> {
		console.log('error populating db with sprites', err);
	})


	//save each pokemonObj to my mongoDB
	items.saveAll(pokemonObj, (err, res) => {
		if (err) {
			console.log("error saving pokemon to db", err);
		} else {
			console.log("saving pokemonObj to db", pokemonObj.name);
		}
	});

}
 //http://pokeapi.co/api/v2/pokemon-species/}
