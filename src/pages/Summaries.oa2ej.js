// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/1-hello-world
import { getSummaries } from 'backend/admin.jsw';
import { approveSummary } from 'backend/admin.jsw';
import { denySummary } from 'backend/admin.jsw';

$w.onReady(function () {
    let summaries;
    let progress = $w('#progress');
    let content = $w('#content');
    let volunteer = $w('#volunteer');
    let title = $w('#title');
    let left = $w('#left');
    let right = $w('#right');
    let approve = $w('#approve');
    let deny = $w('#deny');
    let id = $w('#id');
    let currentSummary = 1;

    // let progress = $w('#progress');

    // Write your JavaScript here
    getSummaries()
        .then((allSumaries) => {
            console.log("gotten")
            summaries = allSumaries;
            console.log(summaries);
            console.log(currentSummary);
            switchSummary(summaries);
            approve.onClick(() => {
                approveSummary(id.text).then((result) => {
                    console.log('approved');
                    summaries.splice(currentSummary - 1, 1);
                    switchSummary(summaries);

                }).catch((err) => {
                    console.log(err);
                })
            })
            deny.onClick(() => {
                denySummary(id.text).then((result) => {
                    console.log('denied');
                    summaries.splice(currentSummary - 1, 1);
                    switchSummary(summaries);

                }).catch((err) => {
                    console.log(err);
                })
            })
            left.onClick(() => {
                currentSummary = currentSummary - 1;
                console.log(currentSummary);
                switchSummary(summaries);
            })
            right.onClick(() => {
                currentSummary = currentSummary + 1;
                console.log(currentSummary);
                switchSummary(summaries);
            })
        }).catch((err) => {
            console.log(err)
            content.text = (err);

        })
    // To select an element by ID use: $w('#elementID')

    // Click 'Preview' to run your code
    function switchSummary(summaries) {
        right.expand();
        right.show();
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
            content.text = "no more";
            right.collapse();
            right.hide();
            left.collapse();
            left.hide();
            progress.text = "0 out of " + summaries.length;

        } else {
            console.log(title.text)
            content.text = summaries[currentSummary - 1].content;
            progress.text = currentSummary + " out of " + summaries.length;
            volunteer.text = summaries[currentSummary - 1].volunteerInfo;
            title.text = summaries[currentSummary - 1].label;
            $w('#id').text = summaries[currentSummary - 1].id;
            console.log($w('#id').text);
        }

    }
});