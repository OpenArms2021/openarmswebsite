// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/1-hello-world
import { createMember } from 'backend/memberDashboard.jsw';
import { currentMember } from 'wix-members';

$w.onReady(function () {
    let submit = $w('#submit');
    let id;
    let summaryInfo;
    // Write your JavaScript here

    currentMember.getMember()
        .then((member) => {
            let memberInfo = member;
            let memberFirstName = member.contactDetails.firstName;
            console.log(memberInfo);
            submit.onClick(() => {
                let firstName = $w('#firstName').value;
                let lastName = $w('#lastName').value;
                let gender = $w('#gender').value;
                let errorMessage = $w('#errorMessage');
                if (firstName === '') {
                    errorMessage.text = "Fill out first name";
                    errorMessage.expand();
                    errorMessage.show();
                } else if (lastName === '') {
                    errorMessage.text = "Fill out last name";
                    errorMessage.expand();
                    errorMessage.show();
                } else if (gender === '') {
                    errorMessage.text = "Fill out gender";
                    errorMessage.expand();
                    errorMessage.show();
                } else {
                    createMember(firstName, lastName, gender, id).then((result) => {
                        errorMessage.text = "Sucess";
                        errorMessage.expand();
                        errorMessage.show();
                    }).catch((error) => {
                        errorMessage.text = error
                        errorMessage.show();
                        errorMessage.expand();
                    })
                }
            });

        }).catch((error) => {

        })

    // To select an element by ID use: $w('#elementID')

    // Click 'Preview' to run your code
});