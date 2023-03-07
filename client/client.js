const publicVapidKey = "BFai2Ubydtsw0u5cbCiFXxIA5AORnFmA7cE-qa5RNKfcRtK8ZfNFyEH-lLee0pTO_8WCqPC5hvMOs4LAo5fOQLc";
// check for service  worker
if('serviceWorker' in navigator) {
    send().catch(console.log)
}
//
//register   service worker ,resister push,send push
 async function send(){
    // register  service worker
     console.log("registration service worker");
     const register = await navigator.serviceWorker.register('./worker.js', {
        scope:'/'
     });
     // registerd push
     console.log("registerd....");
     const subscription = await register.pushManager.subscribe({
                 userVisibleOnly: true,
                applicationServerKey: publicVapidKey,
             });
        
 
// send pushh notification
  console.log("notification....");
     
    await fetch("/subscribe", {
         method: "POST",
         body: JSON.stringify(subscription),
         headers: {
             "Content-Type": "application/json",
         }
     });
 }
