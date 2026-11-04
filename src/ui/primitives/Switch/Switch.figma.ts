// src/ui/primitives/Switch/Switch.figma.ts
import figma from 'figma';

export default figma.code`
<Switch
  checked={${figma.properties.boolean('Checked')}}
  label="${figma.properties.string('Label')}"
  disabled={${figma.properties.boolean('Disabled')}}
  onChange={() => {}}
/>
`;
