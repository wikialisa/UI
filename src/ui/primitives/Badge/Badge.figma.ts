// src/ui/primitives/Badge/Badge.figma.ts
import figma from 'figma';

export default figma.code`
<Badge
  variant="${figma.properties.enum('Color', {
    Emerald: 'emerald',
    Blue: 'blue',
    Amber: 'amber',
    Rose: 'rose',
    Slate: 'slate',
    Purple: 'purple'
  })}"
  size="${figma.properties.enum('Size', {
    Small: 'sm',
    Medium: 'md'
  })}"
>
  ${figma.properties.string('Text')}
</Badge>
`;
