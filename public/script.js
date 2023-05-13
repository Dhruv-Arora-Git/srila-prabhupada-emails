TweenLite.set("#container",{perspective:600})
TweenLite.set("img",{xPercent:"-50%",yPercent:"-50%"})
// perspective: 600px;

let total = 30;
var warp = document.getElementById("container"),	w = window.innerWidth , h = window.innerHeight;
 
for (i=0; i<total; i++){ 
   var Div = document.createElement('div');
   TweenLite.set(Div,{attr:{class:'dot'},x:R(0,w),y:R(-200,-150),z:R(-200,200)});
   warp.appendChild(Div);
   animm(Div);
   // console.log("fsdgfs");
 }
 
 function animm(elm){   
   TweenMax.to(elm,R(6,15),{y:h+100,ease:Linear.easeNone,repeat:-1,delay:-15});
   TweenMax.to(elm,R(4,8),{x:'+=100',rotationZ:R(0,180),repeat:-1,yoyo:true,ease:Sine.easeInOut});
   TweenMax.to(elm,R(2,8),{rotationX:R(0,360),rotationY:R(0,360),repeat:-1,yoyo:true,ease:Sine.easeInOut,delay:-5});
 };

function R(min,max) {return min+Math.random()*(max-min)};

let emailId = document.getElementById("email-id");
let errorMsg = document.getElementById("error-msg");
let icon = document.getElementById("icon");
 const btn = document.querySelector(".Button");
let mailRegex = /^([a-zA-Z0-9._+-]+)(@[a-zA-Z0-9-]+)(.[a-zA-Z]{2,4}){2,}$/;
const sleep = ms => new Promise(r => setTimeout(r, ms));
let flag = false;
async function checker() {
  icon.style.display = "inline-block";
  if (emailId.value.match(mailRegex)) {
    icon.innerHTML = '<i class="fas fa-check-circle"></i>';
    icon.style.color = "#2ECC71";
    errorMsg.style.display = "none";
    emailId.style.border = "2px solid #2ecc71";
    flag = true;
   for(let i = 0; i <= 300; i+=3) {
    await sleep(10);
    btn.style.marginBottom = `-${i}px`;
   } 
  } else if (emailId.value == "") {
    icon.style.display = "none";
    errorMsg.style.display = "none";
    emailId.style.border = "2px solid #d1d3d4";
    // btn.style.marginBottom = "0px";
    if(flag) {
      flag = false;
      for(let i = -300; i <= 0; i+=3) {
      await sleep(10);
      btn.style.marginBottom = `${i}px`;
     } 
    }
  } else {
    icon.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
    errorMsg.style.display = "block";
    icon.style.color = "#FF2851";
    emailId.style.border = "2px solid #FF2851";
    // btn.style.marginBottom = "0px";
    if(flag) {
      flag = false;
      for(let i = -300; i <= 0; i+=3) {
      await sleep(10);
      btn.style.marginBottom = `${i}px`;
     } 
    }
  }
}



var i = 0;
var a = 0;
let isBackspacing = false;
let isParagraph = false;

const textArray = [
  "Srila|Prabhupada", 
  "September 1, 1896 - Calcutta - took birth|as 'Abhay Charan De' to 'Gaura Mohan De' and 'Rajani Devi'",
  "1922 - Meets for the first time|Śrīla Bhaktisiddhānta Sarasvatī Gosvāmī Mahārāja",
  "1933 - Allahabad|Accepts formal dīkṣā initiation", 
  "February 14, 1944|Started'Back to Godhead'",
  "1953 - Jhansi - Initiates first disciple|Acarya Prabhakar",
  "September 17, 1959 - Awarded Sannyasa in Mathura|by one of his Godbrothers, His Holiness B.P. Kesava Maharaja",
  "August 13, 1965 - 1:30 p.m. - Calcutta|voyage to the USA aboard the Jaladuta ship",
  "September 17, 1965 - Historic arrival in America|On the 36th day after leaving Calcutta,the ship Jaladuta docks at Commonwealth Pier, Boston",
  "July 13, 1966|Incorporates the International Society for Krishna consciousness (ISKCON)",
  "September, 1966|Initiates first western disciples.",
  "May 25, 1967|Suffers a stroke/heart attack",
  "July 27, 1969|Ratha-yātrā - San Francisco",
  "He penned over 6341 personal letters|wrote around 70 books, established 100+ temples",
  "November 14, 7:30 p.m.|Disappearance Day of Śrīla Prabhupāda - age 81"
];

const speedForward = 100;
const speedWait = 1000;
const speedBetweenLines = 1000;
const speedBackspace = 25;

typeWriter("output", textArray);

function typeWriter(id, ar) {
  const element = document.getElementById(id);
  const aString = ar[a];
  const eHeader = element.querySelector("h2");
  eHeader.color = "red";
  const eParagraph = element.querySelector("h1");
  
  if (!isBackspacing) {
    if (i < aString.length) {
      if (aString.charAt(i) == "|") {
        isParagraph = true;
        eHeader.classList.remove("cursor");
        eParagraph.classList.add("cursor");
        i++;
        setTimeout(function() {
          typeWriter(id, ar);
        }, speedBetweenLines);
      } else {
        if (!isParagraph) {
          eHeader.textContent += aString.charAt(i);
        } else {
          eParagraph.textContent += aString.charAt(i);
        }
        i++;
        setTimeout(function() {
          typeWriter(id, ar);
        }, speedForward);
      }
    } else if (i == aString.length) {
      isBackspacing = true;
      setTimeout(function() {
        typeWriter(id, ar);
      }, speedWait);
    }
  } else {
    if (eHeader.textContent.length > 0 || eParagraph.textContent.length > 0) {
      if (eParagraph.textContent.length > 0) {
        eParagraph.textContent = eParagraph.textContent.substring(0, eParagraph.textContent.length - 1);
      } else if (eHeader.textContent.length > 0) {
        eParagraph.classList.remove("cursor");
        eHeader.classList.add("cursor");
        eHeader.textContent = eHeader.textContent.substring(0, eHeader.textContent.length - 1);
      }
      setTimeout(function() {
        typeWriter(id, ar);
      }, speedBackspace);
    } else {
      isBackspacing = false;
      i = 0;
      isParagraph = false;
      a = (a + 1) % ar.length;
      setTimeout(function() {
        typeWriter(id, ar);
      }, 50);
    }
  }
}


const url = 'https://ap-south-1.aws.data.mongodb-api.com/app/data-zhiex/endpoint/data/v1';
const apiKey = 'CpzjNd80CjZi4kWcF1cHil8Slk4Nh2OjpryNylWmQNNu7OrgLnbhTLeiVgJ9pzGU';


// async function addEmailToDatabase(mail) {

//   const data = JSON.stringify({
//     "collection": "emails",
//     "database": "email",
//     "dataSource": "Cluster0",
//      "document": {
//       "email": mail
//     }
//   });

//   const response = await fetch(url, {
//     method: 'POST',
//     // mode: 'no-cors' ,
//     headers: {
//       'Content-Type': 'application/json',
//       'Access-Control-Request-Headers': '*',
//        // 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
//       'api-key': apiKey
//     },
//     body: data
//   });

//   const result = await response.json();
//   console.log(result);
// }

async function addMail(mail) {
  try {
    console.log(mail, JSON.stringify(mail));
  const res = await fetch('http://localhost:4321/add_mail', {
      headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
      method:'POST',
      body : mail,
    });
    console.log(res);
  } catch(e) {
    console.error(e);
  }
}

const sendBtn = document.getElementById("send");
sendBtn.addEventListener("click", function() {
  const audio = document.getElementById('myAudio');
  audio.play();

  // console.log(emailId.value);
  addMail(emailId.value);
  startConfetti();
  // addEmailToDatabase(emailId.value);  
})