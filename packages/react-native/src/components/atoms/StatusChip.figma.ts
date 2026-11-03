import figma from '@figma/code-connect';
import { StatusChip } from './StatusChip';

/**
 * Figma Code Connect Mapping for 14 Domain Status Chips
 * Agriculture Solar Pump Status Indicators
 */
figma.connect(
  StatusChip,
  'https://www.figma.com/design/eq0EA9dRSWfS2ivuFohJdg/nlpgroup--Smart-Solar-App---Admin-Panel---UI-Kit?node-id=10:101',
  {
    props: {
      status: figma.enum('Status', {
        'Draft': 'DRAFT',
        'Dispatched': 'DISPATCHED',
        'Delivered': 'DELIVERED',
        'Installing': 'INSTALLING',
        'Testing Pump': 'TESTING_PUMP',
        'QA Pending': 'QA_PENDING',
        'QA Approved': 'QA_APPROVED',
        'QA Rejected': 'QA_REJECTED',
        'Active Pumping': 'ACTIVE_PUMPING',
        'Solar Insufficient': 'SOLAR_INSUFFICIENT',
        'Fault Overheat': 'FAULT_OVERHEAT',
        'Dry Run Protection': 'DRY_RUN_PROTECTION',
        'Maintenance Due': 'MAINTENANCE_DUE',
        'Offline Sync Pending': 'OFFLINE_SYNC_PENDING',
      }),
    },
    example: ({ status }) => <StatusChip status={status} />,
  }
);
