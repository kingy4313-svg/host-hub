import type { TypographySettings } from "@/content/site-content";

/**
 * TypographyStyleInjector - Injects admin-controlled typography settings as CSS variables
 * This allows the admin panel to control heading styles in real-time across the site
 */
export function TypographyStyleInjector({ typography }: { typography?: TypographySettings }) {
  // Handle undefined typography (loading state or fallback)
  if (!typography) {
    return null;
  }

  // Generate CSS rules as a string to comply with CSP
  const css = `:root {
    --typo-hero-fs-desktop: ${typography.heroHeading.desktop.fontSize}px;
    --typo-hero-color-desktop: ${typography.heroHeading.desktop.color};
    --typo-hero-fw-desktop: ${typography.heroHeading.desktop.fontWeight};
    --typo-hero-ta-desktop: ${typography.heroHeading.desktop.textAlign};
    --typo-hero-fs-mobile: ${typography.heroHeading.mobile.fontSize}px;
    --typo-hero-color-mobile: ${typography.heroHeading.mobile.color};
    --typo-hero-fw-mobile: ${typography.heroHeading.mobile.fontWeight};
    --typo-hero-ta-mobile: ${typography.heroHeading.mobile.textAlign};
    
    --typo-whybook-fs-desktop: ${typography.whyBookMe.desktop.fontSize}px;
    --typo-whybook-color-desktop: ${typography.whyBookMe.desktop.color};
    --typo-whybook-fw-desktop: ${typography.whyBookMe.desktop.fontWeight};
    --typo-whybook-ta-desktop: ${typography.whyBookMe.desktop.textAlign};
    --typo-whybook-fs-mobile: ${typography.whyBookMe.mobile.fontSize}px;
    --typo-whybook-color-mobile: ${typography.whyBookMe.mobile.color};
    --typo-whybook-fw-mobile: ${typography.whyBookMe.mobile.fontWeight};
    --typo-whybook-ta-mobile: ${typography.whyBookMe.mobile.textAlign};
    
    --typo-featured-fs-desktop: ${typography.featuredMoments.desktop.fontSize}px;
    --typo-featured-color-desktop: ${typography.featuredMoments.desktop.color};
    --typo-featured-fw-desktop: ${typography.featuredMoments.desktop.fontWeight};
    --typo-featured-ta-desktop: ${typography.featuredMoments.desktop.textAlign};
    --typo-featured-fs-mobile: ${typography.featuredMoments.mobile.fontSize}px;
    --typo-featured-color-mobile: ${typography.featuredMoments.mobile.color};
    --typo-featured-fw-mobile: ${typography.featuredMoments.mobile.fontWeight};
    --typo-featured-ta-mobile: ${typography.featuredMoments.mobile.textAlign};
    
    --typo-events-fs-desktop: ${typography.eventsSpecialize.desktop.fontSize}px;
    --typo-events-color-desktop: ${typography.eventsSpecialize.desktop.color};
    --typo-events-fw-desktop: ${typography.eventsSpecialize.desktop.fontWeight};
    --typo-events-ta-desktop: ${typography.eventsSpecialize.desktop.textAlign};
    --typo-events-fs-mobile: ${typography.eventsSpecialize.mobile.fontSize}px;
    --typo-events-color-mobile: ${typography.eventsSpecialize.mobile.color};
    --typo-events-fw-mobile: ${typography.eventsSpecialize.mobile.fontWeight};
    --typo-events-ta-mobile: ${typography.eventsSpecialize.mobile.textAlign};
    
    --typo-pastevents-fs-desktop: ${typography.pastEvents.desktop.fontSize}px;
    --typo-pastevents-color-desktop: ${typography.pastEvents.desktop.color};
    --typo-pastevents-fw-desktop: ${typography.pastEvents.desktop.fontWeight};
    --typo-pastevents-ta-desktop: ${typography.pastEvents.desktop.textAlign};
    --typo-pastevents-fs-mobile: ${typography.pastEvents.mobile.fontSize}px;
    --typo-pastevents-color-mobile: ${typography.pastEvents.mobile.color};
    --typo-pastevents-fw-mobile: ${typography.pastEvents.mobile.fontWeight};
    --typo-pastevents-ta-mobile: ${typography.pastEvents.mobile.textAlign};
    
    --typo-works-fs-desktop: ${typography.myWork.desktop.fontSize}px;
    --typo-works-color-desktop: ${typography.myWork.desktop.color};
    --typo-works-fw-desktop: ${typography.myWork.desktop.fontWeight};
    --typo-works-ta-desktop: ${typography.myWork.desktop.textAlign};
    --typo-works-fs-mobile: ${typography.myWork.mobile.fontSize}px;
    --typo-works-color-mobile: ${typography.myWork.mobile.color};
    --typo-works-fw-mobile: ${typography.myWork.mobile.fontWeight};
    --typo-works-ta-mobile: ${typography.myWork.mobile.textAlign};
    
    --typo-testimonials-fs-desktop: ${typography.testimonials.desktop.fontSize}px;
    --typo-testimonials-color-desktop: ${typography.testimonials.desktop.color};
    --typo-testimonials-fw-desktop: ${typography.testimonials.desktop.fontWeight};
    --typo-testimonials-ta-desktop: ${typography.testimonials.desktop.textAlign};
    --typo-testimonials-fs-mobile: ${typography.testimonials.mobile.fontSize}px;
    --typo-testimonials-color-mobile: ${typography.testimonials.mobile.color};
    --typo-testimonials-fw-mobile: ${typography.testimonials.mobile.fontWeight};
    --typo-testimonials-ta-mobile: ${typography.testimonials.mobile.textAlign};
    
    --typo-contact-fs-desktop: ${typography.contactCta.desktop.fontSize}px;
    --typo-contact-color-desktop: ${typography.contactCta.desktop.color};
    --typo-contact-fw-desktop: ${typography.contactCta.desktop.fontWeight};
    --typo-contact-ta-desktop: ${typography.contactCta.desktop.textAlign};
    --typo-contact-fs-mobile: ${typography.contactCta.mobile.fontSize}px;
    --typo-contact-color-mobile: ${typography.contactCta.mobile.color};
    --typo-contact-fw-mobile: ${typography.contactCta.mobile.fontWeight};
    --typo-contact-ta-mobile: ${typography.contactCta.mobile.textAlign};
  }`;

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
