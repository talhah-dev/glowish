"use client";
import React, { useContext } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import { TabContext } from "../providers";

const TabsView = ({ tabs }) => {
  const { activeTab, setActiveTab } = useContext(TabContext);

  return (
    <div className="flex w-full flex-col">
      <Tabs
        aria-label="Dynamic tabs"
        selectedKey={activeTab.tab}
        onSelectionChange={(key) => setActiveTab({ ...activeTab, tab: key })}
        items={tabs}
        variant="underlined"
        classNames={{
          tabList: "gap-7 w-full relative rounded-none p-0 border-b border-divider h-14",
          cursor: "w-full bg-[#000]",
          tab: "max-w-fit px-0 h-12 2sm:text-base text-sm h-14",
          tabContent: "group-data-[selected=true]:text-[#000]",
        }}
      >
        {(item) => (
          <Tab key={item.id} title={item.label} className="p-0">
            {item.content}
          </Tab>
        )}
      </Tabs>
    </div>
  );
};

export default TabsView;