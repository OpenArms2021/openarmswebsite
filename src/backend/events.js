/*****************
 backend/events.js
 *****************

 'backend/events.js' is a reserved Velo file that enables you to handle backend events.

 Many of the Velo backend modules, like 'wix-stores-backend' or 'wix-media-backend', include events that are triggered when 
 specific actions occur on your site. You can write code that runs when these actions occur.

 For example, you can write code that sends a custom email to a customer when they pay for a store order.

 Example: Use the function below to capture the event of a file being uploaded to the Media Manager:

   export function wixMediaManager_onFileUploaded(event) {
       console.log('The file "' + event.fileInfo.fileName + '" was uploaded to the Media Manager');
   }

 ---
 More about Velo Backend Events: 
 https://support.wix.com/en/article/velo-backend-events

*******************/
import wixData from 'wix-data';
import {fetch} from 'wix-fetch';
import { wixEvents } from "wix-events-backend";
import wixSecretsBackend from "wix-secrets-backend";


export function test(event){
        // wixData.insert("EventLog", {"email":event.memberId, "title":event.eventId, "createdDeleted":true})
            wixData.query("DenmarkOfficers2022-2023").find().then((result)=>{
                console.log(result.items);
            })



}
export function wixEvents_onRsvpCreated(event) {
    let eventId = event.eventId;
    wixEvents.getEvent(eventId).then((result) => {
    if (result.title.toLowerCase().includes("volunteer")){
        let volunteerId = event.memberId;
        let rsvpId = event.rsvpId;
        let email = event.email;
        let toInsert = {
            "title": email,
            "volunteerId": volunteerId,
            "eventId": eventId,
            "rsvpId": rsvpId,
            "summarySubmitted": false
        };

        wixData.insert("volunteerEventHistory", toInsert)
            .then((item) => {})
            .catch((err) => {
                console.log(err);
            });
    }
        }).catch((error) => {
        console.error(error);
        });

}

export function wixEvents_onRsvpDeleted(event) {
    let eventId = event.eventId;
    let volunteerId = event.memberId;

    wixData.query("volunteerEventHistory")
        .eq("eventId", eventId)
        .eq("volunteerId", volunteerId)
        .find()
        .then((item) => {
            let id = item.items[0]._id;
            wixData.remove("volunteerEventHistory", id);

        })
        .catch((err) => {
            console.log(err);
        });

}
// export function lowertest(string){
//     console.log(string.toLowerCase())
// }
export async function wixEvents_onEventCreated(event) {
    let ping = '';
    let branch = '';
    if (event.title.toLowerCase().includes("volunteer") == true){
        if(event.title.toLowerCase().includes('Denmark')){
        ping = '<@&995498859721674802>';
        branch = 'Denmark';
        }
        else{
        ping = '<@&806387291324678165>';
        branch = 'Main';
        }
    let date = event.scheduleConfig.startDate;
    const options = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'America/New_York'
    };

    const formattedDate = date.toLocaleString('en-US', options);
    const key = await wixSecretsBackend
    .getSecret("discord_API_key")
    .then((secret)=> {return secret;
    })
    fetch(key, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content: `${ping} Our ${branch} branch will be having an event on ${formattedDate} at ${event.location.address}`
        })
})
}
}
// export function testDiscord(){
//         fetch("https://discord.com/api/webhooks/1104975858998988870/BfLvAN4aVXqC5TSVypLWS_Pj4VpRvbumjybu6voAv8h5iKP3CH_S1b8z8R4QUCn00hYW", {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             content: "hola"
//         })
// })
// }

// export function wixEvents_onEventCanceled(event) {
//     let eventId = event.eventId;
//     return wixData.query("volunteerEventHistory").eq("eventId", eventId).find().then((result) => {
//         let ids = result.items.map((result) => result._id);
//         return wixData.bulkRemove("volunteerEventHistory", ids).then(() => {
//             return 'removed';
//         })
//     })

// }