

const baseUrl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropDowns= document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

//code for add countrylist in droddown menu
 for (let select of dropDowns){
     console.log(select);
   for(currcode in countryList){
      // console.log(currcode, countryList[currcode]);
      let newOption = document.createElement("option");
      newOption.innerText = currcode;
      newOption.value = currcode ;
      // console.log(newOption);
      select.append(newOption);
      if(select.name ==="from" && currcode=== "USD"){
        newOption.selected ="selected";
      }else if(select.name ==="to" && currcode=== "INR"){
        newOption.selected ="selected";
      }
  } 
    select.addEventListener("change", (evt)=>{
      updateFlag(evt.target);
  });
};
   //code for exchange rate
  const updateExchangeRate = async ()=>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value ;
    console.log(amtVal);
    if(amtVal === "" || amtVal < 1 ){
      amtVal = 1 ;
      amount.value = "1";
    }
    let response =  await fetch(`${baseUrl}/${fromCurr.value.toLowerCase()}.json`); //fetch url
     //console.log(json);
    const data = await response.json() ; 
    // console.log(data);
    let rate = await data [`${fromCurr.value.toLowerCase()}`][`${toCurr.value.toLowerCase()}`]; 
     console.log (rate);

    let finalAmount = amtVal * rate ;
     console.log(finalAmount);
     msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}` ;
   };
  //code for flag change
   const updateFlag = (element)=>{
     let currcode = element.value;
     //  console.log(currcode);
     let countryCode = countryList[currcode];
     //  console.log(countryCode);
     let flag = `https://flagsapi.com/${countryCode}/flat/64.png`;
     let img = element.parentElement.querySelector("img");
     img.src = flag ;
     console.log(flag);
  };
 
  btn.addEventListener('click', (evt)=>{
    evt.preventDefault();
    updateExchangeRate();

  });
  window.addEventListener ("load", ()=>{  // Update current exchange rate
    updateExchangeRate();
  });

  // scroll reveal

  ScrollReveal({ 
    reset: true,
    distance: '100px',
    duration: 2000,
    delay: 150
  });

  ScrollReveal().reveal(' .section-container', { origin: 'left' });