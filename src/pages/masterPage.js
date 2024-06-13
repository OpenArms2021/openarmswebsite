import wixLocation from 'wix-location';
import { currentMember } from 'wix-members';
import { authentication } from 'wix-members';

$w.onReady(function () {
	// let discord = $w('#discord');
	let email = $w('#emailLink');
	// discord.onClick(()=>{
	//  wixLocation.to('https://discord.gg/nsg8tMN9D7');
	// });
		email.onClick(()=>{
	 console.log('emailLink');
	 wixLocation.to('openarms@<someplace.com>?subject=<subject>');
	});
  });

