// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/1-hello-world
import { currentMember } from 'wix-members';
import { authentication } from 'wix-members';
import wixLocation from 'wix-location';
//redirect to dashboard

$w.onReady(function () {
    // Write your JavaScript here
    $w('#wixEvents1').hide();
    $w('#preloader').show();
    let loggedIn = authentication.loggedIn;
    if (loggedIn) {
        let role;
        currentMember.getRoles()
            .then((roles) => {
                console.log(roles);
                role = roles[0].title;

                if (role === 'Volunteer') {
                    // volunteer id = 6e9fecfa-2e93-4197-b446-33636c4b7a90
                    $w('#wixEvents1').categoryId = "6e9fecfa-2e93-4197-b446-33636c4b7a90";
                    $w('#wixEvents1').show();
                    $w('#preloader').hide();
                } else if (role === 'Member') {
                    //special id = ffc8851c-5e19-4c02-95ee-1142e890de09
                    console.log('MEMBER');
                    $w('#wixEvents1').categoryId = "ffc8851c-5e19-4c02-95ee-1142e890de09";
                    $w('#wixEvents1').show();
                    $w('#preloader').hide();

                }

            })
            .catch((error) => {
                console.error(error);
            });

    }
});