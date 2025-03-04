import { Chip } from "@nextui-org/react";
import React from "react";
import recommendedTopicData from "../../mock/RecommendedTopicData.json";
import Link from "next/link";

const RecommendedTopic = ({ title }) => {
  return (
    <div>
      <h4 className="font-matter text-lg text-gray-900 font-bold mb-4">
        {title}
      </h4>
      <div className="flex flex-wrap gap-2">
        {recommendedTopicData.map((topic) => (
          <Chip
            key={topic.id}
            as={Link}
            href={`/tag-details/${topic.label}`}
            className="flex font-matter text-sm h-auto text-gray-900 bg-gray-500 px-4 py-1.5"
            classNames={{ content: "p-0" }}
          >
            {topic.name}
          </Chip>
        ))}
      </div>
    </div>
  );
};

export default RecommendedTopic;
