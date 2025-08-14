import { useEffect, useState } from "react";
import { state } from "../../../../data/state.js";
import { getGroups } from "../../../../utils/Groups.js";
import { useSnapshot } from "valtio";
import CreateButton from "../../UI/Buttons/CreateButton.jsx";
import NoDataAnime from "../../UI/NoDataAnime.jsx";
import GroupCard from "./GroupCard.jsx";

const GroupList = () => {
  const [groupDetails, setGroupDetails] = useState([]);
  const snap = useSnapshot(state);

  const getDetails = async () => {
    try {
      let res = await getGroups();
      if (res?.status === 200) {
        setGroupDetails(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetails();
    state.refreshGroupList = false;
  }, [snap.refreshGroupList]);

  const handleWhatsAppClick = (link) => {
    const groupLink = `${link}`;
    window.open(groupLink, "_blank");
  };

  const deleteHandler = (id) => {
    state.selectedGroupID = id;
    state.showDeleteGroupModal = true;
  };

  const createGroupHandler = () => {
    state.createNewGroupModal = true;
  };

  return (
    <div className="px-2 mt-[-55px]">
      <div className="w-full flex items-center justify-between pb-4 pt-2 mt-16 lg:mt-0">
        <span className="text-black text-2xl font-semibold"></span>
        <CreateButton title={"Create Group"} action={createGroupHandler} />
      </div>
      {groupDetails?.length > 0 ? (
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {groupDetails?.map((group) => {
            return (
              <GroupCard
                group={group}
                key={group?.id}
                handleWhatsAppClick={handleWhatsAppClick}
                deleteHandler={deleteHandler}
              />
            );
          })}
        </div>
      ) : (
        <NoDataAnime msg={"No Groups Found"} />
      )}
    </div>
  );
};

export default GroupList;
