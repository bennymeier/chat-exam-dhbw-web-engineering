import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';
import UserApi from '../api/user.api';
import UserComponent from './User';
import { Box, Text } from '@chakra-ui/react';
import { User } from '../types';

const NoOption = ({ inputValue }: { inputValue: string }) => {
  const message = !!inputValue
    ? `No matches for ${inputValue}`
    : 'Search for an user.';
  return (
    <Box>
      <Text fontSize="xs">{message}</Text>
    </Box>
  );
};

const UserOption = (props: any) => {
  const { innerRef, innerProps, data } = props;
  return (
    <Box ref={innerRef} {...innerProps}>
      <UserComponent user={data} />
    </Box>
  );
};

interface UserSearchProps {
  onSelect: (user: any, action: any) => void;
}
const UserSearch: React.FC<UserSearchProps> = (props) => {
  const { onSelect } = props;
  const [isLoading, setIsLoading] = useState(false);
  const handleSearch = async (value: string) => {
    if (value) {
      try {
        setIsLoading(true);
        const res = await UserApi.search(value, '5');
        const formatUsers = res.data.map((user: User) => {
          return {
            ...user,
            value: user._id,
            label: `${user.firstname} ${user.lastname}`,
          };
        });
        setIsLoading(false);
        return formatUsers;
      } catch (err) {
        console.warn(err);
      }
    }
  };
  return (
    <>
      <AsyncSelect
        placeholder="Search an user"
        cacheOptions
        openMenuOnClick={false}
        noOptionsMessage={NoOption}
        isLoading={isLoading}
        loadOptions={handleSearch}
        onChange={onSelect}
        components={{
          Option: UserOption,
          IndicatorSeparator: () => null,
          DropdownIndicator: () => null,
        }}
      />
    </>
  );
};

export default UserSearch;
