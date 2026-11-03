import figma from '@figma/code-connect';
import { Button } from './Button';

/**
 * Figma Code Connect Mapping for Primary & Action Buttons
 * Maps Figma Button components to React Native WikiAlisa Button
 */
figma.connect(
  Button,
  'https://www.figma.com/design/eq0EA9dRSWfS2ivuFohJdg/nlpgroup--Smart-Solar-App---Admin-Panel---UI-Kit?node-id=10:101',
  {
    props: {
      label: figma.string('Label'),
      variant: figma.enum('Variant', {
        Primary: 'primary',
        Solar: 'solar',
        Secondary: 'secondary',
        Danger: 'danger',
        Ghost: 'ghost',
      }),
      size: figma.enum('Size', {
        Small: 'sm',
        Medium: 'md',
        Large: 'lg',
      }),
      disabled: figma.boolean('Disabled'),
      loading: figma.boolean('Loading'),
    },
    example: ({ label, variant, size, disabled, loading }) => (
      <Button
        label={label}
        variant={variant}
        size={size}
        disabled={disabled}
        loading={loading}
        onPress={() => console.log('Button pressed')}
      />
    ),
  }
);
