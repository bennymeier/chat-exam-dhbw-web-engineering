import { Box, Text, IconButton, Flex, Link } from '@chakra-ui/react';
import { FiBell, FiUser, FiUsers } from 'react-icons/fi';

const MENUS = [
  {
    name: 'Activity',
    icon: <FiBell />,
  },
  {
    name: 'Chats',
    icon: <FiUser />,
  },
  { name: 'Rooms', icon: <FiUsers /> },
];

interface SmallSidebarProps {
  onClick: (name: string) => void;
  activeMenu: string;
}
const SmallSidebar: React.FC<SmallSidebarProps> = (props) => {
  const { onClick, activeMenu } = props;
  return (
    <Flex flexDirection="column" gap="1em" bgColor="gray.500" paddingY="1em">
      {MENUS.map((menu) => {
        const { name, icon } = menu;
        return (
          <Link
            key={name}
            _hover={{ backgroundColor: 'gray.400' }}
            onClick={() => onClick(name)}
          >
            <Box paddingX="4" paddingY="2" textAlign="center">
              <IconButton
                isRound
                isActive={activeMenu === name}
                _hover={{ backgroundColor: 'gray.300' }}
                icon={icon}
                aria-label={`Open ${name} menu`}
                variant="ghost"
              />
              <Text fontSize="xs" fontWeight="medium" userSelect="none">
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
