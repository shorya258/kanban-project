import {
  faArrowDownUpAcrossLine,
  faArrowDownUpLock,
  faCirclePlus,
  faSearch,
  faSort,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {useDispatch, useSelector } from "react-redux";
import React from "react";
import { setFilter } from "../redux/columnSlice";
import { getAssignedList, getStatusList } from "../redux/filterSelector";

function FilterHeader(props) {
  const dispatch = useDispatch();
  const sortOptions = useSelector((state) => state.sortOptions);
  const assignedList = useSelector(getAssignedList);
  const severityList = useSelector((state) => state.severityList);
  const statusList = useSelector(getStatusList);
  const searchFilter = useSelector((state) => {
    return state.searchFilter;
  });

  const handleSearchChange = (e) => {
    dispatch(setFilter({ filterType: 'searchFilter', value: e.target.value }));
  };
  const handleSeverityChange = (severityValue) => {
    dispatch(setFilter({ filterType: 'severityFilter', value: severityValue}));
  };
  const handleStatusChange = (statusValue) => {
    dispatch(setFilter({ filterType: 'statusFilter', value: statusValue}));
  };
  const handleAssignedChange = (assignedValue) => {
    console.log(assignedValue, "assignedValue");
    dispatch(setFilter({ filterType: 'assignedFilter', value: assignedValue}));
  };
  const handleSortChange = (sortValue) => {
    console.log(sortValue, "sortValue");
    dispatch(setFilter({ filterType: 'sortFilter', value: sortValue}));
  };
  return (
    <div className="flex items-center gap-2 ml-4">
      <div className="relative rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 mr-2">
          <FontAwesomeIcon
            className=""
            fontSize={12}
            icon={faSearch}
            color="grey"
          />
        </div>
        <input
          type="text"
          name="price"
          id="price"
          onChange={handleSearchChange}
          value={searchFilter}
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Search by name, issue..."
        />
      </div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="inline-flex items-center w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            <FontAwesomeIcon
              className=""
              fontSize={12}
              icon={faSort}
              color="grey"
            />
            Sort By
          </MenuButton>
        </div>

        <MenuItems
          transition
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        >
          {sortOptions.map((option, index) => {
            return (
              <MenuItem
                key={index}
                className="py-1"
                onClick={() => handleSortChange(option)}
              >
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                >
                  {option}
                </a>
              </MenuItem>
            );
          })}
        </MenuItems>
      </Menu>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="inline-flex items-center w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            <FontAwesomeIcon
              className=""
              fontSize={12}
              icon={faCirclePlus}
              color="grey"
            />
            Assigned To
          </MenuButton>
        </div>

        <MenuItems
          transition
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        >
          {assignedList.map((option, index) => {
            return (
              <MenuItem
                key={index}
                className="py-1"
                onClick={() => handleAssignedChange(option)}
              >
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                >
                  {option}
                </a>
              </MenuItem>
            );
          })}
        </MenuItems>
      </Menu>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="inline-flex items-center w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            <FontAwesomeIcon
              className=""
              fontSize={12}
              icon={faCirclePlus}
              color="grey"
            />
            Severity
          </MenuButton>
        </div>

        <MenuItems
          transition
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        >
          {severityList.map((option, index) => {
            return (
              <MenuItem
                key={index}
                className="py-1"
                onClick={() => handleSeverityChange(option)}
              >
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                >
                  {option}
                </a>
              </MenuItem>
            );
          })}
        </MenuItems>
      </Menu>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="inline-flex items-center w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            <FontAwesomeIcon
              className=""
              fontSize={12}
              icon={faCirclePlus}
              color="grey"
            />
            Status
          </MenuButton>
        </div>

        <MenuItems
          transition
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        >
          {statusList.map((option, index) => {
            return (
              <MenuItem
                key={index}
                className="py-1"
                onClick={() => handleStatusChange(option)}
              >
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                >
                  {option}
                </a>
              </MenuItem>
            );
          })}
        </MenuItems>
      </Menu>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="inline-flex items-center w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            <FontAwesomeIcon
              className=""
              fontSize={12}
              icon={faCirclePlus}
              color="grey"
            />
            Pentest
          </MenuButton>
        </div>
      </Menu>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="inline-flex items-center w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            <FontAwesomeIcon
              className=""
              fontSize={12}
              icon={faCirclePlus}
              color="grey"
            />
            Target
          </MenuButton>
        </div>
      </Menu>
    </div>
  );
}

export default FilterHeader;