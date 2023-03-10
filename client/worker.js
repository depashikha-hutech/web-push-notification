// self.addEventListener('push', function(e) {
//     const data = e.data.json();
//     console.log("recived....");
//     self.registration.showNotification(
//  data.title,
//         {
//            body: data.body,
//        }
//     )
// })

this.addEventListener("push", function (e) {
     const data = e.data.json();
     const options = {
       body: data.body,
       image: "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/feature/image/93075/s465_Untitled__960___640px_.png",     
       icon:"https://cdn-icons-png.flaticon.com/512/7579/7579710.png"  
       };
     console.log({ options });
     this.registration.showNotification("Zefayar", options);
   });