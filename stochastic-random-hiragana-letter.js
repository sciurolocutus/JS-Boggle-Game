use 'strict';

let table = {
  "う": 0.073907,
  "い": 0.066484,
  "し": 0.040915,
  "き": 0.031462,
  "に": 0.030106,
  "か": 0.029626,
  "ょ": 0.029277,
  "の": 0.027069,
  "ち": 0.026263,
  "く": 0.025535,
  "と": 0.025279,
  "は": 0.021296,
  "た": 0.020157,
  "ゅ": 0.017647,
  "こ": 0.017515,
  "て": 0.017004,
  "さ": 0.016562,
  "つ": 0.015702,
  "な": 0.015462,
  "せ": 0.014067,
  "じ": 0.013827,
  "が": 0.013742,
  "る": 0.013649,
  "ろ": 0.012913,
  "り": 0.012262,
  "け": 0.011061,
  "を": 0.011014,
  "ど": 0.010402,
  "っ": 0.010286,
  "よ": 0.010232,
  "ぜ": 0.010139,
  "で": 0.009697,
  "お": 0.008829,
  "ら": 0.008434,
  "ご": 0.007954,
  "す": 0.007768,
  "あ": 0.007744,
  "ー": 0.007620,
  "も": 0.007613,
  "だ": 0.007597,
  "め": 0.006962,
  "ま": 0.006853,
  "れ": 0.006768,
  "え": 0.006567,
  "ぎ": 0.005908,
  "ひ": 0.005862,
  "ほ": 0.005288,
  "み": 0.005273,
  "そ": 0.005249,
  "ね": 0.004676,
  "げ": 0.004413,
  "ゃ": 0.004389,
  "わ": 0.004366,
  "ふ": 0.004227,
  "ぶ": 0.004219,
  "や": 0.003630,
  "ン": 0.003607,
  "ば": 0.002747,
  "ぱ": 0.002708,
  "ル": 0.002406,
  "ス": 0.002274,
  "べ": 0.002135,
  "む": 0.002057,
  "ざ": 0.002057,
  "ト": 0.002049,
  "び": 0.002003,
  "イ": 0.001879,
  "へ": 0.001747,
  "ゆ": 0.001716,
  "ぽ": 0.001709,
  "ぞ": 0.001654,
  "ぼ": 0.001468,
  "ラ": 0.001383,
  "フ": 0.001352,
  "ク": 0.001329,
  "ド": 0.001220,
  "ず": 0.001120,
  "リ": 0.001019,
  "ぐ": 0.000996,
  "レ": 0.000941,
  "づ": 0.000879,
  "ッ": 0.000732,
  "ぴ": 0.000717,
}


/**
 * Given a table of letters onto their relative
*/
let weightedRandom = function(tbl) {
  let sumWeights = 0.0;
  reverseTbl = {};
  for (var el in tbl) {
    if (tbl.hasOwnProperty(el)) {
      sumWeights += parseFloat(tbl[el]||0);
      //Populate the reverse table.
      reverseTbl[tbl[el]] = el;
    }
  }

  //console.log("Total weight: " + sumWeights);

  let target = Math.random() * sumWeights;
  //console.log("Target number: " + target);

  let hi = 0.0; // track how far we've "travelled"
  let index = 0;
  for (var weight of Object.values(tbl)) {
    //console.log("Considering " + Object.keys(tbl)[index] + "with weight " + weight);
    hi += weight;
    if (hi > target) {
      return Object.keys(tbl)[index];
    }
    index++;
  }

  return Object.keys(tbl)[Object.keys(tbl).length - 1];

}

let randomHiragana = function() {
  return weightedRandom(table);
}
