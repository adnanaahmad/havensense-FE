import * as React from 'react';
import Miscellaneous from '../../shared/components/miscellaneous/miscellaneous';

function PrivacyPolicy() {
    let pageData = {
        title: 'Privacy Policy',
        paragraphs: [
            {
                title: null,
                content: `It's a difficult job to please everyone with the privacy policy. Understandably, people who use HavenSense want something short and easy to understand. Hence, we have written our public policy as simple as possible to comprehend, making sure our users make informed decisions while using HavenSense. It is of great importance to empowering you to make informed decisions when you use HavenSense by making sure you understand and have control over the information we collect, how it's used
                and when it's shared.`
            },
            {
                title: 'Information We Collect',
                content: `The information collected when you avail services at HavenSense falls under two categories.`
            },
            {
                title: 'Information you provide us',
                content: `To enjoy our services, you need to create an account at HavenSense, and for that matter, you need to provide relevant information. Similarly, to use paid services, you also need to have an account. We cannot give the account to you without having payment information from you. Basically, to use many of our services and products, you need to provide us with certain information before we proceed any further.`
            },
            {
                title: 'Personal Accounts',
                content: `If you create an account, you must provide us with some information so that we can provide our services to you. This includes a display name, a username, a password, an email address or phone number; date of birth; your display language; and third-party single sign-in information. You can also share your location in your profile and upload your address book to HavenSense to help find people you may know. Remember that your profile information, which includes your display name and username, is always public, but you can use either your real name or a pseudonym. Also, you can create multiple HavenSense accounts, for example, to express different parts of your identity, professional or otherwise.`
            },
            {
                title: 'Information we receive from third parties',
                content: `Remember, when you use other online products and services, they may share your information with us, For example, Ad partners, Developers, and publishers. Even our Ad and business partners share information with us, such as browser cookie IDs, HavenSense generated identifiers, content viewed, and actions taken on a website or an app. Few of our Ad partners, basically our advertisers, allow us to collect information directly from their website or app by integrating our advertising technology. We may also receive your information from third parties who are not our ad partners but our partners who help us evaluate the safety and quality of content on our platform.`
            },
            {
                title: 'What data do you collect about me?',
                content: `When you give us some data in return, we offer you valuable services. You provide some data; we get some data. In return, we offer valuable services. We collect your data based on the following:`,
                list: [`your viewing history`, `listening`, `commenting`, `Speaking`, `Reacting`, `How do you interact with others on the platform, such as people you follow and people who follow you, and when you use Direct Messages, including the contents of the messages, the recipients, and the date and time of messages?`, `If you communicate with us, such as through email, we will collect information about the communication and its content.`, `We collect information on links you interact with across our services (including in emails sent to you): purchases and payments. To allow you to make a payment or send money using HavenSense features or services.`, `We collect information from and about the devices you use to access HavenSense, including information about your connection, such as your IP address and browser type.`, `Information about your device and its settings include device and advertising ID, operating system, carrier, language, memory, apps installed, and battery level.`, `If you’ve chosen to share your phone's address book with us.`, `Location Information. When you use HavenSense, we collect information about your approximate location to provide the service you expect, including showing you relevant ads. You can also choose to share your current precise location or places where you’ve previously used HavenSense.`, `When you provide other information to HavenSense, including an email address or phone number, we associate that information with your HavenSense account.`, `Subject to your settings, we may also use this information to infer other information about your identity, for example, by associating your account with hashes of email addresses that share standard components with the email address you have provided to HavenSense.`]
            },
            {
                title: 'How do we use the collected information?',
                content: `Using the information collected helps us break down the systems that bring our services to your work. For example, the same data may be used differently for different purposes to deliver a single service ultimately. Information collected by HavenSense from the websites and apps of ad partners and affiliates may be combined with the other information you share with us. Note that we use the information we collect to measure and analyze the effectiveness of our products and services and to understand better how you use them in order to make them better. We use the information we collect to communicate with you about our products and services, including product updates and changes to our policies and terms. We use information you share with us or collect to conduct research, surveys, product testing, and troubleshooting to help us operate and improve our products and services.`
            },
            {
                title: 'My HavenSense account is public?',
                content: `By sharing your information with us, you should also know how we share it, why we share it, and how you can control it. When you record a 60-second video, post it, and share it with the general public, you are directing us to disclose that information as broadly as possible. Your HavenSense content, including your profile information (e.g., name, username, profile pictures), is available to the general public. The content you send to a specific HavenSense user, such as through Direct Messages. Please remember that if you’ve shared information like Direct Messages with someone else who accesses HavenSense through a third-party service, the information may be shared with the third-party service.`
            },
            {
                title: 'How or when do you share my information?',
                content: `No rule of thumb for this, but HavenSense can end up in the news or a search engine. There’s no straight answer to this! Depending on your settings, we also provide third parties with information to help us offer or operate our products and service. Remember that we may share your information with our service providers that perform functions and provide services on our behalf, including payment services providers who facilitate payments; service providers that host our various blogs and wikis; service providers that help us understand the use of our services; and those that provide fraud detection services. With advertisers. Advertising revenue enables us to provide our products and services.`
            },
            {
                title: 'How Long do We Keep Information?',
                content: `We tend to keep different types of information for a different span of time.`,
                list: [`We keep your profile information and content for the duration of your account.`, `Remember, public content can exist elsewhere even after you remove it from HavenSense.`, `Where you violate our Rules, and your account is suspended, we may keep the identifiers you used to create the account (i.e., email address or phone number) indefinitely to prevent repeat policy offenders.`, `We may keep certain information longer than our policies specify in order to comply with legal requirements and for safety and security reasons. `]
            },
            {
                title: 'How long do you keep data?',
                content: `Usually, we keep your data as long as your account is not deleted.`
            },
            {
                title: 'How can I control my data?',
                content: `You can access it, delete it, or change your settings. Basically, you’re the boss here! Deleting or deactivating is all in your hands. If you deactivate your HavenSense account, your account, including your display picture, username, and public profile, will no longer be viewable on HavenSense.com, HavenSense for iOS, and HavenSense for android. For up to 30 days after deactivation, it is still possible to restore your HavenSense account if it was accidentally or wrongfully deactivated.`
            },
            {
                title: 'Your Rights and Ours',
                content: `We provide HavenSense to people worldwide and provide many of the same privacy tools and controls to all of our users regardless of where they live. However, your experience may differ slightly from users in other countries to ensure HavenSense respects local requirements.`
            },
            {
                title: 'We have specific legal bases to use your information',
                content: `HavenSense has carefully considered the legal reasons it is permitted to collect, use, share and otherwise process your information`
            },
        ]
    }
    return (
       <Miscellaneous data={pageData} />
    )
}

export default React.memo(PrivacyPolicy);