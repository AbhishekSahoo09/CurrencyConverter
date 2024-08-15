
const url="https://api.currencyapi.com/v3/latest?apikey=cur_live_u9s2k638d4dGQpeWbfJes112zSpw5efrdEfCYrcv&base_currency=USD"
 const dropdowns =  document.querySelectorAll(".dropdowm select");
 const from=document.querySelectorAll(".from select");
 const to=document.querySelectorAll(".to select");
 const msg = document.querySelector(".msg");
 const btn = document.querySelector(".btn");
 var fromm="USD";
 var too="INR";
 for(let sel of dropdowns)
 {
    for(code in countryList)
    {
                
        let New = document.createElement("option");
        New.innerText=code;
        New.value=code;
        sel.append(New)
        if (sel.name === "from" && code === "USD") {
          New.selected = "selected";
        } else if (sel.name === "to" && code === "INR") {
          New.selected = "selected";
        }
                
    }
    
    sel.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
  }
const updateFlag=(ele)=>{
    let currcode=ele.value;
    let country=countryList[currcode];
    let newSrc = `https://flagsapi.com/${country}/flat/64.png`;
    let img = ele.parentElement.querySelector("img");
    img.src = newSrc;
}
const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
      amtVal = 1;
      amount.value = "1";
    }
    const l="&base_currency="+fromm;
    const ul = `${url}${l}`;
    const response = await fetch(ul);
    const dat = await response.json();
    const rate =dat.data[too].value;
    
    let finalAmount = amtVal * rate;
    
    msg.innerText = `${amtVal} ${fromm} = ${finalAmount} ${too}`;
};
const updatefrom=(ele)=>{
  fromm=ele.value;
  console.log(fromm);
  
}
const updateto=(ele)=>{
  too=ele.value;
  
}
for(let ak of from){
    ak.addEventListener("change", (evt) => {
      updatefrom(evt.target);
    });
}
for(let ab of to){

  ab.addEventListener("change", (evt) => {
    updateto(evt.target);
  });
}
btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});
window.addEventListener("load", () => {
  updateExchangeRate();
});