// src/ui/primitives/Modal/Modal.figma.ts
import figma from 'figma';

export default figma.code`
<Modal
  isOpen={${figma.properties.boolean('Open')}}
  title="${figma.properties.string('Title')}"
  onClose={() => {}}
>
  {/* Modal body */}
</Modal>
`;
