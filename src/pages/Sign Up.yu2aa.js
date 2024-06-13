//the wix api requires that both emails and labels are passed in as apis
import { contacts } from 'wix-crm';
import { addRole } from 'backend/register.jsw'
import { customRegister } from 'backend/register.jsw';
import { authentication } from 'wix-members';
import { checkEmailDuplicates } from 'backend/register.jsw';

let emails = [];
let labels = [];
let phones = [];

$w.onReady(function () {
    const errorMessage = $w('#error');
    $w('#submit').onClick(() => {

        emails = [];
        labels = [];
        phones = [];
        const firstName = $w('#firstName').value;
        const lastName = $w('#lastName').value;
        const email = $w('#email').value;
        const phone = $w('#phoneNumber').value;
        const gender = $w('#gender').value;
        const role = $w('#role').value;
        const password = $w('#password').value;
        const address = $w('#address').value;
        emails.push(email);
        labels.push(role);
        phones.push(phone);
        // Add labels/roles
        if (validateInputs(firstName, lastName, email, phone, address, gender, role, password)) {

            let options = {
                contactInfo: {
                    "firstName": firstName,
                    "lastName": lastName,
                    "emails": emails,
                    "phones": phones,
                    "labels": labels,
                    "gender": gender
                },
                privacyStatus: 'PUBLIC'
            }

            customRegister(email, password, options)
                .then((registrationResult) => {
                    console.log(registrationResult);
                    addRole(role, registrationResult.member._id).then(() => {
                        authentication.login(email, password).then(() => {
                            const addressInfo = {
                                addresses: [{
                                    tag: "Home",
                                    address: $w("#address").value
                                }]
                            }
                            contacts.appendOrCreateContact(addressInfo).then((result) => {
                                console.log("sucess");
                                console.log(result);
                                errorMessage.html = "<p style=' color: #30B21A;'>" + "Sucess" + "</p>";
                            }).catch((error) => {
                                console.log(error.message);
                                errorMessage.text = error.message;
                                errorMessage.expand();
                            });
                        }).catch((error) => {
                            console.log(error.message);
                            errorMessage.text = error.message;
                            errorMessage.expand();
                        })
                    }).catch((error) => {
                        console.log(error);
                        errorMessage.text = error.message;
                        errorMessage.expand();
                    }); //register with address
                }).catch((error) => {
                    console.log(error.message);
                    errorMessage.text = error.message;
                    errorMessage.expand();
                })
        }
    });
});

function validateInputs(firstName, lastName, email, phoneNumber, address, gender, role, password) {
    if (firstName === "" || lastName === "" || email === "" || phoneNumber === "" || address === "" || gender === "" || role === "" || password === "") {
        $w('#error').text = "Fill out all fields."
        $w('#error').expand();
        console.log("false");
        return false;
    } else {
        console.log("true");

        return true;
    }
}