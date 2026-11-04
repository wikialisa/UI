// src/ui/compositions/RoleTabBar/RoleTabBar.figma.ts
import figma from 'figma';

export default figma.code`
<RoleTabBar
  activeTab="${figma.properties.enum('Active Tab', {
    Home: 'home',
    Tasks: 'tasks',
    Map: 'map',
    Alerts: 'alerts',
    Profile: 'profile'
  })}"
  badgeCount={${figma.properties.boolean('Show Badge') ? 3 : 0}}
  onTabChange={() => {}}
/>
`;
