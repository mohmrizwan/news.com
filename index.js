const API_KEY = "dfc4246d27a44dabad1358c17b489e9f";
const url="https://newsapi.org/v2/everything?q=";
 window.addEventListener("load", ()=> fetchNews("India"));
 
 async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`)
    const data= await res.json();
    console.log(data);
    bindData(data.articles);
 }
 function bindData(articles){
    const cardsContainer= document.getElementById("cards-container")
    const newsCardTemplates= document.getElementById("template-news-card")

  
    cardsContainer.innerHTML ="";

     articles.forEach((article )=> {
        if(!article.urlToImage) return;
        const cardClone =  newsCardTemplates.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone)
     });
 }
 function fillDataInCard(cardClone, article){
    const newsImg = cardClone.querySelector("#news-img")
    const newsTitle = cardClone.querySelector("#news-title")
    const newsSource = cardClone.querySelector("#news-source")
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date= new Date(article.publishedAt).toLocaleTimeString("en-US", {
        timeZone:"Asia/Jakarta"
    });
    newsSource.innerHTML=`${article.source.name} : ${date}`;

    cardClone.firstElementChild.addEventListener("click", ()=>{
        window.open(article.url, "_blank");
    })
    
   }
 let curSelectedNav = null;
function onNavItemClick(id){
   fetchNews(id);
   const navItems= document.getElementById(id);
   curSelectedNav?.classList.remove("active")
   curSelectedNav=navItems;
   curSelectedNav.classList.add('active')
}
const search_btn=document.getElementById("search-button")
const search_text=document.getElementById("search-text")
search_btn.addEventListener("click", ()=>{
   const query = search_text.value;
   if(!query) return;
   fetchNews(query)
})