"use client"

import { useState } from "react"
import { X, Shield, FileText, Lock, Mail, Globe, Scale } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

type ModalType = "privacy" | "terms" | null

interface LegalModalsProps {
  openModal: ModalType
  setOpenModal: (modal: ModalType) => void
}

export function LegalModals({ openModal, setOpenModal }: LegalModalsProps) {
  const isOpen = openModal !== null

  const handleClose = () => setOpenModal(null)

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className={cn(
          "fixed inset-2 sm:inset-4 md:inset-8 lg:inset-12 xl:inset-20 z-50 bg-background rounded-lg sm:rounded-xl lg:rounded-2xl shadow-2xl transition-all duration-300 flex flex-col overflow-hidden",
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 lg:p-6 border-b border-border shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {openModal === "privacy" ? (
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              </div>
            ) : (
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              </div>
            )}
            <div className="min-w-0">
              <h2 id="legal-modal-title" className="font-serif text-lg sm:text-xl lg:text-2xl truncate">
                {openModal === "privacy" ? "Privacy Policy" : "Terms of Service"}
              </h2>
              <p className="text-[10px] sm:text-xs text-muted-foreground">Last updated: January 15, 2026</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="rounded-full hover:bg-secondary h-8 w-8 sm:h-10 sm:w-10 shrink-0"
            aria-label="Close modal"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>

        {/* Content */}
        <ScrollArea className="flex-1">
          <div className="p-3 sm:p-4 lg:p-6 xl:p-8">
            {openModal === "privacy" ? <PrivacyPolicyContent /> : <TermsOfServiceContent />}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="p-3 sm:p-4 lg:p-6 border-t border-border shrink-0 bg-secondary/30">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <p className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground text-center sm:text-left">
              Questions? Contact us at{" "}
              <a href="mailto:legal@maison.com" className="text-primary hover:underline">
                legal@maison.com
              </a>
            </p>
            <Button onClick={handleClose} className="rounded-full px-6 sm:px-8 h-9 sm:h-10 text-xs sm:text-sm w-full sm:w-auto">
              I Understand
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

function PrivacyPolicyContent() {
  return (
    <div className="prose prose-sm sm:prose max-w-none text-foreground">
      <div className="bg-primary/5 rounded-xl p-4 sm:p-6 mb-8">
        <p className="text-sm sm:text-base leading-relaxed m-0">
          At MAISON, we are committed to protecting your privacy and ensuring the security of your personal information. 
          This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our 
          website or make a purchase from our store.
        </p>
      </div>

      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Lock className="h-5 w-5 text-primary shrink-0" />
          <h3 className="font-serif text-lg sm:text-xl m-0">1. Information We Collect</h3>
        </div>
        <div className="pl-7 space-y-4">
          <div>
            <h4 className="font-medium text-sm sm:text-base mb-2">Personal Information</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              When you make a purchase or create an account, we collect personal information including your name, 
              email address, shipping address, billing address, phone number, and payment information. We collect 
              this information only when you voluntarily provide it to us.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm sm:text-base mb-2">Automatically Collected Information</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              When you visit our website, we automatically collect certain information about your device, including 
              your IP address, browser type, operating system, referring URLs, and information about how you interact 
              with our site. We may also collect information about your browsing behavior, such as pages viewed, 
              products viewed, and time spent on pages.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm sm:text-base mb-2">Cookies and Tracking Technologies</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We use cookies, pixel tags, and similar technologies to enhance your browsing experience, analyze site 
              traffic, and personalize content. You can control cookie preferences through your browser settings, 
              though disabling cookies may affect site functionality.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="h-5 w-5 text-primary shrink-0" />
          <h3 className="font-serif text-lg sm:text-xl m-0">2. How We Use Your Information</h3>
        </div>
        <div className="pl-7">
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">We use the information we collect to:</p>
          <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
            <li>Process and fulfill your orders, including shipping and payment processing</li>
            <li>Communicate with you about your orders, account, and customer service inquiries</li>
            <li>Send promotional emails about new products, special offers, and events (with your consent)</li>
            <li>Improve our website, products, and services based on your feedback and usage patterns</li>
            <li>Detect and prevent fraud, unauthorized access, and other illegal activities</li>
            <li>Comply with legal obligations and enforce our terms of service</li>
            <li>Personalize your shopping experience and provide product recommendations</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="h-5 w-5 text-primary shrink-0" />
          <h3 className="font-serif text-lg sm:text-xl m-0">3. Information Sharing and Disclosure</h3>
        </div>
        <div className="pl-7 space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            We do not sell, trade, or rent your personal information to third parties. However, we may share your 
            information in the following circumstances:
          </p>
          <div>
            <h4 className="font-medium text-sm sm:text-base mb-2">Service Providers</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We share information with trusted third-party service providers who assist us in operating our website, 
              processing payments, shipping orders, and conducting our business. These providers are contractually 
              obligated to keep your information confidential and secure.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm sm:text-base mb-2">Legal Requirements</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We may disclose your information when required by law, such as in response to a court order, subpoena, 
              or government request, or when we believe disclosure is necessary to protect our rights, your safety, 
              or the safety of others.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Scale className="h-5 w-5 text-primary shrink-0" />
          <h3 className="font-serif text-lg sm:text-xl m-0">4. Your Rights and Choices</h3>
        </div>
        <div className="pl-7 space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">You have the right to:</p>
          <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
            <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
            <li><strong>Correction:</strong> Request that we correct any inaccurate or incomplete information</li>
            <li><strong>Deletion:</strong> Request that we delete your personal information, subject to legal requirements</li>
            <li><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time by clicking the unsubscribe link</li>
            <li><strong>Data Portability:</strong> Request your data in a structured, commonly used format</li>
            <li><strong>Withdraw Consent:</strong> Withdraw your consent for data processing where applicable</li>
          </ul>
          <p className="text-sm text-muted-foreground leading-relaxed">
            To exercise any of these rights, please contact us at{" "}
            <a href="mailto:privacy@maison.com" className="text-primary hover:underline">privacy@maison.com</a>.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Lock className="h-5 w-5 text-primary shrink-0" />
          <h3 className="font-serif text-lg sm:text-xl m-0">5. Data Security</h3>
        </div>
        <div className="pl-7">
          <p className="text-sm text-muted-foreground leading-relaxed">
            We implement industry-standard security measures to protect your personal information, including SSL 
            encryption, secure payment processing through PCI-compliant providers, and regular security audits. 
            However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute 
            security. We encourage you to use strong passwords and to keep your account credentials confidential.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Mail className="h-5 w-5 text-primary shrink-0" />
          <h3 className="font-serif text-lg sm:text-xl m-0">6. Contact Us</h3>
        </div>
        <div className="pl-7">
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            If you have any questions about this Privacy Policy or our data practices, please contact us:
          </p>
          <div className="bg-secondary/50 rounded-lg p-4 text-sm">
            <p className="font-medium mb-2">MAISON Fashion House</p>
            <p className="text-muted-foreground">Email: privacy@maison.com</p>
            <p className="text-muted-foreground">Phone: +1 (888) 555-0123</p>
            <p className="text-muted-foreground">Address: 123 Fashion Avenue, New York, NY 10001</p>
          </div>
        </div>
      </section>
    </div>
  )
}

function TermsOfServiceContent() {
  return (
    <div className="prose prose-sm sm:prose max-w-none text-foreground">
      <div className="bg-primary/5 rounded-xl p-4 sm:p-6 mb-8">
        <p className="text-sm sm:text-base leading-relaxed m-0">
          Welcome to MAISON. These Terms of Service govern your use of our website and your purchase of products 
          from our online store. By accessing or using our website, you agree to be bound by these terms. Please 
          read them carefully before making a purchase.
        </p>
      </div>

      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="h-5 w-5 text-primary shrink-0" />
          <h3 className="font-serif text-lg sm:text-xl m-0">1. Acceptance of Terms</h3>
        </div>
        <div className="pl-7">
          <p className="text-sm text-muted-foreground leading-relaxed">
            By accessing, browsing, or using the MAISON website, you acknowledge that you have read, understood, 
            and agree to be bound by these Terms of Service, our Privacy Policy, and all applicable laws and 
            regulations. If you do not agree to these terms, you must not use our website or services. We reserve 
            the right to modify these terms at any time, and such modifications will be effective immediately upon 
            posting. Your continued use of the website constitutes acceptance of any modified terms.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="h-5 w-5 text-primary shrink-0" />
          <h3 className="font-serif text-lg sm:text-xl m-0">2. Products and Pricing</h3>
        </div>
        <div className="pl-7 space-y-4">
          <div>
            <h4 className="font-medium text-sm sm:text-base mb-2">Product Information</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We strive to display our products as accurately as possible. However, colors may appear differently 
              depending on your monitor settings, and actual products may vary slightly from images shown. Product 
              descriptions are provided for informational purposes and do not constitute a warranty.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm sm:text-base mb-2">Pricing</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              All prices are displayed in US dollars unless otherwise specified. Prices are subject to change 
              without notice. We reserve the right to correct any pricing errors. If we discover an error in 
              the price of an item you have ordered, we will contact you before shipping and give you the option 
              to proceed or cancel your order.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm sm:text-base mb-2">Availability</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              All orders are subject to product availability. We reserve the right to limit quantities or refuse 
              orders at our sole discretion. If an item becomes unavailable after you place an order, we will 
              notify you and offer alternatives or a full refund.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="h-5 w-5 text-primary shrink-0" />
          <h3 className="font-serif text-lg sm:text-xl m-0">3. Orders and Payment</h3>
        </div>
        <div className="pl-7 space-y-4">
          <div>
            <h4 className="font-medium text-sm sm:text-base mb-2">Order Acceptance</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your order constitutes an offer to purchase. We reserve the right to accept or decline your order 
              for any reason, including product availability, errors in pricing or product information, or 
              suspected fraud. Order confirmation does not constitute acceptance; acceptance occurs when we ship 
              your order.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm sm:text-base mb-2">Payment Methods</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We accept major credit cards (Visa, Mastercard, American Express), PayPal, and other payment 
              methods as displayed at checkout. Payment is processed securely through our PCI-compliant payment 
              providers. By providing payment information, you represent that you are authorized to use the 
              payment method.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm sm:text-base mb-2">Sales Tax</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Sales tax will be added to orders where applicable, based on the shipping destination and current 
              tax regulations. International orders may be subject to customs duties and import taxes, which are 
              the responsibility of the buyer.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Lock className="h-5 w-5 text-primary shrink-0" />
          <h3 className="font-serif text-lg sm:text-xl m-0">4. Shipping and Delivery</h3>
        </div>
        <div className="pl-7 space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            We offer shipping to most countries worldwide. Shipping times and costs vary based on destination 
            and shipping method selected. Estimated delivery times are not guaranteed and may be affected by 
            factors beyond our control, including weather, customs processing, and carrier delays.
          </p>
          <div className="bg-secondary/50 rounded-lg p-4">
            <p className="font-medium text-sm mb-2">Shipping Options:</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>Standard Shipping (5-7 business days): $25 or FREE on orders over $500</li>
              <li>Express Shipping (2-3 business days): $45</li>
              <li>Overnight Shipping (1 business day): $75</li>
              <li>International Shipping (7-14 business days): Calculated at checkout</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Scale className="h-5 w-5 text-primary shrink-0" />
          <h3 className="font-serif text-lg sm:text-xl m-0">5. Returns and Refunds</h3>
        </div>
        <div className="pl-7 space-y-4">
          <div>
            <h4 className="font-medium text-sm sm:text-base mb-2">Return Policy</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We accept returns within 30 days of delivery for unworn, unwashed items with original tags 
              attached. Items must be in their original condition and packaging. Final sale items, intimates, 
              and customized products cannot be returned.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm sm:text-base mb-2">Refund Process</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Once we receive and inspect your return, we will process your refund within 5-7 business days. 
              Refunds will be issued to the original payment method. Shipping costs are non-refundable unless 
              the return is due to our error or a defective product.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm sm:text-base mb-2">Exchanges</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We offer free exchanges for different sizes or colors within 30 days of delivery, subject to 
              availability. Please contact our customer service team to initiate an exchange.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="h-5 w-5 text-primary shrink-0" />
          <h3 className="font-serif text-lg sm:text-xl m-0">6. Intellectual Property</h3>
        </div>
        <div className="pl-7">
          <p className="text-sm text-muted-foreground leading-relaxed">
            All content on this website, including text, graphics, logos, images, product designs, and software, 
            is the property of MAISON or its content suppliers and is protected by copyright, trademark, and other 
            intellectual property laws. You may not reproduce, distribute, modify, or create derivative works 
            from any content without our prior written consent.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="h-5 w-5 text-primary shrink-0" />
          <h3 className="font-serif text-lg sm:text-xl m-0">7. Limitation of Liability</h3>
        </div>
        <div className="pl-7">
          <p className="text-sm text-muted-foreground leading-relaxed">
            To the fullest extent permitted by law, MAISON shall not be liable for any indirect, incidental, 
            special, consequential, or punitive damages arising from your use of our website or products. Our 
            total liability shall not exceed the amount you paid for the specific product giving rise to the claim. 
            This limitation applies regardless of the theory of liability.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Mail className="h-5 w-5 text-primary shrink-0" />
          <h3 className="font-serif text-lg sm:text-xl m-0">8. Contact Information</h3>
        </div>
        <div className="pl-7">
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            For questions about these Terms of Service, please contact us:
          </p>
          <div className="bg-secondary/50 rounded-lg p-4 text-sm">
            <p className="font-medium mb-2">MAISON Fashion House</p>
            <p className="text-muted-foreground">Email: legal@maison.com</p>
            <p className="text-muted-foreground">Phone: +1 (888) 555-0123</p>
            <p className="text-muted-foreground">Address: 123 Fashion Avenue, New York, NY 10001</p>
          </div>
        </div>
      </section>
    </div>
  )
}

// Export hooks for use in other components
export function useLegalModals() {
  const [openModal, setOpenModal] = useState<ModalType>(null)
  return { openModal, setOpenModal }
}
