// import wixLocation from 'wix-location';
// import { getEvent } from 'backend/events.jsw';
// import { getMemberInfo } from 'backend/events.jsw'
// import wixEvents from 'wix-events';
// //normally your able to change your name however with this version you are forced to use your profile name.
// $w.onReady(function () {
//     //use custom register
//     disableForm();
//     wixLocation.onChange(() => {
//         disableForm();

//     });
//     //get slug
//     let eventSlug = wixLocation.path[1];
//     //get current member 
//     let eventId;
//     getIdBySlug(eventSlug).then((result) => {
//         eventId = result;
//     }).catch((err)=>{
//         console.log(err);
//     })
//     let memberInfo;
//     getCurrentMember().then((result) => {
//         memberInfo = result;
//     });
//     $w('#confirm').onClick(() => {
//         registerForEvent(eventId, memberInfo);
//     });

//     function disableForm() {
//         // without this recurring events always choose the event that was first selected even if it was later changed to a later version of the recurring event
//         eventSlug = wixLocation.path[1];
//         getIdBySlug(eventSlug).then((result) => {
//             eventId = result;
//         });
//         //if there is a form in url
//         let page = wixLocation.path[2];
//         if (page === "form") {
//             console.log("form");
//             $w('#events1').hide();
//             $w('#events1').collapse();
//             $w('#form').show();
//             $w('#form').expand();

//         } else {
//             $w('#events1').show();
//             $w('#events1').expand();
//             $w('#form').hide();
//             $w('#form').collapse();

//         }
//     }

//     function getIdBySlug(eventSlug) {
//         return getEvent(eventSlug)
//             .then((results) => {
//                 //returns an object with 
//                 return results[0]._id;
//             }).catch((error) => {
//                 console.log(error);
//             });
//     }

//     function getCurrentMember() {
//         //dtermine how much data to get 'full', 'public'
//         return getMemberInfo({ "fieldsets": ['FULL'] })
//             .then((member) => {
//                 console.log(member);
//                 return member;
//             })
//             .catch((error) => {
//                 console.log(error);
//             });
//         //wixLocation.path is an array path[1] is the slug to get event details
//         //gives a promise
//     }

//     function registerForEvent(eventId, memberInfo) {
//         const formValues = [
//             { "name": "rsvpStatus", "value": "YES" },
//             { "name": "firstName", "value": memberInfo.contactDetails.firstName },
//             { "name": "lastName", "value": memberInfo.contactDetails.lastName },
//             { "name": "email", "value": memberInfo.loginEmail }
//         ];
//         console.log(formValues);
//         wixEvents.rsvp.createRsvp(eventId, formValues)
//             .then((result) => {
//                 console.log(result);
// 				wixLocation.to('/events')
//             })
//             .catch((error) => {
// 				$w('#errorMessage').text=error;
//             });
//     }
// })