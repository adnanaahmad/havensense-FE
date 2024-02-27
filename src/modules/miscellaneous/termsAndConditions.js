import * as React from 'react';
import Miscellaneous from '../../shared/components/miscellaneous/miscellaneous';

function TermsAndConditions() {
    let pageData = {
        title: 'Terms And Conditions',
        paragraphs: [
            {
                title: null,
                content: `A binding contract between you and HavenSense lets you use HavenSense services. You may use the services only if you are not a person who is outlawed from receiving services from HavenSense under the laws of the applicable jurisdiction. Under any scenario, to use the services, you must be at least 13 years old. In any case, you must be at least 13 years old; if you agree to the Terms and Conditions and use the services on behalf of any company or other organization, you represent and warrant that you are fully authorized. Moreover, you have the authority to create this binding contract and have the power to bind to these terms and conditions`
            },
            {
                title: 'Privacy',
                content: `Our privacy policy illustrates the valuable information you provide to us when availing of our services. You understand that through your use of our services, you give implied consent to the collection and use of this information to HavenSense and its affiliates.`
            },
            {
                title: 'Content on the Services',
                content: `It is essential to know that you are solely responsible for the content you provide to us. Always make sure to provide the content you are comfortable sharing with other people. The services you use, and your content should comply with the applicable rules, laws, and regulations.
                We do not endorse, support, represent, or guarantee the truthfulness or reliability of any content or communications shared or posted at HavenSense. You understand that relying on any content while using the services is entirely at your own risk. While using the services, you may encounter content or communications that might be offensive, harmful, inappropriate, even misleading, or deceptive. We do not take responsibility for such content as such content is the sole responsibility of the person who originated the content and not us. We do not take responsibility for such misleading content. Any reliance on such content is at your own risk. HavenSense reserves the rights and authority to remove content that violates our User Agreement. The user must know that by submitting, posting, or displaying the content, you give us a worldwide, non-exclusive, royalty-free license to use, reproduce, process, adapt, publish, display, copy or distribute any such content in all media.`
            },
            {
                title: 'Your Rights and Grant of Rights in the Content',
                content: `You retain your rights to any Content you submit, post, or display on or through the Services. What’s yours is yours — you own your content (and your incorporated audio, photos, and videos are considered part of the content).
                By submitting, posting, or displaying content on or through the Services, you grant us a worldwide, non-exclusive, royalty-free license (with the right to sublicense) to use, copy, reproduce, process, adapt, modify, publish, transmit, display and distribute such content in all media or distribution methods. This license authorizes us to make your content available to the world and let others do the same.`
            },
            {
                title: 'Using the Services',
                content: `On HavenSense, users can create content, connect with users, build an online community, and sell any digital product or service in sports and gaming directly from their profile. Please review the User Agreement and clearly understand what is prohibited from the services.  
                On HavenSense, users and content creators can interact, collaborate on content, and pay each other directly for the services or products they are selling on the platform. Since HavenSense will be a secondary market for digital games and an outlet for game developers to sell their games, you agree that the platform will charge 7% per transaction. For our peer-to-peer marketplace, You agree that HavenSense will take a 5% fee per transaction for users selling digital products and services in sports and gaming for everything outside the digital games category. Our online marketplace will charge a 5% per transaction platform fee to both buyers and sellers. The exercising of these transactions will be facilitated using Stripe, which is a secure payment integration that offers a high-quality user experience and optimal functionality. Users on the platform will be able to drive growth for their online stores and profiles for as low as $4 by utilizing HavenSense ads. On HavenSense, users are given the option to donate to other users or content creators. HavenSense will take 5% of these user-to-user donations. Users are also allowed to donate directly to the platform to support us in our journey to grow and improve the platform as they enjoy the user experience. Please know that our Services evolve constantly. The Services may change from time to time, at our discretion. 
                HavenSense may also offer services or features for which additional terms and conditions or charges may apply.`
            },
            {
                title: 'Your Account',
                content: `An account needs to be created to use our services. Please remember that it is your responsibility to protect your account yourself. Use a strong password to safeguard your account. We do not take any responsibility for any loss or damage if you fail to comply with the above-said information. `
            },
            {
                title: 'Your License to Use the Services',
                content: `HavenSense gives you a personal, worldwide, royalty-free, non-assignable, and non-exclusive license to use the software provided as part of the Services. This license has the sole purpose of enabling you to use and enjoy the benefit of the Services as provided by HavenSense, in the manner permitted by these Terms.`
            },
            {
                title: 'Ending These Terms',
                content: `If you wish to stop using our services and end your legal agreement with HavenSense, deleting or deleting your account will help you do so. However, we may also suspend or delete your HavenSense account permanently, provided you don’t comply with our Terms and Conditions of services. We may also revise these Terms from time to time. `
            }
        ]
    }
    return (
       <Miscellaneous data={pageData} />
    )
}

export default React.memo(TermsAndConditions);