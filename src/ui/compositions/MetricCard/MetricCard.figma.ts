// src/ui/compositions/MetricCard/MetricCard.figma.ts
import figma from 'figma';

export default figma.code`
<MetricCard
  label="${figma.properties.string('Label')}"
  value="${figma.properties.string('Value')}"
  subtext="${figma.properties.string('Subtext')}"
  color="${figma.properties.enum('Color', {
    Emerald: 'emerald',
    Blue: 'blue',
    Purple: 'purple',
    Amber: 'amber',
    Rose: 'rose'
  })}"
/>
`;
