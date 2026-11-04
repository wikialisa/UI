// src/ui/primitives/Card/Card.figma.ts
import figma from 'figma';

export default figma.code`
<Card
  variant="${figma.properties.enum('Style', {
    Default: 'default',
    Subtle: 'subtle',
    Bordered: 'bordered'
  })}"
  padding="${figma.properties.enum('Padding', {
    None: 'none',
    Small: 'sm',
    Medium: 'md',
    Large: 'lg'
  })}"
>
  {/* Content */}
</Card>
`;
