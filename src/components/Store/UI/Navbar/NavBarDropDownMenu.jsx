/* eslint-disable react/prop-types */
import { ChevronDown, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CustomHashLink from "./CustomHashLink";
import { webState } from "../../../../data/webStates";

const NavBarDropDownMenu = ({
  title,
  items,
  activeMenu,
  onToggleMenu,
  onSubmenuToggle,
  activeSubmenu,
  handleRedirect,
}) => {
  const showAllCategoriesHandler = () => {
    onToggleMenu();
    webState.showAllCategories = true;
  };

  return (
    <li className="relative group ">
      <button
        className="flex items-center space-x-1 py-2 text-navTextColor"
        onClick={onToggleMenu}
      >
        <span className="font-medium">{title}</span>
        <motion.span
          animate={{ rotate: activeMenu ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={16} />
        </motion.span>
      </button>

      <AnimatePresence>
        {activeMenu && (
          <div className="w-full">
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`absolute left-0 z-[99999] mt-2 min-w-48 bg-white text-gray-800 rounded-md shadow-lg pt-2`}
            >
              {(title === "Categories" ? items?.slice(0, 10) : items)?.map(
                (item, indx) => {
                  return (
                    <motion.li
                      key={indx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: indx * 0.1 }}
                      className="relative group "
                    >
                      <button
                        className="w-full text-left flex items-center justify-between px-4 py-2 hover:bg-gray-100"
                        onClick={() => {
                          if (item?.subCategories?.length > 0) {
                            onSubmenuToggle(indx);
                          } else {
                            handleRedirect(
                              title === "Categories"
                                ? `/category/${item.id}`
                                : `/collection/${item.id}`
                            );
                          }
                        }}
                      >
                        <span className="text-base font-medium capitalize">
                          {item?.name}
                        </span>
                        {item?.subCategories?.length > 0 && (
                          <ChevronRight size={16} className="ml-2" />
                        )}
                      </button>

                      <AnimatePresence>
                        {activeSubmenu === indx &&
                          item?.subCategories?.length > 0 && (
                            <motion.ul
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                              transition={{ duration: 0.3 }}
                              className="absolute left-full top-0 w-48  bg-white text-gray-800 rounded-md shadow-lg py-2 ml-0.5"
                            >
                              {item?.subCategories?.map((subItem, ind) => {
                                return (
                                  <motion.li
                                    key={ind}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                      duration: 0.3,
                                      delay: ind * 0.1,
                                    }}
                                  >
                                    <a
                                      href="#"
                                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                                      onClick={() =>
                                        handleRedirect(
                                          `/sub-category/${subItem.id}`
                                        )
                                      }
                                    >
                                      {subItem?.name}
                                    </a>
                                  </motion.li>
                                );
                              })}
                            </motion.ul>
                          )}
                      </AnimatePresence>
                    </motion.li>
                  );
                }
              )}
              {title === "Categories" && (
                <CustomHashLink to={"#categories"}>
                  <div
                    className="w-full cursor-pointer bg-themecolor text-textcolor flex items-center justify-center rounded-b py-2 text-sm"
                    onClick={showAllCategoriesHandler}
                  >
                    View All
                  </div>
                </CustomHashLink>
              )}
            </motion.ul>
          </div>
        )}
      </AnimatePresence>
    </li>
  );
};

export default NavBarDropDownMenu;
