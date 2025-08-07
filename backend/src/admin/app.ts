import {
  setPluginConfig,
  defaultHtmlPreset,
  StrapiMediaLib,
  StrapiUploadAdapter,
} from '@_sh/strapi-plugin-ckeditor';
export default {
  register() {
    defaultHtmlPreset.name = 'toolbar';
    setPluginConfig({
      presets: [
        {
          ...defaultHtmlPreset,
          name: 'toolbarBalloon',
          description: 'Custom balloon-style toolbar like v4',
          editorConfig: {
            ...defaultHtmlPreset.editorConfig,
            plugins: [
              ...(defaultHtmlPreset.editorConfig.plugins ?? []),
              StrapiMediaLib,
              StrapiUploadAdapter,
            ],
            toolbar: [
              'heading',
              '|',
              'bold',
              'italic',
              'underline',
              'strikethrough',
              'link',
              'subscript',
              'superscript',
              '|',
              'bulletedList',
              'numberedList',
              'todoList',
              'outdent',
              'indent',
              '|',
              'alignment',
              'blockQuote',
              'insertTable',
              'specialCharacters',
              'specialCharactersEmoji',
              'htmlEmbed',
              'codeBlock',
              'horizontalLine',
              'pageBreak',
              '|',
              'strapiMediaLib',
              'mediaEmbed',
              '|',
              'showBlocks',
              'undo',
              'redo',
              'sourceEditing',
            ],
          },
        },
      ],
    });
  },
};
