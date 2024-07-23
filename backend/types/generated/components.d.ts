import type { Schema, Attribute } from '@strapi/strapi';

export interface MetaMetadata extends Schema.Component {
  collectionName: 'components_meta_metadata';
  info: {
    displayName: 'Seo';
    description: '';
  };
  attributes: {
    metaTitle: Attribute.String & Attribute.Required;
    metaDescription: Attribute.Text & Attribute.Required;
  };
}

export interface SectionsRichText extends Schema.Component {
  collectionName: 'components_sections_rich_texts';
  info: {
    displayName: 'Rich text';
  };
  attributes: {
    content: Attribute.RichText;
  };
}

export interface SectionsHero extends Schema.Component {
  collectionName: 'components_sections_heroes';
  info: {
    displayName: 'Hero';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.String & Attribute.Required;
    picture: Attribute.Media<'images'>;
    buttons: Attribute.Component<'links.button-link', true>;
  };
}

export interface SectionsHeading extends Schema.Component {
  collectionName: 'components_sections_headings';
  info: {
    displayName: 'Heading';
  };
  attributes: {
    heading: Attribute.String & Attribute.Required;
    description: Attribute.String;
  };
}

export interface LinksLink extends Schema.Component {
  collectionName: 'components_links_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    url: Attribute.String & Attribute.Required;
    newTab: Attribute.Boolean & Attribute.DefaultTo<false>;
    text: Attribute.String & Attribute.Required;
  };
}

export interface LinksButtonLink extends Schema.Component {
  collectionName: 'components_links_button_links';
  info: {
    displayName: 'Button link';
  };
  attributes: {
    url: Attribute.String & Attribute.Required;
    newTab: Attribute.Boolean & Attribute.DefaultTo<false>;
    text: Attribute.String;
    type: Attribute.Enumeration<['primary', 'secondary']>;
  };
}

export interface LayoutNavbar extends Schema.Component {
  collectionName: 'components_layout_navbars';
  info: {
    displayName: 'Navbar';
  };
  attributes: {
    links: Attribute.Component<'links.link', true>;
    button: Attribute.Component<'links.button-link'>;
    navbarLogo: Attribute.Component<'layout.logo'>;
  };
}

export interface LayoutLogo extends Schema.Component {
  collectionName: 'components_layout_logos';
  info: {
    displayName: 'Logo';
  };
  attributes: {
    logoImg: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    logoText: Attribute.String;
  };
}

export interface LayoutFooter extends Schema.Component {
  collectionName: 'components_layout_footers';
  info: {
    displayName: 'Footer';
  };
  attributes: {
    footerLogo: Attribute.Component<'layout.logo'>;
    menuLinks: Attribute.Component<'links.link', true>;
    legalLinks: Attribute.Component<'links.link', true>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'meta.metadata': MetaMetadata;
      'sections.rich-text': SectionsRichText;
      'sections.hero': SectionsHero;
      'sections.heading': SectionsHeading;
      'links.link': LinksLink;
      'links.button-link': LinksButtonLink;
      'layout.navbar': LayoutNavbar;
      'layout.logo': LayoutLogo;
      'layout.footer': LayoutFooter;
    }
  }
}
