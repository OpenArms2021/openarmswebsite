// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/1-hello-world
import { getOpenChildren } from 'backend/memberDashboard.jsw';
import { currentMember } from 'wix-members';
import { getSummaries } from 'backend/memberDashboard.jsw';
import { createChildRequest } from 'backend/memberDashboard.jsw';

$w.onReady(function () {
    let submit = $w('#submit');
    let id;
    let summaryInfo;
    let errorMessage = $w('#errorMessage')
    // Write your JavaScript here
    currentMember.getMember()
        .then((member) => {
            let memberInfo = member;
            getOpenChildren()
                .then((result) => {
                    console.log(result)
                    $w('#children').options = result;
                    submit.onClick(() => {
                        console.log($w('#children').value)
                                errorMessage.collapse();
                                errorMessage.hide();
                        createChildRequest(memberInfo._id, $w('#children').value).then((result) => {
                                console.log("sucess")
                                errorMessage.text = "sucess"
                                errorMessage.expand();
                                errorMessage.show();
                            })
                            .catch((err) => {
                                console.log(err)
                                errorMessage.text = err
                                errorMessage.expand();
                                errorMessage.show();
                            })
                    })
                })
            let memberFirstName = member.contactDetails.firstName;
            console.log(memberInfo);
            $w('#title').text = "Welcome to your dashboard " + memberFirstName;
            id = member._id;
            console.log(id);
            getSummaries(id)
                .then((eventOptions) => {
                    console.log(eventOptions);
                    summaryInfo = eventOptions.map(({ label, value, content }) => {
                        return {
                            "label": label,
                            "value": value,
                            "content": content
                        }
                    });
                    $w('#summarySelector').options = summaryInfo;
                    $w('#summarySelector').onChange(() => {
                        $w('#summaryTitle').text = $w('#summarySelector').label;
                        let content;
                        summaryInfo.forEach(summary => {
                            if ($w('#summarySelector').value === summary.value) {
                                content = summary.content;
                            }
                        })
                        $w('#content').text = content;

                    })
                }).catch((err) => {
                    console.log(err);
                    $w('#summaryErrorMessage').text = err;
                    $w('#summaryErrorMessage').expand();
                    $w('#summaryErrorMessage').show();
                })

        }).catch((error) => {
            console.log(error);
        })

    // To select an element by ID use: $w('#elementID')

    // Click 'Preview' to run your code
});