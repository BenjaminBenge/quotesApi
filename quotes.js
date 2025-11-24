// const quote = document.getElementById("myquote");



const api_url ="https://zenquotes.io/api/quotes/";

async function getapi()
{
  const response = await fetch("https://ron-swanson-quotes.herokuapp.com/v2/quotes");
  var data = await response.json();
  console.log(data);
  document.getElementById("quote").textContent = data || "Couldn't find a joke!";
}

getapi();

