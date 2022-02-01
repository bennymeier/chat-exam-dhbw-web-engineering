import { Box, Text, IconButton, Flex, Link } from '@chakra-ui/react';
import { FiBell, FiUser, FiUsers } from 'react-icons/fi';
import { ChannelType } from '../types';
import { ReactElement } from 'react';

interface SidebarMenu {
  id: ChannelType;
  name: string;
  icon: ReactElement;
}
const MENUS: SidebarMenu[] = [
  {
    id: 'activity',
    name: 'Activity',
    icon: <FiBell />,
  },
  {
    id: 'chat',
    name: 'Chats',
    icon: <FiUser />,
  },
  { id: 'room', name: 'Rooms', icon: <FiUsers /> },
];

interface SmallSidebarProps {
  onClick: (id: ChannelType) => void;
  activeMenu: ChannelType;
}
const SmallSidebar: React.FC<SmallSidebarProps> = (props) => {
  const { activeMenu, onClick } = props;

  return (
    <Flex flexDirection="column" bgColor="gray.500" paddingY="1em">
      {MENUS.map((menu) => {
        const { id, name, icon } = menu;
        const menuIsActive = activeMenu === id;
        return (
          <Link
            key={id}
            backgroundColor={menuIsActive ? 'gray.600' : ''}
            _hover={{ backgroundColor: 'gray.400' }}
            onClick={() => onClick(id)}
          >
            <Box paddingX="4" paddingY="2" textAlign="center">
              <IconButton
                _active={{ backgroundColor: 'gray.300' }}
                isRound
                isActive={menuIsActive}
                _hover={{ backgroundColor: 'gray.300' }}
                icon={icon}
                aria-label={`Open ${name} menu`}
                variant="ghost"
              />
              <Text
                fontSize="xs"
                fontWeight="medium"
                userSelect="none"
                color={menuIsActive ? 'white' : ''}
              >
                {name}
              </Text>
            </Box>
          </Link>
        );
      })}
    </Flex>
  );
};

export default SmallSidebar;
