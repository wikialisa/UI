// src/ui/primitives/Checkbox/Checkbox.figma.ts
import figma from 'figma';

export default figma.code`
<Checkbox
  label="${figma.properties.string('Label')}"
  checked={${figma.properties.boolean('Checked')}}
  disabled={${figma.properties.boolean('Disabled')}}
/>
`;
