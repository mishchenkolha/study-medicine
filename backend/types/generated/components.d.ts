import type { Schema, Struct } from '@strapi/strapi';

export interface ComponentsCard extends Struct.ComponentSchema {
  collectionName: 'components_components_cards';
  info: {
    displayName: 'card';
  };
  attributes: {
    class: Schema.Attribute.String;
    description: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images' | 'files'>;
    level: Schema.Attribute.Enumeration<
      ['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']
    >;
    link: Schema.Attribute.String;
    price: Schema.Attribute.String;
    time: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface ComponentsCta extends Struct.ComponentSchema {
  collectionName: 'components_components_ctas';
  info: {
    displayName: 'cta';
  };
  attributes: {
    bg_image: Schema.Attribute.Media<'images' | 'files'>;
    class: Schema.Attribute.String;
    description: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images' | 'files'>;
    link: Schema.Attribute.Component<'components.link', false>;
    title: Schema.Attribute.String;
  };
}

export interface ComponentsDescription extends Struct.ComponentSchema {
  collectionName: 'components_components_descriptions';
  info: {
    displayName: 'description';
  };
  attributes: {
    class: Schema.Attribute.String;
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'toolbarBalloon';
        }
      >;
  };
}

export interface ComponentsDictionaryItem extends Struct.ComponentSchema {
  collectionName: 'components_components_dictionary_items';
  info: {
    displayName: 'dictionary_item';
  };
  attributes: {
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    title: Schema.Attribute.String;
  };
}

export interface ComponentsImage extends Struct.ComponentSchema {
  collectionName: 'components_components_images';
  info: {
    displayName: 'image';
  };
  attributes: {
    alt: Schema.Attribute.String;
    class: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    link: Schema.Attribute.String;
  };
}

export interface ComponentsLabels extends Struct.ComponentSchema {
  collectionName: 'components_components_labels';
  info: {
    displayName: 'labels';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'toolbarBalloon';
        }
      >;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ComponentsLink extends Struct.ComponentSchema {
  collectionName: 'components_components_links';
  info: {
    displayName: 'link';
  };
  attributes: {
    alt: Schema.Attribute.String;
    class: Schema.Attribute.String;
    description: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images' | 'files'>;
    title: Schema.Attribute.String;
    url: Schema.Attribute.String;
    use_image: Schema.Attribute.Boolean;
  };
}

export interface ComponentsQa extends Struct.ComponentSchema {
  collectionName: 'components_components_qas';
  info: {
    displayName: 'qa';
  };
  attributes: {
    correct: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    description: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images' | 'files'>;
    title: Schema.Attribute.String;
  };
}

export interface FormButton extends Struct.ComponentSchema {
  collectionName: 'components_form_buttons';
  info: {
    displayName: 'button';
  };
  attributes: {
    class: Schema.Attribute.String;
    color: Schema.Attribute.Enumeration<
      ['primary', 'success', 'error', 'default']
    > &
      Schema.Attribute.DefaultTo<'default'>;
    title: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<['button', 'submit', 'reset']> &
      Schema.Attribute.DefaultTo<'button'>;
    url: Schema.Attribute.String;
    variant: Schema.Attribute.Enumeration<
      ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link']
    > &
      Schema.Attribute.DefaultTo<'default'>;
  };
}

export interface FormForm extends Struct.ComponentSchema {
  collectionName: 'components_form_forms';
  info: {
    displayName: 'form';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    method: Schema.Attribute.String;
    title: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface FormInput extends Struct.ComponentSchema {
  collectionName: 'components_form_inputs';
  info: {
    displayName: 'input';
  };
  attributes: {
    class: Schema.Attribute.String;
    label: Schema.Attribute.String;
    name: Schema.Attribute.String;
    placeholder: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<
      [
        'input',
        'radio',
        'number',
        'checkbox',
        'hidden',
        'file',
        'email',
        'password',
      ]
    > &
      Schema.Attribute.DefaultTo<'input'>;
    value: Schema.Attribute.String;
  };
}

export interface FormOption extends Struct.ComponentSchema {
  collectionName: 'components_form_options';
  info: {
    displayName: 'option';
  };
  attributes: {
    label: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface LlistCards extends Struct.ComponentSchema {
  collectionName: 'components_llist_cards';
  info: {
    displayName: 'cards';
  };
  attributes: {
    bg: Schema.Attribute.String;
    bg_img: Schema.Attribute.Media<'images' | 'files'>;
    cards: Schema.Attribute.Component<'components.card', true>;
    description: Schema.Attribute.RichText;
    title: Schema.Attribute.String;
  };
}

export interface LlistFaqs extends Struct.ComponentSchema {
  collectionName: 'components_llist_faqs';
  info: {
    displayName: 'faqs';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    is_accordion: Schema.Attribute.Boolean;
    name: Schema.Attribute.String;
    qa: Schema.Attribute.Component<'components.qa', true>;
    title: Schema.Attribute.String;
  };
}

export interface LlistSelect extends Struct.ComponentSchema {
  collectionName: 'components_llist_selects';
  info: {
    displayName: 'select';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    multichoise: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    options: Schema.Attribute.Component<'form.option', true> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String;
  };
}

export interface SharedOpenGraph extends Struct.ComponentSchema {
  collectionName: 'components_shared_open_graphs';
  info: {
    displayName: 'openGraph';
    icon: 'project-diagram';
  };
  attributes: {
    ogDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    ogImage: Schema.Attribute.Media<'images'>;
    ogTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 70;
      }>;
    ogType: Schema.Attribute.String;
    ogUrl: Schema.Attribute.String;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
        minLength: 50;
      }>;
    metaImage: Schema.Attribute.Media<'images'>;
    metaRobots: Schema.Attribute.String;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaViewport: Schema.Attribute.String;
    openGraph: Schema.Attribute.Component<'shared.open-graph', false>;
    structuredData: Schema.Attribute.JSON;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'components.card': ComponentsCard;
      'components.cta': ComponentsCta;
      'components.description': ComponentsDescription;
      'components.dictionary-item': ComponentsDictionaryItem;
      'components.image': ComponentsImage;
      'components.labels': ComponentsLabels;
      'components.link': ComponentsLink;
      'components.qa': ComponentsQa;
      'form.button': FormButton;
      'form.form': FormForm;
      'form.input': FormInput;
      'form.option': FormOption;
      'llist.cards': LlistCards;
      'llist.faqs': LlistFaqs;
      'llist.select': LlistSelect;
      'shared.open-graph': SharedOpenGraph;
      'shared.seo': SharedSeo;
    }
  }
}
