// src/ui/primitives/Input/Input.figma.ts
import figma from 'figma';

export default figma.code`
<Input
  label="${figma.properties.string('Label')}"
  placeholder="${figma.properties.string('Placeholder')}"
  disabled={${figma.properties.boolean('Disabled')}}
  error="${figma.properties.string('Error Message')}"
/>
`;
