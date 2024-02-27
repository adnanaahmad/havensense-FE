import * as React from 'react';
import Miscellaneous from '../../shared/components/miscellaneous/miscellaneous';

function AboutUs() {
    let pageData = {
        title: 'About Us',
        paragraphs: [
            {
                title: 'Who are we?',
                content: 'Do you love sports? Are you a gaming enthusiast? HavenSense is the first-ever social interactive platform that provides a unified space for digital entrepreneurs and creatives in sports and gaming where you can create, interact, and earn while growing your online community. You are in the right place; look no further! At HavenSense, you can get all of this under one roof. HavenSense is the first-ever social Interactive platform for digital sports and gaming where you can play, interact, earn and make your entertainment together.'
            },
            {
                title: 'Join us with a simple, hassle-free process',
                content: 'Sign up for free. Create an account to start building your online community of gamers and sports fans. With the hassle-free registration process, users can register by linking their HavenSense account to their E-mail.'
            },
            {
                title: 'Your privacy is important to us.',
                content: 'Worry not; your privacy is our primary concern. We appreciate and value the trust you put in us. All online transactions and payments are made in the most secure method with 100% privacy. Interact safely!'
            },
            {
                title: null,
                content: `Once you have created an account with us, get yourself a profile avatar and interact with other members via our Play-by-Play feed, our most exciting feature at HavenSense. Here, users can engage with each other by simply uploading 60-second video clips of sports and gaming content. This cool user-friendly feature will make things extra captivating by enabling users to share their favorite sports and gaming highlights as well as the products and services they are offering. This unique strategy of streamlining user-generated content and the user's purchase journey will also help attract the online community to invest in your digital sports and gaming persona, and product or service listings.`
            },
            {
                title: null,
                content: `You will have complete freedom over the content you wish to create for the online marketplace. Sell your favourite, unique gaming or sports digital products and services. Ranging from online training, and coaching to in-game items, art, and photography, you have the freedom to decide how you want to earn on HavenSense. We deliver a whole gamut of sports and gaming digital products and digital services. Our mission is to inspire creativity and empower digital entrepreneurs within sports and gaming by providing a thriving online ecosystem.`
            }
        ]
    }
    return (
       <Miscellaneous data={pageData} />
    )
}

export default React.memo(AboutUs);