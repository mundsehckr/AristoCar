
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Removed ScrollArea

export default function PrivacyPolicyPage() {
  const lastUpdatedDate = "July 30, 2024"; 

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28 sm:pt-32">
        <div className="max-w-4xl mx-auto bg-card/90 backdrop-blur-md shadow-xl rounded-lg">
          <CardHeader className="p-6">
            <CardTitle className="font-headline text-3xl sm:text-4xl text-primary text-center">
              Privacy Policy
            </CardTitle>
            <p className="text-sm text-muted-foreground text-center mt-2">
              Last Updated: {lastUpdatedDate}
            </p>
          </CardHeader>
          
          <CardContent className="h-[70vh] overflow-y-auto p-6 [mask-image:linear-gradient(to_bottom,transparent_0,_black_1.5rem,_black_calc(100%-1.5rem),transparent_100%)]">
            <div className="space-y-6 text-foreground/80 leading-relaxed text-sm sm:text-base">
              <section>
                <h2 className="font-headline text-xl text-primary mb-2">1. Introduction</h2>
                <p>
                  Welcome to Carversal Marketplace ("Carversal", "we", "us", or "our"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our mobile application, or engage with our services (collectively, the "Platform"). Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the platform.
                </p>
              </section>

              <section>
                <h2 className="font-headline text-xl text-primary mb-2">2. Information We Collect</h2>
                <p>
                  We may collect information about you in a variety of ways. The information we may collect on the Platform includes:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>
                    <strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us when you register with the Platform or when you choose to participate in various activities related to the Platform, such as online chat and message boards.
                  </li>
                  <li>
                    <strong>Derivative Data:</strong> Information our servers automatically collect when you access the Platform, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Platform.
                  </li>
                  <li>
                    <strong>Financial Data:</strong> Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services from the Platform. We store only very limited, if any, financial information that we collect. Otherwise, all financial information is stored by our payment processor.
                  </li>
                  <li>
                    <strong>Mobile Device Data:</strong> Device information, such as your mobile device ID, model, and manufacturer, and information about the location of your device, if you access the Platform from a mobile device.
                  </li>
                  <li>
                    <strong>Data From Contests, Giveaways, and Surveys:</strong> Personal and other information you may provide when entering contests or giveaways and/or responding to surveys.
                  </li>
                   <li>
                    <strong>Vehicle Information:</strong> If you list a vehicle for sale, we collect information about the vehicle, including VIN, make, model, year, mileage, condition, photos, and related documentation.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-headline text-xl text-primary mb-2">3. How We Use Your Information</h2>
                <p>
                  Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Platform to:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>Create and manage your account.</li>
                  <li>Email you regarding your account or order.</li>
                  <li>Enable user-to-user communications.</li>
                  <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Platform.</li>
                  <li>Generate a personal profile about you to make future visits to the Platform more personalized.</li>
                  <li>Increase the efficiency and operation of the Platform.</li>
                  <li>Monitor and analyze usage and trends to improve your experience with the Platform.</li>
                  <li>Notify you of updates to the Platform.</li>
                  <li>Offer new products, services, and/or recommendations to you.</li>
                  <li>Perform other business activities as needed.</li>
                  <li>Prevent fraudulent transactions, monitor against theft, and protect against criminal activity.</li>
                  <li>Process payments and refunds.</li>
                  <li>Request feedback and contact you about your use of the Platform.</li>
                  <li>Resolve disputes and troubleshoot problems.</li>
                  <li>Respond to product and customer service requests.</li>
                  <li>Send you a newsletter.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-headline text-xl text-primary mb-2">4. How We Share Your Information</h2>
                <p>
                  We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>
                    <strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
                  </li>
                  <li>
                    <strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.
                  </li>
                  <li>
                    <strong>Marketing Communications:</strong> With your consent, or with an opportunity for you to withdraw consent, we may share your information with third parties for marketing purposes, as permitted by law.
                  </li>
                  <li>
                    <strong>Interactions with Other Users:</strong> If you interact with other users of the Platform, those users may see your name, profile photo, and descriptions of your activity, including sending invitations to other users, chatting with other users, liking posts, following blogs. When you post listings, other users will be able to see the information you provide about the vehicle and yourself as a seller.
                  </li>
                  <li>
                    <strong>Business Transfers:</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.
                  </li>
                </ul>
              </section>
              
              <section>
                <h2 className="font-headline text-xl text-primary mb-2">5. Tracking Technologies</h2>
                 <p><strong>Cookies and Web Beacons:</strong> We may use cookies, web beacons, tracking pixels, and other tracking technologies on the Platform to help customize the Platform and improve your experience. When you access the Platform, your personal information is not collected through the use of tracking technology. Most browsers are set to accept cookies by default. You can remove or reject cookies, but be aware that such action could affect the availability and functionality of the Platform.</p>
              </section>

              <section>
                <h2 className="font-headline text-xl text-primary mb-2">6. Data Security</h2>
                <p>
                  We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
                </p>
              </section>

              <section>
                <h2 className="font-headline text-xl text-primary mb-2">7. Your Choices and Rights</h2>
                <p>
                  You may at any time review or change the information in your account or terminate your account by:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>Logging into your account settings and updating your account.</li>
                  <li>Contacting us using the contact information provided below.</li>
                </ul>
                <p className="mt-2">
                  Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, some information may be retained in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our Terms and Conditions and/or comply with legal requirements.
                </p>
              </section>

              <section>
                <h2 className="font-headline text-xl text-primary mb-2">8. Children's Privacy</h2>
                <p>
                  Our Platform is not intended for children under the age of 13 (or 16 in certain jurisdictions). We do not knowingly collect personal information from children under 13. If we become aware that a child under 13 has provided us with personal information, we will take steps to delete such information.
                </p>
              </section>

              <section>
                <h2 className="font-headline text-xl text-primary mb-2">9. Changes to This Privacy Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
                </p>
              </section>

              <section>
                <h2 className="font-headline text-xl text-primary mb-2">10. Contact Us</h2>
                <p>
                  If you have questions or comments about this Privacy Policy, please contact us at:
                </p>
                <p className="mt-1">
                  Carversal Marketplace <br />
                  [Your Company Address, if applicable, e.g., 123 Auto Lane, Tech City, India] <br />
                  Email: privacy@carversal.com <br />
                  Or via our <a href="/contact" className="text-accent hover:underline">Contact Us</a> page.
                </p>
              </section>
            </div>
          </CardContent>
        </div>
      </main>
      <Footer />
    </div>
  );
}
