const publicVapidKey = "BGE0hEoY6OLW48c_oQKB9quw2LEStTkR5J33_0FbcSFbYgDTt5DRb0CADfqVtF_Kz1WIOg3xNus2TZYl3MDMZ4M";
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
   await fetch("/subscribe",{
         method: "POST",
         body: JSON.stringify(subscription),
         headers: {
             "Content-Type": "application/json",
         }
     });
 }
