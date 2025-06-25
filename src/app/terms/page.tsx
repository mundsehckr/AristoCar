
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsAndConditionsPage() {
  const lastUpdatedDate = "July 30, 2024"; 

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28 sm:pt-32">
        <div className="max-w-4xl mx-auto bg-card/90 backdrop-blur-md shadow-xl rounded-lg">
          <CardHeader className="p-6">
            <CardTitle className="font-headline text-3xl sm:text-4xl text-primary text-center">
              Terms and Conditions
            </CardTitle>
            <p className="text-sm text-muted-foreground text-center mt-2">
              Last Updated: {lastUpdatedDate}
            </p>
          </CardHeader>
          
          <CardContent className="h-[70vh] overflow-y-auto p-6 [mask-image:linear-gradient(to_bottom,transparent_0,_black_1.5rem,_black_calc(100%-1.5rem),transparent_100%)]">
            <div className="space-y-6 text-foreground/80 leading-relaxed text-sm sm:text-base">
              <section>
                <h2 className="font-headline text-xl text-primary mb-2">1. Introduction and Acceptance of Terms</h2>
                <p>
                  Welcome to Carversal Marketplace ("Carversal", "we", "us", or "our"). These Terms and Conditions ("Terms") govern your access to and use of our website, mobile applications, and services (collectively, the "Platform"). By accessing or using the Platform, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, please do not use the Platform.
                </p>
              </section>

              <section>
                <h2 className="font-headline text-xl text-primary mb-2">2. Our Services</h2>
                <p>
                  Carversal provides an online platform that connects individuals looking to buy and sell pre-owned vehicles (Consumer-to-Consumer or C2C). We offer tools and features to facilitate these transactions, including AI-assisted listing creation, search functionalities, and communication tools.
                </p>
              </section>

              <section>
                <h2 className="font-headline text-xl text-primary mb-2">3. User Accounts</h2>
                <p>
                  To access certain features of the Platform, you may be required to create an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. You are responsible for safeguarding your password and for all activities that occur under your account.
                </p>
              </section>

              <section>
                <h2 className="font-headline text-xl text-primary mb-2">4. User Responsibilities</h2>
                <p>
                  Users are solely responsible for the content they post, including listings, reviews, and messages. You agree not to post any content that is false, misleading, illegal, defamatory, or infringes on the rights of others. Buyers are responsible for inspecting vehicles before purchase, and sellers are responsible for accurately representing their vehicles.
                </p>
              </section>
              
              <section>
                <h2 className="font-headline text-xl text-primary mb-2">5. Platform Role and Disclaimer</h2>
                <p>
                  <strong>
                    Carversal acts solely as a platform to facilitate connections between buyers and sellers of pre-owned vehicles. We are not a party to any transaction between users. Carversal does not buy, sell, or take ownership of any vehicles listed on the Platform.
                  </strong>
                </p>
                <p className="mt-2">
                  <strong>
                    While we strive to provide a secure and trustworthy environment by offering features like AI assistance, tools for user communication, and encouraging user verification, Carversal does not inspect, guarantee, or endorse any vehicles listed. The responsibility for thorough vehicle inspection, verification of documentation (such as RC book, insurance, PUC), negotiation of terms, and ensuring the accuracy of all information lies solely with the buyer and seller.
                  </strong>
                </p>
                <p className="mt-2">
                  <strong>
                    Buyers are strongly encouraged to conduct their own due diligence, including physical inspections and professional mechanic checks, before completing any purchase. Sellers are responsible for providing accurate and truthful information about their vehicles and for complying with all legal requirements related to the sale.
                  </strong>
                </p>
                <p className="mt-2">
                  <strong>
                    Carversal does not take responsibility for the condition, legality, quality, or safety of vehicles listed, the truth or accuracy of listings, the ability of sellers to sell vehicles, or the ability of buyers to pay for vehicles. Any disputes arising from transactions are to be resolved directly between the buyer and seller.
                  </strong>
                </p>
              </section>

              <section>
                <h2 className="font-headline text-xl text-primary mb-2">6. Listings</h2>
                <p>
                  Sellers agree to provide accurate and detailed information about the vehicles they list. Carversal reserves the right to remove any listing that violates these Terms or is deemed inappropriate, at our sole discretion.
                </p>
              </section>

              <section>
                <h2 className="font-headline text-xl text-primary mb-2">7. Transactions and Payments</h2>
                <p>
                  <strong>
                    Carversal is not involved in the actual transaction or payment process between buyers and sellers. Buyers and sellers are solely responsible for negotiating terms, agreeing on payment methods, and completing the transaction. Carversal does not process payments, offer payment protection, or guarantee payments. Users should exercise caution and use secure payment methods mutually agreed upon.
                  </strong>
                </p>
                <p className="mt-2">
                   We may provide informational resources or links to third-party services (e.g., escrow, financing) for user convenience, but Carversal does not endorse and is not responsible for these third-party services.
                </p>
              </section>

              <section>
                <h2 className="font-headline text-xl text-primary mb-2">8. Prohibited Conduct</h2>
                <p>
                  You agree not to engage in any activity that is fraudulent, illegal, or harmful to the Platform or its users. This includes, but is not limited to, spamming, phishing, distributing malware, or attempting to gain unauthorized access to our systems.
                </p>
              </section>

              <section>
                <h2 className="font-headline text-xl text-primary mb-2">9. Intellectual Property</h2>
                <p>
                  All content on the Platform, including text, graphics, logos, and software, is the property of Carversal or its licensors and is protected by intellectual property laws. You may not use, reproduce, or distribute any content from the Platform without our prior written permission.
                </p>
              </section>

              <section>
                <h2 className="font-headline text-xl text-primary mb-2">10. Limitation of Liability</h2>
                <p>
                  To the fullest extent permitted by applicable law, Carversal shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (a) your access to or use of or inability to access or use the Platform; (b) any conduct or content of any third party on the Platform, including any transaction or interaction between users; or (c) unauthorized access, use, or alteration of your transmissions or content.
                </p>
              </section>

              <section>
                <h2 className="font-headline text-xl text-primary mb-2">11. Indemnification</h2>
                <p>
                  You agree to indemnify and hold harmless Carversal and its officers, directors, employees, and agents from and against any claims, disputes, demands, liabilities, damages, losses, and costs and expenses, including, without limitation, reasonable legal and accounting fees arising out of or in any way connected with (a) your access to or use of the Platform, (b) your User Content, (c) your violation of these Terms, or (d) any transaction or dispute between you and another user.
                </p>
              </section>

              <section>
                <h2 className="font-headline text-xl text-primary mb-2">12. Governing Law</h2>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts located in Mumbai, Maharashtra.
                </p>
              </section>

              <section>
                <h2 className="font-headline text-xl text-primary mb-2">13. Changes to Terms</h2>
                <p>
                  We reserve the right to modify these Terms at any time. If we make changes, we will post the revised Terms on the Platform and update the "Last Updated" date. Your continued use of the Platform after such changes constitutes your acceptance of the new Terms.
                </p>
              </section>

              <section>
                <h2 className="font-headline text-xl text-primary mb-2">14. Contact Information</h2>
                <p>
                  If you have any questions about these Terms, please contact us at: legal@carversal.com or through our <a href="/contact" className="text-accent hover:underline">Contact Us</a> page.
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
