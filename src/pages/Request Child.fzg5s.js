// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/1-hello-world
import { getRequests } from 'backend/admin.jsw';
import { approveRequest } from 'backend/admin.jsw'
import { denyRequest } from 'backend/admin.jsw'
$w.onReady(function () {
    let requests;
    let progress = $w('#progress');
    let id = $w('#id');
    let title = $w('#title');
    let left = $w('#left')
    let right = $w('#right');
    let approve = $w('#approve');
    let deny = $w('#deny');
    let currentSummary = 1;

    // let progress = $w('#progress');
    console.log("gib")
    // Write your JavaScript here
    getRequests()
        .then((allRequests) => {
            console.log(allRequests)
            requests = allRequests;
            console.log(requests);
            console.log(currentSummary);
            switchSummary(requests);
            approve.onClick(() => {
                approveRequest(id.text).then((result) => {
                    console.log('approved');
                    requests.splice(currentSummary - 1, 1);
                    switchSummary(requests);

                }).catch((err) => {
                    console.log(err);
                })
            })
            deny.onClick(() => {
                denyRequest(id.text).then((result) => {
                    console.log('denied');
                    requests.splice(currentSummary - 1, 1);
                    switchSummary(requests);

                }).catch((err) => {
                    console.log(err);
                    title.text = err

                })
            });
            left.onClick(() => {
                currentSummary = currentSummary - 1;
                console.log(currentSummary);
                switchSummary(requests);
            })
            right.onClick(() => {
                currentSummary = currentSummary + 1;
                console.log(currentSummary);
                switchSummary(requests);
            })

            function switchSummary(summaries) {
                console.log("rihgt")
                right.expand();
                right.show();
                console.log("lft")
                left.expand();
                left.show();
                if (currentSummary > summaries.length) {
                    currentSummary = currentSummary - 1;
                }
                if (currentSummary <= 1) {
                    left.collapse();
                    left.hide();
                }
                if (currentSummary === summaries.length) {
                    right.collapse();
                    right.hide();
                }
                if (summaries.length < 1) {
                    title.text = "no more";
                    right.collapse();
                    right.hide();
                    left.collapse();
                    left.hide();
                    progress.text = "0 out of " + summaries.length;

                } else {
                    console.log(title.text)
                    title.text = summaries[currentSummary - 1].label;
                    progress.text = currentSummary + " out of " + summaries.length;
                    id.text = summaries[currentSummary - 1].id
                }

            }
        }).catch((err) => {
            console.log(err);
            title.text = err
        })

    // To select an element by ID use: $w('#elementID')

    // Click 'Preview' to run your code
})