import { Card, CardBody, Image } from "@nextui-org/react";
import React from "react";
import peopleYouknowData from "./PeopleYouknowData.json";
import { Plus } from "lucide-react";
import Link from "next/link";

const PeopleYouknow = () => {
  return (
    <div>
      <h4 className="font-matter text-lg text-gray-900 font-bold mb-4">
        People you may know
      </h4>
      <div>
        {peopleYouknowData.map((people) => (
          <Card key={people.id} className="shadow-none rounded-none mb-3">
            <CardBody className="flex-row gap-4 p-0">
              <Image
                alt="nextui logo"
                radius="full"
                src={people.imagePath}
                width={34}
                className="min-w-[34px]"
              />
              <div className="flex flex-col w-auto">
                <p className="font-matter text-gray-900 hover:text-gray-800 font-medium mb-1 line-clamp-1">
                  {people.name}
                </p>
                <p className="font-matter text-sm text-gray-800 line-clamp-2">
                  {people.description}
                </p>
              </div>
              <div>
                <button className="plus-btn flex items-center justify-center w-[34px] h-[34px] rounded-full border border-gray-400 hover:bg-gray-900 hover:border-gray-900 text-black hover:text-white">
                  <Plus size={17} />
                </button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
      <div>
        <Link
          className="see-more font-matter text-sm text-green font-light"
          href={"/"}
        >
          See more people...
        </Link>
      </div>
    </div>
  );
};

export default PeopleYouknow;
