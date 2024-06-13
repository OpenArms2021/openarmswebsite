// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/1-hello-world
import { getMemberInfo } from 'backend/events.jsw';
import { getEventHistory } from 'backend/dashboard.jsw';
import { getEventsData } from 'backend/dashboard.jsw';
import { submitSummary } from 'backend/dashboard.jsw';
import { getMembers } from 'backend/dashboard.jsw';
import { currentMember } from 'wix-members';
import { authentication } from 'wix-members';
import wixLocation from 'wix-location';
let loggedIn = authentication.loggedIn;

if (loggedIn) {
    let role;
    currentMember.getRoles()
        .then((roles) => {
            role = roles[0].title;
            if (role === 'Member') {
                wixLocation.to("/member-dashboard");
            }
        })
        .catch((error) => {
            console.error(error);
        });
}
$w.onReady(function () {

    let buddySelector = $w('#buddySelector')
    let errorMessage = $w('#errorMessage');

    // Write your JavaScript here
    let memberInfo;
    let memberFirstName;
    getMemberInfo({ "fieldsets": ['FULL'] })
        .then((member) => {
            memberInfo = member;
            memberFirstName = member.contactDetails.firstName;
            $w('#title').text = "Welcome to your dashboard " + memberFirstName;
            getEventHistory(memberInfo._id)
                .then((eventIds) => {
                    getEventsData(eventIds)
                        .then((result) => {
                            let eventOptions = result.map(({ _id, title, scheduleFormatted }) => {
                                return {
                                    "label": title + " " + scheduleFormatted,
                                    "value": _id
                                }

                            });
                            $w("#eventSelector").options = eventOptions;
                            preloader()
                        }).catch((error) => {
                            console.log(error);
                            errorMessage.show();
                            errorMessage.expand();
                            errorMessage.text = error;
                        });

                }).catch((error) => {
                    console.log(error);

                    errorMessage.show();
                    errorMessage.expand();
                    errorMessage.text = error;
                });
        })
        .catch((error) => {
            console.log(error);
            errorMessage.show();
            errorMessage.expand();
            errorMessage.text = error;
        });
    getMembers()
        .then((buddyOptions) => {
            console.log(buddyOptions)
            $w('#buddySelector').options = buddyOptions;
            $w('#buddySelector').selectedIndex = 0;        
        }).catch((error) => {
            console.log(error);

            errorMessage.show();
            errorMessage.expand();
            errorMessage.text = error;
        });

    const eventSelector = $w('#eventSelector');
    const contentField = $w('#content');
    const submit = $w('#submit');
    currentMember.getMember()
        .then((member) => {
            let memberId = member._id;
            let memberName = member.contactDetails.firstName + " " + member.contactDetails.lastName;
            submit.onClick(() => {
                errorMessage.collapse();
                errorMessage.hide();
                let eventId = eventSelector.value;
                let content = contentField.value;
                let buddyId = $w('#buddySelector').value;
                if (eventId === '') {
                    errorMessage.show();
                    errorMessage.expand();
                    errorMessage.text = "Choose the event";
                } else if (buddyId === '') {
                    errorMessage.show();
                    errorMessage.expand();
                    errorMessage.text = "Choose your buddy for the event";
                } else if (content === '') {
                    errorMessage.show();
                    errorMessage.expand();
                    errorMessage.text = "Write a summary";
                } else {
                    submitSummary(eventId, memberId, content, memberName, buddyId)
                        .then((results) => {
                            console.log(results);
                            errorMessage.show();
                            errorMessage.expand();
                            errorMessage.text = "Success";
                        }).catch((error) => {
                            console.log(error);
                            errorMessage.show();
                            errorMessage.expand();
                            errorMessage.text = error;
                        });
                }
            })
        }).catch((error) => {
            console.log(error);
        })
});
function preloader(){
    $w('#preloading').hide()
    $w('#dashboard').show()
}