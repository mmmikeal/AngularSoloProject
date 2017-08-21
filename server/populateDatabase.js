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





for (let i = 1; i <= 151; i++) {
	let url1 = `http://pokeapi.co/api/v2/pokemon-species/${i}`; //descrip and name
	let url2 = `http://pokeapi.co/api/v2/pokemon/${i}`; //sprite url
	//urls1.push([url1, url2]);
  urlArray1.push(url1);
  urlArray2.push(url2);
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
  response.forEach((entry)=> {
    var data = entry;
    var pokeObj = {};
    pokeObj.id = data.id;
    pokeObj.name = data.names[0].name;
    pokeObj.description = data.flavor_text_entries.filter((lang)=> {
      return lang.language.name === 'en';
    })[0];
    pokeObj.description = pokeObj.description.flavor_text;
    finalData1.push(pokeObj);

  });
  return finalData1;
})
.catch((err)=> {
  console.log('***ERROR GETTING DESCRIPTION*** ', err);
});


var prom2 = Promise.all(requestsArray2).then((response)=> {
  response.forEach((entry)=> {
    var data = entry;
    var pokeObj = {};
    pokeObj.name = data.name;
    pokeObj.id = data.id;
    pokeObj.url = data.sprites.front_default;
    finalData2.push(pokeObj);
  });
  return finalData2;
})
.catch((err)=>{
  console.log('***ERROR GETTING SPRITE*** ', err);
});


//findata has mydata in order!!! NICE no need for upper promise.all
var populate = function () {
  Promise.all([prom1, prom2])
  .then((results)=> {
    return results;
  })
  .then((results)=> {
    let array1 = results[0];
    let array2 = results[1];

    array1.forEach((obj, ind)=> {
      let finObj = {};
      finObj.name = obj.name;
      finObj.description = obj.description;
      finObj.url = array2[ind].url;

      items.saveAll(finObj, (err, res)=> {
        if (err) {
          console.log("error saving poke to db", err);
        } else {
          console.log("saved poke to db", finObj);
        }
      });
    });
  });
};

populate();


 //http://pokeapi.co/api/v2/pokemon-species/}
