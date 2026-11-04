// src/ui/primitives/Button/Button.figma.ts
import figma from 'figma';

export default figma.code`
<Button
  variant="${figma.properties.enum('Variant', {
    Primary: 'primary',
    Secondary: 'secondary',
    Destructive: 'destructive',
    Outline: 'outline',
    Ghost: 'ghost'
  })}"
  size="${figma.properties.enum('Size', {
    Small: 'sm',
    Medium: 'md',
    Large: 'lg'
  })}"
  disabled={${figma.properties.boolean('Disabled')}}
  isLoading={${figma.properties.boolean('Loading')}}
>
  ${figma.properties.string('Label')}
</Button>
`;
